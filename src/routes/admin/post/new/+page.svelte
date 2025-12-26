<script lang="ts">
	import { createPost } from '$lib/remote/posts.remote';
	import { Button } from '$lib/components/ui/button';
	import * as Field from '$lib/components/ui/field';
	import { Input } from '$lib/components/ui/input';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { Textarea } from '$lib/components/ui/textarea';
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
</script>

<div class="mx-auto space-y-8 py-8">
	<div class="space-y-4">
		<Button variant="ghost" size="sm" href="/admin" class="-ml-2 text-muted-foreground">
			<ArrowLeftIcon class="mr-1.5 size-4" />
			Back to Posts
		</Button>

		<div class="space-y-1">
			<h1 class="text-2xl font-bold tracking-tight">Create New Post</h1>
			<p class="text-muted-foreground">Write and publish a new blog post</p>
		</div>
	</div>

	<Separator />

	<form {...createPost} class="space-y-8">
		<Field.Field>
			<Field.Label for="title">Title</Field.Label>
			<Input {...createPost.fields.title.as('text')} id="title" placeholder="Enter post title" />
			{#each createPost.fields.title.issues() as issue (issue.message)}
				<Field.Error>{issue.message}</Field.Error>
			{/each}
		</Field.Field>

		<Field.Field>
			<Field.Label for="content">Content</Field.Label>
			<Textarea
				{...createPost.fields.content.as('text')}
				id="content"
				class="min-h-[300px]"
				placeholder="Write your post content here..."
			/>
			{#each createPost.fields.content.issues() as issue (issue.message)}
				<Field.Error>{issue.message}</Field.Error>
			{/each}
		</Field.Field>

		<div class="flex justify-end gap-3 pt-4">
			<Button variant="outline" href="/admin">Cancel</Button>
			<Button type="submit">Publish Post</Button>
		</div>
	</form>
</div>
