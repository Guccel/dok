import type { UserSessionData } from 'types';
import axios, { AxiosResponse } from 'axios';

// possibly unneeded
export async function verifySession(session_id: string): Promise<boolean> {
	const response: AxiosResponse = await axios({
		method: 'GET',
		url: `http://localhost:3000/session/verify/${session_id}`,
		headers: { 'Content-Type': 'application/json' }
	});
	if (response.status === 230) return true;
	if (response.status === 231) return false;
	console.log('helper.ts: bad req');
	return false;
}

export async function getSessionData(session_id: string): Promise<UserSessionData> {
	if (session_id) {
		const response: AxiosResponse = await axios({
			method: 'GET',
			url: `http://localhost:3000/session/get-data/${session_id}`,
			headers: { 'Content-Type': 'application/json' }
		});

		if (response.status === 200) return response.data;
		if (response.status === 404) {
			console.log('helper.ts: not found');
			return { type: 'unauthenticated' };
		}
	} else if (session_id === null) return { type: 'unauthenticated' };
	console.log('helper.ts: bad req 2');
	return { type: 'unauthenticated' };
}
