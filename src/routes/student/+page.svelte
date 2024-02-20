<script>
	import Notifications from './NotificationCard.svelte';
	import ProfileCard from './ProfileCard.svelte';
	import NotificationCard from './NotificationCard.svelte';

	const alerts = {
		title: 'Action Needed',
		notifications: ['Alert 1', 'Alert 2', 'Alert 3', 'Alert 4']
	};

	const notifications = {
		title: 'Notices',
		notifications: ['Notification 1', 'Notification 2', 'Notification 3', 'Notification 4']
	};
</script>

<div class="grid grid-cols-1 md:grid-cols-2 p-6 bg-slate-200 h-full justify-center gap-4 w-full">
	<!-- Notifications - shown second on mobile -->
	<div class="order-2 md:order-1">
		<!-- Notifications Title -->
		<div class="lg:mx-20 p-8 space-y-4 h-full flex flex-col">
			<div class="bg-white rounded-xl shadow p-4 space-y-4 shadow-2xl">
				<h3 class="text-3xl">Notifications</h3>
			</div>
			<!-- Notifications Cards -->
			<div class="space-y-4 flex-grow flex flex-col">
				<NotificationCard data={alerts} />
				<NotificationCard data={notifications} />
			</div>
		</div>
	</div>

	<!-- Profile Card - shown first on mobile -->
	<div class="order-1 md:order-2">
		<ProfileCard />
	</div>
</div>
