<script>
	import '../../app.css';
	import Header from '../../components/Header.svelte';
	import Footer from '../../components/Footer.svelte';

	export let sidebarItems = [
		{ name: 'Home', href: '/student' },
		{
			name: 'Attendance',
			subitems: [
				{ label: 'Attendance', href: '/student/attendance' },
				{ label: 'Absence', href: '/student/absence' },
				{ label: 'Claims', href: '/student/claims' }
			]
		},
		{
			name: 'Downloads',
			subitems: [
				{ label: 'Hall Ticket', href: '/student/hall-ticket' },
				{ label: 'Support', href: '/student/support' },
				{ label: 'Support', href: '/student/support' }
			]
		},
		{
			name: 'Apply Online',
			subitems: [
				{ label: 'Support', href: '/student/support' },
				{ label: 'Support', href: '/student/support' },
				{ label: 'Support', href: '/student/support' }
			]
		},
		{
			name: 'Student Support',
			subitems: [
				{ label: 'Support', href: '/student/support' },
				{ label: 'Support', href: '/student/support' },
				{ label: 'Support', href: '/student/support' }
			]
		}
	];
</script>

<div class="grid grid-rows-[auto,1fr,auto] min-h-screen m-0 p-0">
	<Header full={true} {sidebarItems} />
	<div class="flex justify-center flex-grow p-0 m-0 overflow-auto">
		<slot />
	</div>
	<Footer />
</div>
