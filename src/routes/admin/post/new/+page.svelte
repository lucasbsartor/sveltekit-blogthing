<script lang="ts">
	import { createPost } from '$lib/remote/posts.remote';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Label } from '$lib/components/ui/label';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
</script>

<Card>
	<CardHeader>
		<CardTitle>Create New Post</CardTitle>
	</CardHeader>
	<CardContent>
		<form {...createPost} class="space-y-4">
			<div class="space-y-2">
				<Label for="title">Title</Label>
				<Input {...createPost.fields.title.as('text')} id="title" />
				{#each createPost.fields.title.issues() as issue (issue.message)}
					<p class="text-sm text-destructive">{issue.message}</p>
				{/each}
			</div>
			<div class="space-y-2">
				<Label for="content">Content</Label>
				<Textarea {...createPost.fields.content.as('text')} id="content" class="min-h-[200px]" />
				{#each createPost.fields.content.issues() as issue (issue.message)}
					<p class="text-sm text-destructive">{issue.message}</p>
				{/each}
			</div>
			<Button type="submit">Publish Post</Button>
		</form>
	</CardContent>
</Card>
