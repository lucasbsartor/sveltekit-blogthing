<script lang="ts">
	import { getPostBySlug } from '$lib/remote/posts.remote';
	import { page } from '$app/state';

	const post = $derived(await getPostBySlug({ slug: page.params.slug! }));
</script>

<h1 class="text-3xl font-bold">{post.title}</h1>
<p class="text-muted-foreground">{post.createdAt.toLocaleDateString()}</p>
<div class="prose prose-neutral dark:prose-invert">
	{post.content}
</div>
