'use client';

import { NextPage } from 'next';
import CreateTab from '@/components/admin/form/create/CreateTab';
import { TabField } from '@/types/admin/form';

const tabFields: TabField[] = [
  {
    formKey: 'personal_info',
    title: 'Thông tin cá nhân',
    defaultItem: {
      name: '',
      age: null,
      gender: '',
    },
    fields: [
      { name: 'name', label: 'Họ và tên', type: 'text'},
      { name: 'age', label: 'Tuổi', type: 'number' },
      {
        name: 'gender',
        label: 'Giới tính',
        type: 'select',
        options: [
          { value: 'male', label: 'Nam' },
          { value: 'female', label: 'Nữ' },
        ],
        unique: true,
      },
    ],
  },
  {
    formKey: 'pricing_info',
    title: 'Giá cơ bản',
    defaultItem: {},
    fields: [],
    subTabs: [
      {
        formKey: 'price_type',
        title: 'Loại giá',
        defaultItem: { type: '', description: '' },
        fields: [
          {
            name: 'type',
            label: 'Chọn loại giá',
            type: 'select',
            options: [
              { value: 'standard', label: 'Tiêu chuẩn' },
              { value: 'premium', label: 'Cao cấp' },
            ],
            required: true,
          },
          {
            name: 'description',
            label: 'Mô tả loại giá',
            type: 'text',
          },
        ],
      },
      {
        formKey: 'room_price',
        title: 'Giá phòng',
        defaultItem: { price: null, discount_price: null, apply_discount: false },
        fields: [
          {
            name: 'price',
            label: 'Nhập giá phòng',
            type: 'number',
            required: true,
          },
          {
            name: 'discount_price',
            label: 'Giá giảm giá',
            type: 'number',
          },
          {
            name: 'apply_discount',
            label: 'Áp dụng giảm giá',
            type: 'select',
            options: [
              { value: true, label: 'Có' },
              { value: false, label: 'Không' },
            ],
          },
        ],
      },
      {
        formKey: 'daily_price',
        title: 'Giá theo ngày',
        defaultItem: { daily_price: null },
        fields: [
          { name: 'daily_price', label: 'Nhập giá theo ngày', type: 'number' },
        ],
      },
      {
        formKey: 'hourly_price',
        title: 'Giá theo giờ (thứ nhật)',
        defaultItem: { hourly_price: null, active: false },
        fields: [
          { name: 'hourly_price', label: 'Nhập giá theo giờ', type: 'number' },
          {
            name: 'active',
            label: 'Kích hoạt',
            type: 'select',
            options: [
              { value: true, label: 'Kích hoạt' },
              { value: false, label: 'Không kích hoạt' },
            ],
          },
        ],
      },
    ],
  },
  {
    formKey: 'contact_info',
    title: 'Thông tin liên hệ',
    defaultItem: {
      email: '',
      phone: '',
      address_type: '',
    },
    fields: [
      { name: 'email', label: 'Email', type: 'text', required: true },
      { name: 'phone', label: 'Số điện thoại', type: 'text', required: true },
      {
        name: 'address_type',
        label: 'Loại địa chỉ',
        type: 'select',
        options: [
          { value: 'home', label: 'Nhà riêng' },
          { value: 'office', label: 'Văn phòng' },
          { value: 'other', label: 'Khác' },
        ],
        unique: true,
      },
    ],
  },
];

const FormPage: NextPage = () => {
  const handleSubmit = (values: any) => {
    console.log('Form values:', values);
  };

  return (
    <div className="p-2">
      <CreateTab
        title="Thêm mới thông tin"
        tabFields={tabFields}
        onSubmit={handleSubmit}
        submitRoute="/submit"
        routeBack="/back"
        showActionButtons={true}
        showBackButton={true}
        showAddMoreButton={true}
      />
    </div>
  );
};

export default FormPage;