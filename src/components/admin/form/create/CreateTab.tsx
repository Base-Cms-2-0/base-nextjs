'use client';

import { Button, Form, message, Tabs } from 'antd';
import { TabField } from '@/types/admin/form';
import { useFormData } from '@/hooks/useFormData';
import TabFormSection from '@/components/admin/form/input/TabFormSection';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';

interface CreateTabProps {
  title: string;
  tabFields: TabField[];
  onSubmit: (values: any) => void;
  submitRoute?: string;
  routeBack?: string;
  showActionButtons?: boolean;
  showBackButton?: boolean;
  showAddMoreButton?: boolean;
}

const CreateTab: React.FC<CreateTabProps> = ({
  title,
  tabFields,
  onSubmit,
  submitRoute,
  routeBack,
  showActionButtons = true,
  showBackButton = true,
  showAddMoreButton = true,
}) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const {
    formData,
    setFormData,
    usedOptions,
    updateUsedOptions,
    addItem,
    removeItem,
  } = useFormData(tabFields);

  // Initialize form values based on tabFields structure
  const initialValues = useMemo(() => {
    const values: { [key: string]: any[] } = {};
    tabFields.forEach((tab) => {
      if (tab.subTabs) {
        const subTabValues: { [key: string]: any[] } = {};
        tab.subTabs.forEach((subTab) => {
          subTabValues[subTab.formKey] = [subTab.defaultItem];
        });
        values[tab.formKey] = [subTabValues];
      } else {
        values[tab.formKey] = [tab.defaultItem];
      }
    });
    return values;
  }, [tabFields]);

  // Handle form value changes to update used options for unique select fields
  const handleValuesChange = (changedValues: any) => {
    Object.entries(changedValues).forEach(([tabKey, values]) => {
      const tab = tabFields.find((t) => t.formKey === tabKey);
      if (tab) {
        tab.fields
          .filter((f) => f.type === 'select' && f.unique)
          .forEach((field) => {
            updateUsedOptions(tabKey, field.name, values as any[]);
          });
      }
    });
  };

  // Handle tab change (optional logging or custom logic)
  const handleTabChange = (key: string) => {
    console.log('Active tab key:', key);
  };

  // Handle form submission
  const handleSubmit = useCallback(
    async (createAnother: boolean = false) => {
      try {
        const values = await form.validateFields();
        if (submitRoute) {
          console.log('Submitting to:', submitRoute, values);
          message.success({
            content: createAnother ? 'Thêm mới thành công' : 'Lưu thành công',
            duration: 2.5,
          });

          if (createAnother) {
            const resetData: { [key: string]: any } = {};
            tabFields.forEach((tab) => {
              resetData[tab.formKey] = values[tab.formKey];
            });
            form.resetFields();
            setFormData(resetData);
          } else if (routeBack) {
            router.push(routeBack);
          }
        }
        onSubmit(values);
      } catch (error) {
        console.error('Validation failed:', error);
        const errorFields = (error as any).errorFields
          ?.map((e: any) => e.name.join(', '))
          .join(', ');
        message.error({
          content: `Vui lòng kiểm tra lại dữ liệu: ${errorFields || 'Có lỗi xảy ra'}`,
          duration: 2.5,
        });
      }
    },
    [form, onSubmit, submitRoute, routeBack, router, tabFields, setFormData]
  );

  // Handle back navigation
  const handleBack = () => {
    if (routeBack) {
      router.push(routeBack);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-primary mb-4">{title}</h1>
      <Form
        form={form}
        onFinish={() => handleSubmit(false)}
        onValuesChange={handleValuesChange}
        initialValues={initialValues}
        layout="vertical"
      >
        <Tabs
          type="card" // Changed from "line" to "card" as per your example
          onChange={handleTabChange} // Added optional onChange handler
          items={tabFields.map((tab) => ({
            key: tab.formKey,
            label: tab.title,
            children: (
              <TabFormSection
                tabField={tab}
                usedOptions={usedOptions}
                onAdd={addItem}
                onRemove={removeItem}
              />
            ),
          }))}
        />
        {showActionButtons && (
          <div className="flex flex-wrap justify-end gap-3 mt-4 sticky bottom-0 left-0 right-0 py-6 bg-white z-10 md:static md:p-0">
            {showBackButton && (
              <Button onClick={handleBack} className="bg-gray-100">
                Quay lại
              </Button>
            )}
            {showAddMoreButton && (
              <Button
                onClick={() => handleSubmit(true)}
                className="bg-pink-100 text-pink-600 border-pink-600"
              >
                Thêm và thêm nữa
              </Button>
            )}
            <Button type="primary" htmlType="submit">
              Thêm mới
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
};

export default CreateTab;