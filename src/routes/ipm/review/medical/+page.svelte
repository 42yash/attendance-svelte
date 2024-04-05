<script>
	import ReviewTable from './ReviewTable.svelte';
	let selectedOption = 'Pending';

	import { env } from '$lib/env';
	import { userSession } from '../../../../server.js';
	import { browser } from '$app/environment'; // Import the browser variable to check if we're on the client-side

	let entries = [];
	let promise = getClaimsList();
	let rawData;

	async function getClaimsList() {
		if (browser) {
			// Check if we're running on the client-side
			const token = localStorage.getItem('token');
			if (token) {
				userSession.set({ isAuthenticated: true, role: null, token });
			}
			const response = await fetch(`${env.GO_API_KEY}/ipm/claims`, {
				headers: {
					Authorization: `Bearer ${$userSession.token}`
				}
			});

			if (response.ok) {
				rawData = await response.json();
				rawData.sort((a, b) => new Date(a.CreatedAt) - new Date(b.CreatedAt));
				rawData.forEach((claim) => {
					entries.push({
						id: claim.ID,
						date: claim.CreatedAt.slice(0, 10),
						reason: claim.Reason,
						program: claim.Student.Class
					});
				});
				console.log(entries)
				return;
			} else {
				console.error('Failed to fetch claims list');
			}
		}
	}
</script>

<div class="container flex flex-col p-8 m-8 mx-auto bg-white rounded shadow-2xl">
	<h1 class="px-4 mb-4 text-4xl font-bold">Review Medical Leaves</h1>
	<div class="flex items-center justify-between p-4 mb-4">
		<div class="btn-group join">
			<button
				class={`join-item p-4 btn ${selectedOption === 'Pending' ? 'btn-active' : ''} `}
				on:click={() => (selectedOption = 'Pending')}
			>
				Pending Reviews
			</button>
			<button
				class={`join-item p-4 btn ${selectedOption === 'Reviewed' ? 'btn-active' : ''} `}
				on:click={() => (selectedOption = 'Reviewed')}
			>
				Reviewed Leaves
			</button>
			<button
				class={`join-item p-4 btn ${selectedOption === 'Archived' ? 'btn-active' : ''} `}
				on:click={() => (selectedOption = 'Archived')}
			>
				Archived Leave
			</button>
		</div>
	</div>
	{#await promise}
		Loading...
	{:then data}
		{#if selectedOption === 'Pending'}
			<ReviewTable {entries} />
		{:else if selectedOption === 'Reviewed'}
			<ReviewTable {entries} />
		{:else}
			<ReviewTable {entries} />
		{/if}
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</div>
