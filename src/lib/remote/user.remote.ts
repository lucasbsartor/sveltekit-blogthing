import { getRequestEvent, query } from '$app/server';
import { auth } from '$lib/auth';

export const getUser = query(async () => {
	const event = getRequestEvent();
	const session = await auth.api.getSession({
		headers: event.request.headers
	});

	if (!session?.user) {
		return null;
	}

	return {
		id: session.user.id,
		name: session.user.name,
		email: session.user.email
	};
});
