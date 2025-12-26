import { command, form, getRequestEvent, query } from '$app/server';
import { auth } from '$lib/auth';
import { db } from '$lib/server/db';
import { post } from '$lib/server/db/schema';
import { error, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import * as z from 'zod';

export const getAllPosts = query(async () => db.query.post.findMany());

export const getPostById = query(z.object({ id: z.string() }), async ({ id }) => {
	const result = await db.query.post.findFirst({ where: eq(post.id, id) });

	if (!result) {
		return error(404, 'Post not found');
	}

	return result;
});

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

export const updatePost = form(
	z.object({
		id: z.string(),
		title: z.string().min(1),
		content: z.string().min(1)
	}),
	async ({ id, title, content }) => {
		const event = getRequestEvent();
		const session = await auth.api.getSession({
			headers: event.request.headers
		});

		if (!session?.user) {
			return error(401, 'Unauthorized');
		}

		const slug = title.toLowerCase().replace(/ /g, '-');

		await db
			.update(post)
			.set({
				title,
				slug,
				content
			})
			.where(eq(post.id, id));

		return redirect(303, `/admin`);
	}
);

export const deletePost = command(z.object({ id: z.string() }), async ({ id }) => {
	const event = getRequestEvent();
	const session = await auth.api.getSession({
		headers: event.request.headers
	});

	if (!session?.user) {
		return error(401, 'Unauthorized');
	}

	await db.delete(post).where(eq(post.id, id));
});
