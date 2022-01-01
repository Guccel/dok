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
