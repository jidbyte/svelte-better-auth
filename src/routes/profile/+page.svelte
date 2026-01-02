<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import toast from 'svelte-french-toast';
	import {
		UpdateProfileClient,
		UpdateEmailClient,
		UpdatePasswordClient,
		DeleteAccountClient
	} from '$lib/modules/auth/client';
	import { UpdateProfile, UpdateEmail, UpdatePassword } from '$lib/modules/auth/auth.remote';

	const { image, firstname, lastname } = UpdateProfile.fields;
	const { email } = UpdateEmail.fields;
	const { currentPassword, newPassword, confirmNewPassword } = UpdatePassword.fields;

	let showDeleteDialog = $state(false);
	let deletePasswordInput = $state('');
	let isDeleting = $state(false);

	async function handleDeleteAccount() {
		if (!deletePasswordInput) {
			toast.error('Please enter your password to confirm');
			return;
		}

		isDeleting = true;
		await DeleteAccountClient(deletePasswordInput);
		isDeleting = false;
		showDeleteDialog = false;
		deletePasswordInput = '';
	}
</script>

<div class="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-3xl">
		<!-- Header -->
		<div class="mb-8">
			<h1 class="text-3xl font-semibold text-slate-900">Account Settings</h1>
			<p class="mt-2 text-sm text-slate-600">Manage your account information and preferences</p>
		</div>

		<div class="space-y-6">
			<!-- Profile Section -->
			<div class="rounded-lg border border-slate-200 bg-white shadow-sm">
				<div class="border-b border-slate-200 px-6 py-4">
					<div class="flex items-center">
						<svg
							class="mr-3 h-5 w-5 text-slate-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
							/>
						</svg>
						<h2 class="text-lg font-medium text-slate-900">Profile Information</h2>
					</div>
				</div>
				<div class="px-6 py-5">
					<form
						{...UpdateProfile.enhance(async ({ submit, data }) => {
							await submit();
							if (UpdateProfile.result?.ok) {
								await UpdateProfileClient(data);
							}
						})}
						class="space-y-4"
					>
						<div>
							<label for="image" class="mb-2 block text-sm font-medium text-slate-700">
								Profile Image URL
							</label>
							<Input
								{...image.as('text')}
								class={`transition-all ${image.issues() ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'focus:border-sky-500 focus:ring-sky-500'}`}
								placeholder="https://example.com/avatar.jpg"
							/>
							{#each image.issues() || [] as issue}
								<p class="mt-2 flex items-center text-sm text-red-600">
									<svg class="mr-1.5 h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
										<path
											fill-rule="evenodd"
											d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
											clip-rule="evenodd"
										/>
									</svg>
									{issue.message}
								</p>
							{/each}
						</div>

						<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<div>
								<label for="firstname" class="mb-2 block text-sm font-medium text-slate-700">
									First name
								</label>
								<Input
									{...firstname.as('text')}
									class={`transition-all ${firstname.issues() ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'focus:border-sky-500 focus:ring-sky-500'}`}
									placeholder="John"
								/>
								{#each firstname.issues() || [] as issue}
									<p class="mt-2 flex items-center text-sm text-red-600">
										<svg class="mr-1.5 h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
											<path
												fill-rule="evenodd"
												d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
												clip-rule="evenodd"
											/>
										</svg>
										{issue.message}
									</p>
								{/each}
							</div>

							<div>
								<label for="lastname" class="mb-2 block text-sm font-medium text-slate-700">
									Last name
								</label>
								<Input
									{...lastname.as('text')}
									class={`transition-all ${lastname.issues() ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'focus:border-sky-500 focus:ring-sky-500'}`}
									placeholder="Doe"
								/>
								{#each lastname.issues() || [] as issue}
									<p class="mt-2 flex items-center text-sm text-red-600">
										<svg class="mr-1.5 h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
											<path
												fill-rule="evenodd"
												d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
												clip-rule="evenodd"
											/>
										</svg>
										{issue.message}
									</p>
								{/each}
							</div>
						</div>

						<div class="flex justify-end">
							<Button
								type="submit"
								class="bg-sky-600 transition-all hover:bg-sky-700 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
								disabled={!!UpdateProfile.pending}
							>
								{UpdateProfile.pending ? 'Saving...' : 'Save changes'}
							</Button>
						</div>
					</form>
				</div>
			</div>

			<!-- Email Section -->
			<div class="rounded-lg border border-slate-200 bg-white shadow-sm">
				<div class="border-b border-slate-200 px-6 py-4">
					<div class="flex items-center">
						<svg
							class="mr-3 h-5 w-5 text-slate-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							/>
						</svg>
						<h2 class="text-lg font-medium text-slate-900">Email Address</h2>
					</div>
				</div>
				<div class="px-6 py-5">
					<form
						{...UpdateEmail.enhance(async ({ submit, form, data }) => {
							await submit();
							if (UpdateEmail.result?.ok) {
								await UpdateEmailClient(data.email);
								form.reset();
							}
						})}
						class="space-y-4"
					>
						<div>
							<label for="email" class="mb-2 block text-sm font-medium text-slate-700">
								New email address
							</label>
							<Input
								{...email.as('email')}
								class={`transition-all ${email.issues() ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'focus:border-sky-500 focus:ring-sky-500'}`}
								placeholder="you@example.com"
							/>
							{#each email.issues() || [] as issue}
								<p class="mt-2 flex items-center text-sm text-red-600">
									<svg class="mr-1.5 h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
										<path
											fill-rule="evenodd"
											d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
											clip-rule="evenodd"
										/>
									</svg>
									{issue.message}
								</p>
							{/each}
						</div>

						<div class="flex justify-end">
							<Button
								type="submit"
								class="bg-sky-600 transition-all hover:bg-sky-700 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
								disabled={!!UpdateEmail.pending}
							>
								{UpdateEmail.pending ? 'Updating...' : 'Update email'}
							</Button>
						</div>
					</form>
				</div>
			</div>

			<!-- Password Section -->
			<div class="rounded-lg border border-slate-200 bg-white shadow-sm">
				<div class="border-b border-slate-200 px-6 py-4">
					<div class="flex items-center">
						<svg
							class="mr-3 h-5 w-5 text-slate-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
							/>
						</svg>
						<h2 class="text-lg font-medium text-slate-900">Password</h2>
					</div>
				</div>
				<div class="px-6 py-5">
					<form
						{...UpdatePassword.enhance(async ({ submit, data }) => {
							await submit();
							if (UpdatePassword.result?.ok) {
								await UpdatePasswordClient(data);
							}
						})}
						class="space-y-4"
					>
						<div>
							<label for="currentPassword" class="mb-2 block text-sm font-medium text-slate-700">
								Current password
							</label>
							<Input
								{...currentPassword.as('password')}
								class={`transition-all ${currentPassword.issues() ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'focus:border-sky-500 focus:ring-sky-500'}`}
								placeholder="Enter current password"
							/>
							{#each currentPassword.issues() || [] as issue}
								<p class="mt-2 flex items-center text-sm text-red-600">
									<svg class="mr-1.5 h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
										<path
											fill-rule="evenodd"
											d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
											clip-rule="evenodd"
										/>
									</svg>
									{issue.message}
								</p>
							{/each}
						</div>

						<div>
							<label for="newPassword" class="mb-2 block text-sm font-medium text-slate-700">
								New password
							</label>
							<Input
								{...newPassword.as('password')}
								class={`transition-all ${newPassword.issues() ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'focus:border-sky-500 focus:ring-sky-500'}`}
								placeholder="At least 8 characters"
							/>
							{#each newPassword.issues() || [] as issue}
								<p class="mt-2 flex items-center text-sm text-red-600">
									<svg class="mr-1.5 h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
										<path
											fill-rule="evenodd"
											d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
											clip-rule="evenodd"
										/>
									</svg>
									{issue.message}
								</p>
							{/each}
						</div>

						<div>
							<label for="confirmNewPassword" class="mb-2 block text-sm font-medium text-slate-700">
								Confirm new password
							</label>
							<Input
								{...confirmNewPassword.as('password')}
								class={`transition-all ${confirmNewPassword.issues() ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'focus:border-sky-500 focus:ring-sky-500'}`}
								placeholder="Re-enter new password"
							/>
							{#each confirmNewPassword.issues() || [] as issue}
								<p class="mt-2 flex items-center text-sm text-red-600">
									<svg class="mr-1.5 h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
										<path
											fill-rule="evenodd"
											d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
											clip-rule="evenodd"
										/>
									</svg>
									{issue.message}
								</p>
							{/each}
						</div>

						<div class="flex justify-end">
							<Button
								type="submit"
								class="bg-sky-600 transition-all hover:bg-sky-700 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
								disabled={UpdatePassword.pending > 0}
							>
								{UpdatePassword.pending > 0 ? 'Updating...' : 'Update password'}
							</Button>
						</div>
					</form>
				</div>
			</div>

			<!-- Danger Zone -->
			<div class="rounded-lg border border-red-200 bg-white shadow-sm">
				<div class="border-b border-red-200 bg-red-50 px-6 py-4">
					<div class="flex items-center">
						<svg
							class="mr-3 h-5 w-5 text-red-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
						<h2 class="text-lg font-medium text-red-900">Danger Zone</h2>
					</div>
				</div>
				<div class="px-6 py-5">
					<p class="mb-4 text-sm text-slate-600">
						Once you delete your account, there is no going back. Please be certain.
					</p>
					<Button
						class="bg-red-600 transition-all hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
						onclick={() => (showDeleteDialog = true)}
					>
						Delete account
					</Button>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Delete Confirmation Dialog -->
{#if showDeleteDialog}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
		<div class="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
			<div class="mb-4 flex items-center">
				<div class="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
					<svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
						/>
					</svg>
				</div>
				<h3 class="ml-4 text-lg font-semibold text-slate-900">Delete Account</h3>
			</div>

			<p class="mb-4 text-sm text-slate-600">
				This action cannot be undone. This will permanently delete your account and remove all
				associated data.
			</p>

			<div class="mb-6">
				<label for="deletePassword" class="mb-2 block text-sm font-medium text-slate-700">
					Enter your password to confirm
				</label>
				<Input
					type="password"
					bind:value={deletePasswordInput}
					class="focus:border-red-500 focus:ring-red-500"
					placeholder="Your password"
				/>
			</div>

			<div class="flex gap-3">
				<Button
					class="flex-1 border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
					onclick={() => {
						showDeleteDialog = false;
						deletePasswordInput = '';
					}}
					disabled={isDeleting}
				>
					Cancel
				</Button>
				<Button
					class="flex-1 bg-red-600 hover:bg-red-700"
					onclick={handleDeleteAccount}
					disabled={isDeleting}
				>
					{isDeleting ? 'Deleting...' : 'Delete Account'}
				</Button>
			</div>
		</div>
	</div>
{/if}
