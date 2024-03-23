<script>
	import '../../app.css';
	import Header from '../../components/Header.svelte';
	import Footer from '../../components/Footer.svelte';

	export let sidebarItems = [
		{ name: 'Home', href: '/teacher' },
		{
			name: 'Review Claims',
			subitems: [{ label: 'Medical', href: '/teacher/review/medical' }]
		},
		{
			name: 'Leave Application',
			subitems: [
				{ label: 'My Time Table', href: '/teacher/timetable' },
				{ label: 'Apply for Leave', href: '/teacher/leave-apply' },
				{ label: 'Leave Tracker', href: '/teacher/leave-tracker' }
			]
		},
		{
			name: 'Upload',
			subitems: [
				{ label: 'Mid Semester Marks', href: '/teacher/midsem-marks-upload' },
				{ label: 'CIA 1 Marks', href: '/teacher/CIA1-upload' },
				{ label: 'CIA 3 Marks', href: '/teacher/CIA3-upload' }
			]
		},
		{
			name: 'Apply Online',
			subitems: [
				{ label: 'Certificate Request', href: '/teacher/cert-request' },
				{ label: 'Certificate Status', href: '/teacher/cert-status' },
				{ label: 'Car Pass 20xx - 20xx', href: '/teacher/car-pass' }
			]
		},
		{
			name: 'Teacher Support',
			subitems: [
				{ label: 'Support Request', href: '/teacher/support-request' },
				{ label: 'Classroom Location', href: '/teacher/class-location' }
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
