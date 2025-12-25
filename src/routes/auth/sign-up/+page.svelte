<script lang="ts">
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth-client';

	let confirmPasswordError = $state<boolean | undefined>();

	const handleSignUp = async (event: Event) => {
		confirmPasswordError = undefined;
		event.preventDefault();

		const formData = new FormData(event.target as HTMLFormElement);

		const username = formData.get('username') as string;
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const confirmPassword = formData.get('confirm_password') as string;

		if (password !== confirmPassword) {
			confirmPasswordError = true;
			return;
		}

		const response = await authClient.signUp.email(
			{
				name: username,
				email,
				password
			},
			{
				onSuccess: () => {
					goto('/');
				}
			}
		);

		if (response.error) {
			alert(response.error.message);
			return;
		}
	};
</script>

<div class="container pt-4">
	<h1>Sign Up</h1>
	<form onsubmit={handleSignUp}>
		<fieldset>
			<label>
				Username
				<input name="username" id="username" placeholder="Username" required />
			</label>
			<label>
				Email
				<input type="email" name="email" id="email" placeholder="Email" required />
			</label>
			<label>
				Password
				<input type="password" name="password" id="password" placeholder="Password" required />
			</label>
			<label>
				Confirm Password
				<input
					type="password"
					name="confirm_password"
					id="confirm_password"
					placeholder="Confirm Password"
					required
					aria-invalid={confirmPasswordError}
					aria-describedby="confirm-password-helper"
				/>
				{#if confirmPasswordError}
					<small id="confirm-password-helper">Passwords do not match</small>
				{/if}
			</label>
		</fieldset>
		<input type="submit" value="Sign Up" />
	</form>
</div>
