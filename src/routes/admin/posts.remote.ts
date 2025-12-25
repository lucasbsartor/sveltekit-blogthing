import { query } from '$app/server';
import { db } from '$lib/server/db';

export const getAllPosts = query(async () => db.query.post.findMany());
