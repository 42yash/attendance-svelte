<script>
	import DrawerAccordian from './DrawerAccordian.svelte';
	export let items;
</script>

<div class="z-[2] drawer">
	<input id="my-drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<label for="my-drawer" class="btn btn-square btn-ghost">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="inline-block stroke-current w-7 h-7"
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
		<ul class="min-h-full p-4 menu w-80 bg-base-200 text-base-content">
			<label for="my-drawer" class="btn btn-square btn-ghost drawer overlay">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="inline-block stroke-current w-7 h-7"
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
				{#if item.name === 'Home'}
					<div class="text-xl font-medium collapse-title"><a href={item.href}>{item.name}</a></div>
				{:else}
					<DrawerAccordian title={item.name} items={item.subitems} />
				{/if}
			{/each}
			<div class="hidden">
				<DrawerAccordian title="" items={[]} />
			</div>
		</ul>
	</div>
</div>
