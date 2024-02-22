<script>
	import { onMount } from 'svelte';
	import { env } from '$lib/env';
	import { userSession } from '../../../server.js';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment'; // Import the browser variable to check if we're on the client-side

	let rawData;
	let entries;
	let currentPage = 1;
	const entriesPerPage = 5;
	let totalPages;

	onMount(async () => {
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
				processData(rawData); // Call processData here after rawData is fetched
			} else {
				console.error('Failed to fetch claims list');
			}
		}
	});

	function processData(data) {
		entries = data
			.map((claim) => ({
				id: claim.ID,
				reason: claim.Reason,
				status: claim.Status,
				date: claim.CreatedAt.slice(0, 10)
			}))
			.reverse();

		totalPages = Math.ceil(entries.length / entriesPerPage);
	}

	// Reactive statement to update paginatedEntries when currentPage or entries change
	$: paginatedEntries = entries?.slice(
		(currentPage - 1) * entriesPerPage,
		currentPage * entriesPerPage
	);

	// Function to change page
	function setPage(page) {
		currentPage = page;
	}
</script>

{#if rawData}
	<div class="container flex flex-col p-8 m-8 mx-auto bg-white rounded shadow-2xl">
		<div class="flex items-center justify-between p-4 mb-4">
			<h1 class="text-4xl font-bold">Medical Leaves</h1>
			<button class="px-8 text-l btn" on:click={() => goto('/student/claims/new')}>New</button>
		</div>
		<div class="flex-grow p-4 overflow-x-auto">
			<table class="table w-full my-auto">
				<thead>
					<tr>
						<th class="border">Serial No.</th>
						<th class="border">Date Created</th>
						<th class="border">Reason</th>
						<th class="border">Status</th>
					</tr>
				</thead>
				<tbody>
					{#each paginatedEntries as { id, date, reason, status }, index}
						<tr class="hover:bg-stone-300" on:click={() => goto(`/student/claims/${id}`)}>
							<td class="border">{index + 1 + (currentPage - 1) * entriesPerPage}</td>
							<td class="border">{date}</td>
							<td class="border">{reason}</td>
							<td class="border">{status}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		{#if totalPages > 1}
			<div class="flex justify-center w-full p-4">
				<div class="join">
					{#each Array(totalPages) as _, i}
						<button
							class="aspect-square join-item btn {currentPage === i + 1 ? 'btn-active' : ''}"
							on:click={() => setPage(i + 1)}>{i + 1}</button
						>
					{/each}
				</div>
			</div>
		{/if}
	</div>

	<style>
		/* Adjust table row height */
		tr {
			height: 70px;
		}
	</style>
{/if}
