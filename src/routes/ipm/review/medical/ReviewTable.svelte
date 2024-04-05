<script>
	import { goto } from '$app/navigation';

	export let entries;
	let currentPage = 1;
	const entriesPerPage = 5;
	let totalPages;

	totalPages = Math.ceil(entries.length / entriesPerPage);

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

<div class="flex-grow p-4 overflow-x-auto">
	<table class="table w-full my-auto">
		<thead>
			<tr>
				<th class="border">Serial No.</th>
				<th class="border">Date Created</th>
				<th class="border">Reason</th>
				<th class="border">Class</th>
			</tr>
		</thead>
		<tbody>
			{#each paginatedEntries as { id, date, reason, program }, index}
				<tr class="hover:bg-stone-300" on:click={() => goto(`/ipm/review/${id}`)}>
					<td class="border">{index + 1 + (currentPage - 1) * entriesPerPage}</td>
					<td class="border">{date}</td>
					<td class="border">{reason}</td>
					<td class="border">{program}</td>
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

<style>
	/* Adjust table row height */
	tr {
		height: 70px;
	}
</style>
