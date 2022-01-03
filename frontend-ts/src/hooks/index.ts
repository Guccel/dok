import * as cookie from 'cookie';
import axios, { AxiosResponse } from 'axios';
import type { Handle, GetSession } from '@sveltejs/kit';
import type { UserData_Type } from '../global';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';

async function verifySession(session_id: string): Promise<boolean> {
	const response: AxiosResponse = await axios({
		method: 'POST',
		url: 'http://localhost:3000/session/verify',
<<<<<<< HEAD
		headers: { 'Content-Type': 'application/json' },
=======
		headers: {
			'Content-Type': 'application/json'
		},
>>>>>>> main
		data: { session_id }
	});
	return response.data;
}

async function getSessionData(session_id: string): Promise<UserData_Type> {
	const response: AxiosResponse = await axios({
		method: 'POST',
		url: 'http://localhost:3000/session/get-data',
<<<<<<< HEAD
		headers: { 'Content-Type': 'application/json' },
=======
		headers: {
			'Content-Type': 'application/json'
		},
>>>>>>> main
		data: { session_id }
	});
	return response.data;
}

export const handle: Handle = async ({ request, resolve }) => {
	//# user authentication
	// get cookies from browser storage
	const cookies = cookie.parse(request.headers.cookie || '');

	// make sure user is defined
	if (typeof request.locals.user === 'undefined') request.locals.user = { authenticated: false, data: {} };

	// initialise variables
<<<<<<< HEAD
	const session_id: string = cookies.session_id || null;
=======
	const session_id: string = cookies.session_id;
>>>>>>> main
	const authenticated: boolean = session_id ? await verifySession(cookies.session_id) : false;
	const data: UserData_Type = authenticated ? await getSessionData(session_id) : { type: 'unauthenticated' };

	request.locals.user = {
		authenticated,
		session_id,
		data
	};

	//# rerouting
	// test if path starts with "/admin"
	if (RegExp(/^(\/admin\/?)/).exec(request.url.toString())) {
<<<<<<< HEAD
		if (!authenticated && !(data.type == 'admin')) return { status: 300, headers: { location: '/' } };
=======
		if (!authenticated && !(data.type == 'admin'))
			return {
				status: 300,
				headers: {
					location: '/'
				}
			};
>>>>>>> main
	}

	//# create and return response
	const response = await resolve(request);
	return {
		...response
	};
};

export const getSession: GetSession = async (request: ServerRequest) => {
	const user = request.locals.user;
	const out = { user };
	return out;
};
