import { createRoot } from 'react-dom/client';

import App from './App';

import './index.css';

type AnalyticsWindow = Window & {
	dataLayer?: unknown[];
	gtag?: (...args: unknown[]) => void;
};

function loadAnalytics() {
	const analyticsWindow = window as AnalyticsWindow;
	if (analyticsWindow.gtag) return;

	analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
	analyticsWindow.gtag = (...args) => analyticsWindow.dataLayer!.push(args);
	analyticsWindow.gtag('js', new Date());
	analyticsWindow.gtag('config', 'G-ME4EFN2TX3', { send_page_view: false });

	const script = document.createElement('script');
	script.async = true;
	script.src = 'https://www.googletagmanager.com/gtag/js?id=G-ME4EFN2TX3';
	script.dataset.googleAnalytics = 'true';
	document.head.appendChild(script);
}
loadAnalytics();

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js').catch((error) => {
		console.error('Service worker registration failed', error);
	});
}

createRoot(document.getElementById('root')!).render(<App />);
