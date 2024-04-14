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
	let teacherData;
	let newData;
	let reason;
	let formattedStartDate;
	let formattedEndDate;

	// onMount send request to api/claims/[claimid]
	onMount(async () => {
		const token = localStorage.getItem('token');
		if (token) {
			userSession.set({ isAuthenticated: true, role: null, token });
		}

		const teacherSelf = await fetch(`${env.GO_API_KEY}/teacher/self`, {
			headers: {
				Authorization: `Bearer ${$userSession.token}`
			}
		});

		if (teacherSelf.ok) {
			teacherData = await teacherSelf.json();
		} else {
			console.error('Failed to fetch teacher info');
		}

		const response = await fetch(`${env.GO_API_KEY}/claims/${claimid}`, {
			headers: {
				Authorization: `Bearer ${$userSession.token}`
			}
		});

		if (response.ok) {
			rawData = await response.json();
			newData = JSON.parse(JSON.stringify(rawData));
			console.log(newData);
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

	function handleSubmit() {
		function compareData(newData, rawData) {
			if (newData.ClaimReviews.length !== rawData.ClaimReviews.length) {
				return false;
			}

			for (let i = 0; i < newData.ClaimReviews.length; i++) {
				if (newData.ClaimReviews[i].Status !== rawData.ClaimReviews[i].Status) {
					return false;
				}
			}
			return true;
		}

		if (compareData(newData, rawData)) {
			goto('/teacher/review/medical');
		} else {
			my_modal_3.showModal();
		}
	}

	function handleSubmitMessage() {
		newData.ClaimReviews.forEach(async (claim) => {
			if (claim.Teacher.ID === teacherData.ID) {
				claim.Message = reason;
				const response = await fetch(`${env.GO_API_KEY}/teacher/claims/${claim.ID}`, {
					method: 'PUT',
					headers: {
						Authorization: `Bearer ${$userSession.token}`
					},
					body: JSON.stringify(claim)
				});

				if (response.ok) {
					console.log('Claim updated');
				} else {
					console.error('Failed to update claim');
					goto('/teacher/failure');
					return;
				}
			}
		});

		goto('/teacher/review/medical');
	}
</script>

{#if newData}
	<div class="container p-8 m-8">
		<div class="space-y-4 shadow-2xl card-body card-normal bg-base-100 rounded-xl">
			<div class="flex items-center justify-between mb-4">
				<h2 class="text-4xl">Medical Leave #{rawData.StudentId}{rawData.ID}</h2>
				<div class="flex items-center justify-center gap-4">
					<p class="text-md">{rawData.Status}</p>
					<button class="px-8 text-l btn" on:click={() => goto('/teacher/review/medical')}
						>Back</button
					>
				</div>
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
					{#each newData.ClaimReviews as claim, index (index)}
						<tr>
							<td class="border">{claim.Attendance.Course}</td>
							<td class="border">{claim.Teacher.Name}</td>
							<td class="border">
								{#if rawData.ClaimReviews[index].Status === 'approved'}
									Approved
								{:else if (teacherData.ID === claim.Teacher.ID) & (rawData.Status === 'Pending')}
									<select bind:value={claim.Status} class="w-full max-w-xs select select-bordered">
										<option value="pending" selected={claim.Status === 'pending'}>Pending</option>
										<option value="approved" selected={claim.Status === 'approved'}>Approve</option>
										<option value="rejected" selected={claim.Status === 'rejected'}>Reject</option>
									</select>
								{:else if claim.Status === 'pending'}
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
				{#if rawData.Status === 'Pending'}
					<button class="btn btn-primary" on:click={handleSubmit}>Submit</button>
				{/if}
				<dialog id="my_modal_3" class="modal">
					<div class="modal-box">
						<form method="dialog">
							<button class="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
						</form>
						<div class="flex flex-col gap-5 p-5">
							<p class="text-md">Message</p>
							<textarea
								class="textarea textarea-bordered"
								placeholder="Reason"
								bind:value={reason}
								required
							></textarea>
							<button class="btn btn-primary" on:click={handleSubmitMessage}>Submit</button>
						</div>
					</div>
				</dialog>
			</div>
		</div>
	</div>
{/if}
