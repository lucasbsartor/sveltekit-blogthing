<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import * as Field from '$lib/components/ui/field';
	import { Input } from '$lib/components/ui/input';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { Textarea } from '$lib/components/ui/textarea';
	import { getPostById, updatePost } from '$lib/remote/posts.remote';
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';

	const post = $derived(await getPostById({ id: page.params.id! }));
</script>

<div class="mx-auto space-y-8 py-8">
	<div class="space-y-4">
		<Button variant="ghost" size="sm" href="/admin" class="-ml-2 text-muted-foreground">
			<ArrowLeftIcon class="mr-1.5 size-4" />
			Back to Posts
		</Button>

		<div class="space-y-1">
			<h1 class="text-2xl font-bold tracking-tight">Edit Post</h1>
			<p class="text-muted-foreground">Update your blog post content</p>
		</div>
	</div>

	<Separator />

	<form {...updatePost} class="space-y-8">
		<input type="hidden" name="id" value={post.id} />

		<Field.Field>
			<Field.Label for="title">Title</Field.Label>
			<Input id="title" name="title" value={post.title} placeholder="Enter post title" />
			{#each updatePost.fields.title.issues() as issue (issue.message)}
				<Field.Error>{issue.message}</Field.Error>
			{/each}
		</Field.Field>

		<Field.Field>
			<Field.Label for="content">Content</Field.Label>
			<Textarea
				id="content"
				name="content"
				value={post.content}
				class="min-h-[300px]"
				placeholder="Write your post content here..."
			/>
			{#each updatePost.fields.content.issues() as issue (issue.message)}
				<Field.Error>{issue.message}</Field.Error>
			{/each}
		</Field.Field>

		<div class="flex justify-end gap-3 pt-4">
			<Button variant="outline" href="/admin">Cancel</Button>
			<Button type="submit">Save Changes</Button>
		</div>
	</form>
</div>
