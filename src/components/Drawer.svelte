<script>
	export let items = [
		{ name: 'Attendance', href: '/student/attendance' },
		{ name: 'Claims', href: '/student/claims' },
		{ name: 'New Claim', href: '/student/claims/new' }
	];
</script>

<div class="drawer">
	<input id="my-drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<label for="my-drawer" class="btn btn-square btn-ghost">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="inline-block w-7 h-7 stroke-current"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				/>
			</svg>
		</label>
	</div>
	<div class="drawer-side">
		<ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
			<label for="my-drawer" class="btn btn-square btn-ghost drawer overlay">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="inline-block w-7 h-7 stroke-current"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</label>
			<!-- Sidebar content here -->
			{#each items as item (item.name)}
				<li><a href={item.href}>{item.name}</a></li>
			{/each}
		</ul>
	</div>
</div>
