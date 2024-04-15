<script context="module">
	export let Periods = new Map();
</script>

<script>
	import { onMount } from 'svelte';
	import { env } from '$lib/env';
	import { userSession } from '../../../server';

	let attendanceData = []; // This will be populated with the processed data
	let periods = ['S1', 'P0', 'P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9']; // Assuming these are all the periods

	let student;
	let rawData = [];

	onMount(async () => {
		const token = localStorage.getItem('token');
		if (token) {
			userSession.set({ isAuthenticated: true, role: null, token });
		}
		const response = await fetch(`${env.GO_API_KEY}/student/info`, {
			headers: {
				Authorization: `Bearer ${$userSession.token}`
			}
		});

		if (response.ok) {
			student = await response.json();
			rawData = student.Attendance;
			processAttendanceData(rawData);
		} else {
			console.error('Failed to fetch student info');
		}
	});

	function processAttendanceData(rawData) {
		let dataByDate = {};

		// Assuming these are all the periods you want to show
		let allPeriods = ['S1', 'P0', 'P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'];

		// Group data by date and period
		rawData.forEach((entry) => {
			if (!dataByDate[entry.Date]) {
				dataByDate[entry.Date] = {};
				allPeriods.forEach((period) => {
					dataByDate[entry.Date][period] = null; // Initialize all periods with null
				});
			}
			// Only consider the entry if the student was absent or hasn't claimed that period
			if (!entry.IsPresent) {
				dataByDate[entry.Date][entry.Period] = entry;
			}
		});

		// Convert the grouped data into an array format suitable for rendering
		attendanceData = Object.keys(dataByDate).map((date) => ({
			date,
			periods: allPeriods.map((period) => ({
				period,
				data: dataByDate[date][period] // Will be either the entry or null
			}))
		}));

		attendanceData.sort((a, b) => {
			// Convert date strings to Date objects and compare
			return new Date(a.date) - new Date(b.date);
		});
	}

	let selectedPeriods = new Map();
	function togglePeriod(date, period) {
		const key = `${date}-${period}`;
		if (selectedPeriods.has(key)) {
			selectedPeriods.delete(key);
		} else {
			selectedPeriods.set(key, true);
		}
		// Trigger reactivity
		selectedPeriods = new Map(selectedPeriods);
		Periods = selectedPeriods;
	}

	$: selectedClasses = (date, period) => {
		return selectedPeriods.has(`${date}-${period}`) ? 'bg-blue-500' : 'bg-transparent';
	};
</script>

<div class="overflow-auto h-screen/2 bg-white rounded-lg shadow-md p-4">
	<table class="table-auto w-full h-full">
		<thead>
			<tr>
				<th class="border">Date</th>
				{#each periods as period}
					<th class="px-4 py-2 w-20 border">{period}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each attendanceData as day}
				<tr>
					<td class="px-4 py-2 border">{day.date}</td>
					{#each day.periods as periodData}
						{#if periodData.data}
							<td
								class="px-4 py-2 cursor-pointer border text-error"
								class:bg-success={selectedPeriods.has(`${day.date}-${periodData.period}`)}
								on:click={() => periodData.data && togglePeriod(day.date, periodData.period)}
							>
								{periodData.data.Course}
							</td>
						{:else}
							<td class="px-4 py-2 border"></td>
						{/if}
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	/* Add any additional styles here */
	.cursor-pointer {
		cursor: pointer;
	}
</style>
