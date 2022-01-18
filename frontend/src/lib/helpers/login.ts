import Cookies from 'js-cookie';
import { session } from '$app/stores';
import axios from 'axios';

export async function loginWithId(session_id: string): Promise<void> {
	const response = await axios({
		method: 'GET',
		url: `http://localhost:3000/user/login${session_id}`,
		headers: { 'Content-Type': 'application/json' }
	});
	Cookies.set('session_id', session_id, {
		sameSite: 'lax'
	});

	// Update session with current user data
	session.update((store) => ({
		...store,
		user: {
			session_id,
			data: response.data
		}
	}));
}
