<script>
	import { onMount } from 'svelte';
	import { env } from '$lib/env';
	import { userSession } from '../../server.js';

	let student;

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
		} else {
			console.error('Failed to fetch student info');
		}
	});
</script>

{#if student}
	<div class="p-8 h-full lg:mx-20">
		<div
			class="bg-white h-full p-8 rounded-3xl grid grid-cols-2 grid-rows-2 mx-auto shadow-2xl w-full"
		>
			<div class="col-span-1 row-span-1 w-70 h-90 p-6 py-10">
				<img src="https://via.placeholder.com/150" alt="Profile" class="mx-auto w-full h-full" />
			</div>
			<div class="col-span-1 row-span-1 self-center h-full py-10 space-y-4">
				<h2 class="text-3xl">{student.Name}</h2>
				<p class="text-gray-500 text-xl">{student.Class}</p>
				<p class="text-gray-500 text-xl">{student.RegisterNumber}</p>
			</div>
			<div class="grid col-span-2 grid-col-2 grid-row-2">
				<div class="col-span-2 row-span-2 p-6">
					<p class="text-gray-500">Phone: {student.Phone}</p>
					<p class="text-gray-500">Email: {student.Email}</p>
					<p class="text-gray-500">Attendance: {student.AttendancePercentage}%</p>
				</div>
			</div>
		</div>
	</div>
{:else}
	<p>Loading...</p>
{/if}
