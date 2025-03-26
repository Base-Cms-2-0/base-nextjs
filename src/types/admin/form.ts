// Định nghĩa FormField (không thay đổi)
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select';
  required?: boolean;
  options?: Array<{
    value: string | number;
    label: string;
  }>;
  unique?: boolean;
}

// Định nghĩa TabField, thêm subTabs để hỗ trợ tab con
export interface TabField {
  formKey: string;
  title: string;
  defaultItem: Record<string, any>;
  fields: FormField[];
  subTabs?: TabField[]; // Thêm subTabs để hỗ trợ tab con
}

// Định nghĩa FormData để hỗ trợ dữ liệu lồng nhau
export interface FormData {
  [key: string]: Array<{
    [subKey: string]: any[] | any; // Hỗ trợ dữ liệu lồng nhau (các tab con) và dữ liệu field
  }>;
}