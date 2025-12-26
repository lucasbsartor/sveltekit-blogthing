<script lang="ts">
	import { page } from '$app/state';
	import { getPostById, updatePost } from '$lib/remote/posts.remote';

	const post = $derived(await getPostById({ id: page.params.id! }));
</script>

<div class="container-content">
	<h1>Post</h1>
	<form {...updatePost}>
		<input {...updatePost.fields.id.as('text')} value={post.id} readonly hidden />
		<label>
			Title
			<input {...updatePost.fields.title.as('text')} value={post.title} />
		</label>
		{#each updatePost.fields.title.issues() as issue (issue.message)}
			<p>{issue.message}</p>
		{/each}
		<label>
			Content
			<textarea {...updatePost.fields.content.as('text')} value={post.content}></textarea>
		</label>
		{#each updatePost.fields.content.issues() as issue (issue.message)}
			<p>{issue.message}</p>
		{/each}
		<button type="submit">Post</button>
	</form>
</div>
