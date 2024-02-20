<script>
	// Sample data for the table
	let medicalLeaves = [
		{ srNo: 1, date: '2024-02-15', hoursMissed: 8, status: 'Approved' },
		{ srNo: 2, date: '2024-02-16', hoursMissed: 4, status: 'Pending' },
		{ srNo: 3, date: '2024-02-17', hoursMissed: 2, status: 'Denied' }
		// Add more entries as needed
	];
</script>

<!-- Add a container for the table with some padding and possibly a card style if desired -->
<div class="p-4 rounded-lg shadow-lg self-center bg-white">
	<!-- Table title -->
	<h2 class="text-3xl font-bold mb-4">Medical Leaves</h2>

	<!-- Table with DaisyUI classes -->
	<table class="table text-center">
		<!-- Table header -->
		<thead class="border-b-2">
			<tr>
				<th>Sr No</th>
				<th>Date</th>
				<th>Hours Missed</th>
				<th>Status of Application</th>
			</tr>
		</thead>
		<!-- Table body -->
		<tbody>
			{#each medicalLeaves as leave}
				<tr class="hover">
					<td>{leave.srNo}</td>
					<td>{leave.date}</td>
					<td>{leave.hoursMissed}</td>
					<!-- Use conditional styling for status -->
					<td
						class={leave.status === 'Approved'
							? 'text-green-500'
							: leave.status === 'Pending'
								? 'text-yellow-500'
								: 'text-red-500'}
					>
						{leave.status}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	/* Additional custom styles if needed */
</style>
