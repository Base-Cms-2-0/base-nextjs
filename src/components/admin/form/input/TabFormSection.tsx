'use client';

import { Form, Input, InputNumber, Select, Button, Tabs } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { TabField } from '@/types/admin/form';
import React from 'react';

interface TabFormSectionProps {
  tabField: TabField;
  usedOptions: Record<string, Set<any>>;
  onAdd: (key: string, defaultItem: any) => void;
  onRemove: (key: string, index: number) => void;
}

const TabFormSection: React.FC<TabFormSectionProps> = ({
  tabField,
  usedOptions,
  onAdd,
  onRemove,
}) => {
  const renderField = (
    field: TabField['fields'][0],
    fieldPath: (string | number)[],
    currentValue: any
  ) => {
    const placeholderText = `Nhập ${field.label.toLowerCase()}`;
    const inputStyle = { width: '100%' };

    switch (field.type) {
      case 'select':
        const usedValues = usedOptions[`${tabField.formKey}_${field.name}`] || new Set();
        const filteredOptions = field.options?.filter((opt) => {
          return !field.unique || opt.value === currentValue || !usedValues.has(opt.value);
        });
        return (
          <Select
            options={filteredOptions}
            style={inputStyle}
            placeholder={`Chọn ${field.label.toLowerCase()}`}
            className="custom-select"
          />
        );
      case 'number':
        return (
          <InputNumber
            style={inputStyle}
            placeholder={placeholderText}
            className="custom-input-number"
            min={0}
          />
        );
      default:
        return (
          <Input
            style={inputStyle}
            placeholder={placeholderText}
            className="custom-input"
            allowClear={false}
          />
        );
    }
  };

  const renderSubTab = (subTab: TabField, parentField: any, parentIndex: number) => {
    return (
      <Form.List name={[parentField.name, subTab.formKey]} key={subTab.formKey}>
        {(subFields, { add, remove }) => (
          <>
            {subFields.map((subField, subIndex) => (
              <div key={subField.key} className="mb-4 relative">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-base font-semibold text-gray-800">
                    {`${subTab.title} #${subIndex + 1}`}
                  </h4>
                  {subIndex > 0 && (
                    <Button
                      type="text"
                      danger
                      icon={<MinusCircleOutlined />}
                      onClick={() => {
                        remove(subField.name);
                        onRemove(`${tabField.formKey}_${subTab.formKey}`, subField.name);
                      }}
                      className="text-red-500 hover:text-red-700"
                    />
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {subTab.fields.map((itemField, fieldIndex) => {
                    const fieldPath = [subField.name, itemField.name];
                    const uniqueKey = `${subField.key}-${itemField.name}-${fieldIndex}`;
                    return (
                      <Form.Item
                        key={uniqueKey}
                        name={fieldPath}
                        label={
                          <span className="text-gray-700 font-medium">
                            {itemField.label}
                            {itemField.required && (
                              <span className="text-red-500 ml-1"></span>
                            )}
                          </span>
                        }
                        rules={[
                          {
                            required: itemField.required,
                            message: `${itemField.label} là bắt buộc`,
                          },
                        ]}
                      >
                        <Form.Item noStyle shouldUpdate>
                          {({ getFieldValue }) => {
                            const currentValue = getFieldValue(fieldPath);
                            return renderField(itemField, fieldPath, currentValue);
                          }}
                        </Form.Item>
                      </Form.Item>
                    );
                  })}
                </div>
              </div>
            ))}
            <Form.Item>
              <div className="flex justify-center">
                <Button
                  type="primary"
                  onClick={() => {
                    add(subTab.defaultItem);
                    onAdd(`${tabField.formKey}_${subTab.formKey}`, subTab.defaultItem);
                  }}
                  icon={<PlusOutlined />}
                  className="px-8"
                >
                  Thêm mục
                </Button>
              </div>
            </Form.Item>
          </>
        )}
      </Form.List>
    );
  };

  // Optional handler for tab changes in subTabs
  const handleSubTabChange = (key: string) => {
    console.log('Active sub-tab key:', key);
  };

  return (
    <div className="py-4">
      <Form.List name={tabField.formKey}>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <div key={field.key} className="mb-6 relative">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {`${tabField.title} #${index + 1}`}
                  </h3>
                  {index > 0 && (
                    <Button
                      type="text"
                      danger
                      icon={<MinusCircleOutlined />}
                      onClick={() => {
                        remove(field.name);
                        onRemove(tabField.formKey, field.name);
                      }}
                      className="text-red-500 hover:text-red-700"
                    />
                  )}
                </div>
                {tabField.subTabs ? (
                  <Tabs
                    type="card" // Changed from "line" to "card"
                    onChange={handleSubTabChange} // Optional: logs active sub-tab
                    items={tabField.subTabs.map((subTab) => ({
                      key: subTab.formKey,
                      label: subTab.title,
                      children: renderSubTab(subTab, field, index),
                    }))}
                  />
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {tabField.fields.map((itemField, fieldIndex) => {
                      const fieldPath = [field.name, itemField.name];
                      const uniqueKey = `${field.key}-${itemField.name}-${fieldIndex}`;
                      return (
                        <Form.Item
                          key={uniqueKey}
                          name={fieldPath}
                          label={
                            <span className="text-gray-700 font-medium">
                              {itemField.label}
                              {itemField.required && (
                                <span className="text-red-500 ml-1">*</span>
                              )}
                            </span>
                          }
                          rules={[
                            {
                              required: itemField.required,
                              message: `${itemField.label} là bắt buộc`,
                            },
                          ]}
                        >
                          <Form.Item noStyle shouldUpdate>
                            {({ getFieldValue }) => {
                              const currentValue = getFieldValue(fieldPath);
                              return renderField(itemField, fieldPath, currentValue);
                            }}
                          </Form.Item>
                        </Form.Item>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
            {!tabField.subTabs && (
              <Form.Item>
                <div className="flex justify-center">
                  <Button
                    type="primary"
                    onClick={() => {
                      add(tabField.defaultItem);
                      onAdd(tabField.formKey, tabField.defaultItem);
                    }}
                    icon={<PlusOutlined />}
                    className="px-8"
                  >
                    Thêm mục
                  </Button>
                </div>
              </Form.Item>
            )}
          </>
        )}
      </Form.List>
    </div>
  );
};

export default TabFormSection;