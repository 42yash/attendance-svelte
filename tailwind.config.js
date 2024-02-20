/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	daisyui: {
		themes: [
			'light',
			{
				mytheme: {
					primary: '#061a38',
					secondary: '#e0f2fe',
					accent: '#ddca99',
					neutral: '#f3f4f6',
					'base-100': '#ffffff',
					info: '#38bdf8',
					success: '#34d399',
					warning: '#f59e0b',
					error: '#CB5050'
				}
			}
		]
	}
};
