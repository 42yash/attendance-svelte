<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { env } from '$lib/env';
	import { userSession } from '../../../../server.js';
	import { goto } from '$app/navigation';

	// Access the dynamic parameter 'slug'
	export let params = $page.params;
	let claimid = params.claimid;
	let rawData;
	let formattedStartDate;
	let formattedEndDate;
	// onMount send request to api/claims/[claimid]
	onMount(async () => {
		const token = localStorage.getItem('token');
		if (token) {
			userSession.set({ isAuthenticated: true, role: null, token });
		}
		const response = await fetch(`${env.GO_API_KEY}/claims/${claimid}`, {
			headers: {
				Authorization: `Bearer ${$userSession.token}`
			}
		});

		if (response.ok) {
			rawData = await response.json();
			let attendanceDates = rawData.ClaimReviews.map((review) =>
				Date.parse(review.Attendance.Date)
			);
			let startDate = new Date(Math.min(...attendanceDates));
			let endDate = new Date(Math.max(...attendanceDates));

			formattedStartDate = new Date(startDate).toLocaleDateString();
			formattedEndDate = new Date(endDate).toLocaleDateString();
		} else {
			console.error('Failed to fetch student info');
		}
	});
</script>

{#if rawData}
	<div class="container p-8 m-8">
		<div class="space-y-4 shadow-2xl card-body card-normal bg-base-100 rounded-xl">
			<div class="flex items-center justify-between mb-4">
				<h2 class="text-4xl">Medical Leave #{rawData.StudentId}{rawData.ID}</h2>
				<div class="flex items-center justify-center gap-4">
					<p class="text-md">{rawData.Status}</p>
					<button
						class="px-8 text-l btn"
						on:click={() => goto(`/student/claims/new/recur/${claimid}`)}>Reccur</button
					>
					<button class="px-8 text-l btn" on:click={() => goto('/student/claims/')}>Back</button>
				</div>
			</div>

			<div class="form-group">
				<label class="text-xl" for="reason">Date:</label>
				<p class="text-md">{formattedStartDate} to {formattedEndDate}</p>
			</div>

			<div class="form-group">
				<label class="text-xl" for="reason">Reason:</label>
				<p class="text-md">{rawData.Reason}</p>
			</div>
			<div class="form-group">
				<label class="text-xl" for="description">Description:</label>
				<p class="text-md">{rawData.Description}</p>
			</div>
			<div class="form-group">
				<label class="text-xl" for="description">Files:</label>
				{#each rawData.Files as file, index (index)}
					<p class="text-md">
						<a
							href={`https://nuccnlggddczpeykmixe.supabase.co/storage/v1/object/public/medical-docs/${file.Path}`}
							target="_blank">{file.Name}</a
						>
					</p>
				{/each}
			</div>
			<h3 class="text-xl">Classes Missed:</h3>
			<table class="border table-md">
				<thead class="border">
					<tr>
						<th class="border">Subject Code</th>
						<th class="border">Teacher Name</th>
						<th class="border">Status</th>
					</tr>
				</thead>
				<tbody>
					{#each rawData.ClaimReviews as claim}
						<tr>
							<td class="border">{claim.Attendance.Course}</td>
							<td class="border">{claim.Teacher.Name}</td>
							<td class="border">
								{#if claim.Status === 'pending'}
									Pending
								{:else if claim.Status === 'approved'}
									Approved
								{:else if claim.Status === 'rejected'}
									<div class="tooltip" data-tip={claim.Message}>
										<button class="btn">Rejected</button>
									</div>
								{:else}
									Error
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
{/if}
