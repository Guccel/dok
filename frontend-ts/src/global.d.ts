/// <reference types="@sveltejs/kit" />

export interface User_Type {
	session_id: string;
	authenticated: boolean;
	data?: UserData_Type;
}

export interface UserData_Type {
	type: 'unauthenticated' | 'user' | 'admin';
	email?: string;
}

export interface ProductAll_Type {
	name: string;
	price: number;
	description: number;
	rating?: number;
	tags?: string[];
	options?: string[];
}
