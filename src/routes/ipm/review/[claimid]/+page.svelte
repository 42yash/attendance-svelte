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
	let msg;
	let stat;

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
		} else {
			console.error('Failed to fetch student info');
		}
	});

	function handleApproval() {
		stat = 'Approved';
		msg = '';
		handleSubmit();
		// TODO send POST request to api/ipm/claim/[claimid]
	}

	function handleRejection() {
		stat = 'Rejected';
		my_modal_3.showModal();
	}

	async function handleSubmit() {
		const response = await fetch(`${env.GO_API_KEY}/ipm/claims/${claimid}`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${$userSession.token}`
			},
			body: JSON.stringify({
				Status: stat,
				Message: msg
			})
		});

		if (response.ok) {
			console.log('Claim updated');
		} else {
			console.error('Failed to update claim');
			goto('/ipm/failure');
			return;
		}

		goto('/ipm/review/medical');
	}
</script>

{#if rawData}
	<div class="container p-8 m-8">
		<div class="space-y-4 shadow-2xl card-body card-normal bg-base-100 rounded-xl">
			<div class="flex items-center justify-between mb-4">
				<h2 class="text-4xl">Medical Leave #{rawData.StudentId}{rawData.ID}</h2>
				<button class="px-8 text-l btn" on:click={() => goto('/teacher/review/medical')}
					>Back</button
				>
			</div>

			<div class="form-group">
				<label class="text-xl" for="student-info">Student Info</label>

				<p class="text-md" for="register-number">
					Register Number: {rawData.Student.RegisterNumber}
				</p>
				<p class="text-md" for="name">Name: {rawData.Student.Name}</p>
				<p class="text-md" for="class">Class: {rawData.Student.Class}</p>
				<p class="text-md" for="email">Email: {rawData.Student.Email}</p>
			</div>

			<div class="form-group">
				<label class="text-xl" for="reason">Reason:</label>
				<p class="text-md">{rawData.Reason}</p>
			</div>
			<div class="form-group">
				<label class="text-xl" for="description">Description:</label>
				<p class="text-md">{rawData.Description}</p>
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
									Rejected
								{:else}
									Error
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
			<div class="mt-4">
				<button class="btn btn-primary" on:click={handleApproval}>Approve</button>
				<button class="btn btn-primary" on:click={handleRejection}>Reject</button>
				<dialog id="my_modal_3" class="modal">
					<div class="modal-box">
						<form method="dialog">
							<button class="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
						</form>
						<div class="flex flex-col gap-5 p-5">
							<p class="text-md">Message</p>
							<textarea class="textarea textarea-bordered" placeholder="Reason" bind:value={msg}
							></textarea>
							<button class="btn btn-primary" on:click={handleSubmit}>Submit</button>
						</div>
					</div>
				</dialog>
			</div>
		</div>
	</div>
{/if}
