export interface Type_Product {
  name: string;
  price: string;
  description: string;
  type: string;
  tags?: string[];
  options?: Product_options[];
}

export interface Product_options {
  stock: number;
  colour?: string;
  size?: 's' | 'm' | 'l';
}

export interface Type_UserRegisterBody {
  username: string;
  email: string;
  type: 'user' | 'admin';
  password: string;
}
