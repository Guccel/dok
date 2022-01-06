/// <reference types="@sveltejs/kit" />

export interface UserSession_Type {
	session_id: string;
	authenticated: boolean;
	data?: UserData_Type;
}

export interface UserSessionData_Type {
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

export interface User_Type {
	_id: string;
	username: string;
	email: string;
	type: 'user' | 'admin';
}
