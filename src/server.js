import { writable } from 'svelte/store';
import { goto } from '$app/navigation';
import { env } from '$lib/env';

export let errormessage = '';

// Store for user session
export const userSession = writable({ isAuthenticated: false, token: null });

export async function handleLogin(username, password) {
	const response = await fetch(`${env.GO_API_KEY}/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ username, password })
	});

	if (response.ok) {
		const { token } = await response.json();
		localStorage.setItem('token', token); // Save token to localStorage
		const payload = JSON.parse(atob(token.split('.')[1]));
		userSession.set({ isAuthenticated: true, role: payload.role, token });
		console.log('User logged in');

		// Redirect to the appropriate dashboard based on the user role
		if (payload.usertype === 'student') {
			// Navigate to the student dashboard
			goto('/student');
		} else if (payload.usertype === 'teacher') {
			// Navigate to the teacher dashboard
			// $navigate('/teacher');
		} else if (payload.usertype === 'admin') {
			// Navigate to the admin dashboard
			// $navigate('/admin');
		} else if (payload.usertype === 'ipm') {
			// Navigate to the ipm dashboard
			// $navigate('/ipm');
		} else {
			// Handle unknown role
			console.error('Unknown role');
		}
	} else {
		// Handle login error
		console.error('Login failed');

		// Update error message
		errormessage = 'Invalid username or password';
	}
}

export function handleLogout() {
	localStorage.removeItem('token'); // Remove token from localStorage
	userSession.set({ isAuthenticated: false, role: null, token: null });
}
