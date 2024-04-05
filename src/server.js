import { writable } from 'svelte/store';
import { goto } from '$app/navigation';
import { env } from '$lib/env';

export let errormessage = '';

// Store for user session
export const userSession = writable({ isAuthenticated: false, token: null });

export async function handleLogin(username, password) {
	// Reset Session
	userSession.set({ isAuthenticated: false, token: null });
	localStorage.removeItem('token'); // Remove token from localStorage

	// Login
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

		// Redirect to the appropriate dashboard based on the user role
		if (payload.usertype === 'student') {
			goto('/student');
		} else if (payload.usertype === 'teacher') {
			goto('/teacher');
		} else if (payload.usertype === 'admin') {
			// $navigate('/admin');
		} else if (payload.usertype === 'ipm') {
			goto('/ipm');
		} else {
			// Handle unknown role
			console.error('Unknown role');
		}
	} else {
		// Handle login error
		console.error('Login failed');
		console.error(response);

		// Update error message
		errormessage = 'Invalid username or password';
	}
	return errormessage;
}

export function handleLogout() {
	localStorage.removeItem('token'); // Remove token from localStorage
	userSession.set({ isAuthenticated: false, role: null, token: null });
}
