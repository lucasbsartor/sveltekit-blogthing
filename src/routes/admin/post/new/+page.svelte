<script lang="ts">
	import { createPost } from '$lib/remote/posts.remote';
</script>

<div class="container-content">
	<h1>New Post</h1>
	<form {...createPost}>
		<label>
			Title
			<input {...createPost.fields.title.as('text')} />
		</label>
		{#each createPost.fields.title.issues() as issue (issue.message)}
			<p>{issue.message}</p>
		{/each}
		<label>
			Content
			<textarea {...createPost.fields.content.as('text')}></textarea>
		</label>
		{#each createPost.fields.content.issues() as issue (issue.message)}
			<p>{issue.message}</p>
		{/each}
		<button type="submit">Post</button>
	</form>
</div>
