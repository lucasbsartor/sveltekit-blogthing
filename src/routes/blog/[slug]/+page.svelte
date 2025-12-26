<script lang="ts">
	import { getPostBySlug } from '$lib/remote/posts.remote';
	import { page } from '$app/state';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { Button } from '$lib/components/ui/button';
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';

	const post = $derived(await getPostBySlug({ slug: page.params.slug! }));
</script>

<div class="mx-auto space-y-8 py-8">
	<div class="space-y-4">
		<Button variant="ghost" size="sm" href="/blog" class="-ml-2 text-muted-foreground">
			<ArrowLeftIcon class="mr-1.5 size-4" />
			Back to Blog
		</Button>

		<div class="space-y-2">
			<h1 class="text-3xl font-bold tracking-tight">{post.title}</h1>
			<p class="text-muted-foreground">
				{post.createdAt.toLocaleDateString('en-US', {
					weekday: 'long',
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}
			</p>
		</div>
	</div>

	<Separator />

	<article class="prose prose-neutral dark:prose-invert max-w-none">
		{post.content}
	</article>
</div>
