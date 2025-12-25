import { form, getRequestEvent, query } from '$app/server';
import { auth } from '$lib/auth';
import { db } from '$lib/server/db';
import { post } from '$lib/server/db/schema';
import { error, redirect } from '@sveltejs/kit';
import * as z from 'zod';

export const getAllPosts = query(async () => db.query.post.findMany());

export const createPost = form(
	z.object({
		title: z.string().min(1),
		content: z.string().min(1)
	}),
	async ({ title, content }) => {
		const event = getRequestEvent();
		const session = await auth.api.getSession({
			headers: event.request.headers
		});

		if (!session?.user) {
			return error(401, 'Unauthorized');
		}

		const slug = title.toLowerCase().replace(/ /g, '-');

		await db.insert(post).values({
			title,
			slug,
			content,
			authorId: session.user.id
		});

		return redirect(303, `/admin`);
	}
);
