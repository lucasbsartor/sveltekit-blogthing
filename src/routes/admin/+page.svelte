<script lang="ts">
	import { goto } from '$app/navigation';

	import CreatePost from './create-post.svelte';
	import { deletePost, getAllPosts } from '$lib/remote/posts.remote';

	const posts = $derived(await getAllPosts());

	const handleDeletePost = async (id: string) => {
		await deletePost({ id }).updates(getAllPosts());
	};
</script>

<div class="container-content pt-4">
	<h1>Admin</h1>
	<p>This is the admin page</p>
	<button onclick={() => goto('/admin/post/new')}>New Post</button>
	<CreatePost />
	<table>
		<thead>
			<tr>
				<th>Title</th>
				<th>Slug</th>
				<th>Author</th>
				<th>Created At</th>
				<th>Updated At</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each posts as post}
				<tr>
					<td>{post.title}</td>
					<td>{post.slug}</td>
					<td>{post.authorId}</td>
					<td>{post.createdAt.toLocaleString()}</td>
					<td>{post.updatedAt.toLocaleString()}</td>
					<td>
						<button onclick={() => goto(`/admin/post/${post.id}`)}>View</button>
						<button onclick={() => handleDeletePost(post.id)}>Delete</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
