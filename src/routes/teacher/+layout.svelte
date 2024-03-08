<script>
	import '../../app.css';
	import Header from '../../components/Header.svelte';
	import Footer from '../../components/Footer.svelte';

	export let sidebarItems = [
		{ name: 'Home', href: '/teacher' },
		{ name: 'Attendance', href: '/teacher/attendance' },
		{ name: 'Downloads', href: '/teacher/downloads' },
		{ name: 'Apply Online', href: '/teacher/apply-online' },
		{ name: 'teacher Support', href: '/teacher/support' }
	];
</script>

<div class="grid grid-rows-[auto,1fr,auto] min-h-screen m-0 p-0">
	<Header full={true} {sidebarItems} />
	<div class="flex justify-center flex-grow p-0 m-0 overflow-auto">
		<slot />
	</div>
	<Footer />
</div>
