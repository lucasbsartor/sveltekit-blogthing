<script lang="ts">
	import { createPost } from './posts.remote';
</script>

<form {...createPost}>
	<!-- svelte-ignore a11y_no_redundant_roles -->
	<fieldset role="group">
		<input {...createPost.fields.title.as('text')} />
		<button type="submit">Post</button>
	</fieldset>
	<fieldset>
		<label>
			Content
			<textarea {...createPost.fields.content.as('text')}></textarea>
		</label>
	</fieldset>
</form>
