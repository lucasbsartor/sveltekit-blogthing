<script lang="ts">
	import { page } from '$app/state';
	import { getPostById, updatePost } from '$lib/remote/posts.remote';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Field from '$lib/components/ui/field';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';

	const post = $derived(await getPostById({ id: page.params.id! }));
</script>

<Card>
	<CardHeader>
		<CardTitle>Edit Post</CardTitle>
	</CardHeader>
	<CardContent>
		<form {...updatePost} class="space-y-4">
			<Input {...updatePost.fields.id.as('text')} value={post.id} readonly hidden />
			<Field.Field>
				<Field.Label for="title">Title</Field.Label>
				<Input {...updatePost.fields.title.as('text')} id="title" value={post.title} />
				{#each updatePost.fields.title.issues() as issue (issue.message)}
					<Field.Error>{issue.message}</Field.Error>
				{/each}
			</Field.Field>
			<Field.Field>
				<Field.Label for="content">Content</Field.Label>
				<Textarea
					{...updatePost.fields.content.as('text')}
					id="content"
					value={post.content}
					class="min-h-[200px]"
				/>
				{#each updatePost.fields.content.issues() as issue (issue.message)}
					<Field.Error>{issue.message}</Field.Error>
				{/each}
			</Field.Field>
			<Button type="submit">Save Changes</Button>
		</form>
	</CardContent>
</Card>
