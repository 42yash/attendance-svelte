<script>
	import '../../app.css';
	import Header from '../../components/Header.svelte';
	import Footer from '../../components/Footer.svelte';

	export let sidebarItems = [
		{ name: 'Home', href: '/student' },
		{
			name: 'Attendance',
			subitems: [
				{ label: 'Attendance Dashboard', href: '/student/attendance' },
				{ label: 'Absence Details', href: '/student/absence' },
				{ label: 'Leave Applications', href: '/student/claims' },
				{ label: 'My Time Table', href: '/student/timetable' },
				{ label: 'Previous Class Attendance', href: '/student/previous-attendance' },
				{ label: 'Open Elective Attendance', href: '/student/elective-attendance' },
				{ label: 'Library Attendance', href: '/student/lib-attendance' }
			]
		},
		{
			name: 'Downloads',
			subitems: [
				{ label: 'Hall Ticket', href: '/student/hall-ticket' },
				{ label: 'Mid Semester Results', href: '/student/mid-sem-results' },
				{ label: 'End Semester Results', href: '/student/end-sem-results' },
				{ label: 'My Marks Card', href: '/student/marks-card' },
				{ label: 'Value Added Course Certificates', href: '/student/added-course-cert' },
				{ label: 'Fee Payment Details', href: '/student/fee-details' },
				{ label: 'Open Elective Status', href: '/student/elective-status' },
				{ label: 'Course Pack', href: '/student/course-pack' },
				{ label: 'Document Submission Status', href: '/student/document-status' }
			]
		},
		{
			name: 'Apply Online',
			subitems: [
				{ label: 'Certificate Request', href: '/student/cert-request' },
				{ label: 'Certificate Status', href: '/student/cert-status' },
				{ label: 'Car Pass 20xx - 20xx', href: '/student/car-pass' },
				{ label: 'Marks Card Attestation', href: '/student/marks-card-attestation' },
				{ label: 'Original Transcript Request', href: '/student/og-transcript-req' }
			]
		},
		{
			name: 'Student Support',
			subitems: [
				{ label: 'Support Request', href: '/student/support-req' },
				{ label: 'Faculty Location', href: '/student/faculty-location' },
				{ label: 'Data Bank', href: '/student/data-bank' },
				{ label: 'My Course', href: '/student/my-course' }
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
