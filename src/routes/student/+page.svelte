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

<div class="grid justify-center w-full h-full grid-cols-1 gap-4 p-6 md:grid-cols-2 bg-slate-200">
	<!-- Notifications - shown second on mobile -->
	<div class="order-2 md:order-1">
		<!-- Notifications Title -->
		<div class="flex flex-col h-full p-8 space-y-4 lg:mx-20">
			<div class="p-4 space-y-4 bg-white shadow shadow-2xl rounded-xl">
				<h3 class="text-3xl">Notifications</h3>
			</div>
			<!-- Notifications Cards -->
			<div class="flex flex-col flex-grow space-y-4">
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
