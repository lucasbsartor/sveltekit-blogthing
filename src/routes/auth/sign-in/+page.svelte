<script lang="ts">
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth-client';
	import { resolve } from '$app/paths';
	import { getUser } from '$lib/remote/user.remote';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Field from '$lib/components/ui/field';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';

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

<div class="flex min-h-[calc(100vh-200px)] items-center justify-center">
	<Card class="w-full max-w-md">
		<CardHeader>
			<CardTitle>Sign In</CardTitle>
			<CardDescription>Enter your credentials to access your account</CardDescription>
		</CardHeader>
		<form onsubmit={handleSignIn}>
			<CardContent>
				<Field.Set>
					<Field.Group>
						{#if error}
							<Field.Field>
								<Field.Error>{error}</Field.Error>
							</Field.Field>
						{/if}
						<Field.Field>
							<Field.Label for="email">Email</Field.Label>
							<Input type="email" id="email" name="email" placeholder="Email" required />
						</Field.Field>
						<Field.Field>
							<Field.Label for="password">Password</Field.Label>
							<Input
								type="password"
								id="password"
								name="password"
								placeholder="Password"
								required
							/>
						</Field.Field>
					</Field.Group>
				</Field.Set>
			</CardContent>
			<CardFooter class="flex flex-col gap-4">
				<Button type="submit" class="w-full">Sign In</Button>
				<p class="text-center text-sm text-muted-foreground">
					Don't have an account? <a
						href={resolve('/auth/sign-up')}
						class="text-primary hover:underline">Sign up</a
					>
				</p>
			</CardFooter>
		</form>
	</Card>
</div>
