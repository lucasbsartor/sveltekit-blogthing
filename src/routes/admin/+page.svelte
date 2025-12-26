<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { deletePost, getAllPosts } from '$lib/remote/posts.remote';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table';

	const posts = $derived.by(async () => await getAllPosts());

	const handleDeletePost = async (id: string) => {
		await deletePost({ id }).updates(getAllPosts());
	};
</script>

<Card>
	<CardHeader class="flex flex-row items-center justify-between">
		<CardTitle>Admin Dashboard</CardTitle>
		<Button onclick={() => goto(resolve('/admin/post/new'))}>New Post</Button>
	</CardHeader>
	<CardContent>
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Title</TableHead>
					<TableHead>Slug</TableHead>
					<TableHead>Author</TableHead>
					<TableHead>Created At</TableHead>
					<TableHead>Updated At</TableHead>
					<TableHead>Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{#await posts then postList}
					{#each postList as post (post.id)}
						<TableRow>
							<TableCell>{post.title}</TableCell>
							<TableCell>{post.slug}</TableCell>
							<TableCell>{post.authorId}</TableCell>
							<TableCell>{post.createdAt.toLocaleString()}</TableCell>
							<TableCell>{post.updatedAt.toLocaleString()}</TableCell>
							<TableCell>
								<div class="flex gap-2">
									<Button
										variant="outline"
										size="sm"
										onclick={() => goto(resolve(`/admin/post/${post.id}`))}>Edit</Button
									>
									<Button variant="destructive" size="sm" onclick={() => handleDeletePost(post.id)}
										>Delete</Button
									>
								</div>
							</TableCell>
						</TableRow>
					{/each}
				{/await}
			</TableBody>
		</Table>
	</CardContent>
</Card>
