<script lang="ts">
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth-client';
	import { resolve } from '$app/paths';
	import { getUser } from '$lib/remote/user.remote';

	let error = $state<string | null>(null);

	const handleSignIn = async (event: Event) => {
		error = null;
		event.preventDefault();

		const formData = new FormData(event.target as HTMLFormElement);

		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const response = await authClient.signIn.email(
			{
				email,
				password
			},
			{
				onSuccess: async () => {
					await getUser().refresh();
					goto(resolve('/'));
				}
			}
		);

		if (response.error) {
			error = response.error.message ?? 'An error occurred';
		}
	};
</script>

<div class="container-content pt-4">
	<h1>Sign In</h1>
	{#if error}
		<div class="error" role="alert">
			<p>{error}</p>
		</div>
	{/if}
	<form onsubmit={handleSignIn}>
		<fieldset>
			<label>
				Email
				<input type="email" name="email" id="email" placeholder="Email" required />
			</label>
			<label>
				Password
				<input type="password" name="password" id="password" placeholder="Password" required />
			</label>
		</fieldset>
		<input type="submit" value="Sign In" />
	</form>
	<p class="redirect">
		Don't have an account? <a href={resolve('/auth/sign-up')}>Sign up</a>
	</p>
</div>
