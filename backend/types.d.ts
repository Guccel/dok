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

export interface UserSession {
  session_id: string;
  authenticated: boolean;
  data?: UserSessionData;
}

export interface UserSessionData {
  type: 'unauthenticated' | 'user' | 'admin';
  email?: string;
  _id: string;
}

export interface ProductAll_Type {
  name: string;
  price: number;
  description: number;
  rating?: number;
  tags?: string[];
  options?: string[];
}

export interface User_Type {
  _id: string;
  username: string;
  email: string;
  type: 'user' | 'admin';
}
