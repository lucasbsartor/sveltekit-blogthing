<script lang="ts">
	import CreatePost from './create-post.svelte';
	import { getAllPosts } from './posts.remote';

	const posts = $derived(await getAllPosts());
</script>

<div class="container-content">
	<h1>Admin</h1>
	<p>This is the admin page</p>
	<CreatePost />
	<table>
		<thead>
			<tr>
				<th>Title</th>
				<th>Slug</th>
				<th>Author</th>
				<th>Created At</th>
				<th>Updated At</th>
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
				</tr>
			{/each}
		</tbody>
	</table>
</div>
