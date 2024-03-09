<script>
	import ClaimsTable from './ClaimsTable.svelte';
	import { env } from '$lib/env';
	import { userSession } from '../../../server.js';
	import { browser } from '$app/environment'; // Import the browser variable to check if we're on the client-side

	let promise = getClaimsList();
	let rawData;

	async function getClaimsList() {
		if (browser) {
			// Check if we're running on the client-side
			const token = localStorage.getItem('token');
			if (token) {
				userSession.set({ isAuthenticated: true, role: null, token });
			}
			const response = await fetch(`${env.GO_API_KEY}/claims/`, {
				headers: {
					Authorization: `Bearer ${$userSession.token}`
				}
			});

			if (response.ok) {
				rawData = await response.json();
				return await rawData;
			} else {
				console.error('Failed to fetch claims list');
			}
		}
	}
</script>

{#await promise}
	<p>Loading...</p>
{:then data}
	<ClaimsTable {data} />
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
