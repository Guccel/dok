import * as cookie from 'cookie';
import type { Handle, GetSession } from '@sveltejs/kit';
import type { UserSessionData } from 'types';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import { getSessionData, verifySession } from './helpers';

export const handle: Handle = async ({ request, resolve }) => {
	//# user authentication
	// get cookies from browser storage
	const cookies = cookie.parse(request.headers.cookie || '');

	// make sure user is defined
	if (typeof request.locals.user === 'undefined') request.locals.user = { authenticated: false, data: {} };

	// initialise variables
	const session_id: string = cookies.session_id || null;

	const data: UserSessionData = await getSessionData(session_id);

	request.locals.user = {
		session_id,
		data
	};

	//# rerouting
	// test if path starts with "/admin"
	if (RegExp(/^(\/admin\/?)/).exec(request.url.toString())) {
		if (!(data.type == 'admin')) return { status: 300, headers: { location: '/' } };
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
