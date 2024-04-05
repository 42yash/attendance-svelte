<script>
	import '../../app.css';
	import Header from '../../components/Header.svelte';
	import Footer from '../../components/Footer.svelte';

	export let sidebarItems = [
		{ name: 'Home', href: '/ipm' },
		{
			name: 'Review Claims',
			subitems: [{ label: 'Medical', href: '/ipm/review/medical' }]
		},
		{
			name: 'Leave Application',
			subitems: [
				{ label: 'My Time Table', href: '/ipm/timetable' },
				{ label: 'Apply for Leave', href: '/ipm/leave-apply' },
				{ label: 'Leave Tracker', href: '/ipm/leave-tracker' }
			]
		},
		{
			name: 'Upload',
			subitems: [
				{ label: 'Mid Semester Marks', href: '/ipm/midsem-marks-upload' },
				{ label: 'CIA 1 Marks', href: '/ipm/CIA1-upload' },
				{ label: 'CIA 3 Marks', href: '/ipm/CIA3-upload' }
			]
		},
		{
			name: 'Apply Online',
			subitems: [
				{ label: 'Certificate Request', href: '/ipm/cert-request' },
				{ label: 'Certificate Status', href: '/ipm/cert-status' },
				{ label: 'Car Pass 20xx - 20xx', href: '/ipm/car-pass' }
			]
		},
		{
			name: 'ipm Support',
			subitems: [
				{ label: 'Support Request', href: '/ipm/support-request' },
				{ label: 'Classroom Location', href: '/ipm/class-location' }
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
