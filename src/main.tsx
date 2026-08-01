import { createRoot } from 'react-dom/client';

import App from './App';

import './index.css';

type AnalyticsWindow = Window & {
	dataLayer?: unknown[];
	gtag?: (...args: unknown[]) => void;
};

function loadAnalytics() {
	const analyticsWindow = window as AnalyticsWindow;
	if (document.querySelector('script[data-google-analytics]')) return;

	analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
	analyticsWindow.gtag = (...args) => analyticsWindow.dataLayer!.push(args);
	analyticsWindow.gtag('js', new Date());
	analyticsWindow.gtag('config', 'G-ME4EFN2TX3');

	const script = document.createElement('script');
	script.async = true;
	script.src = 'https://www.googletagmanager.com/gtag/js?id=G-ME4EFN2TX3';
	script.dataset.googleAnalytics = 'true';
	document.head.appendChild(script);
}

function scheduleAnalytics() {
	const interactionEvents = ['pointerdown', 'keydown', 'touchstart'];
	const handleInteraction = () => {
		loadAnalytics();
		interactionEvents.forEach((eventName) => window.removeEventListener(eventName, handleInteraction));
	};

	interactionEvents.forEach((eventName) => window.addEventListener(eventName, handleInteraction, { once: true, passive: true }));
	window.setTimeout(loadAnalytics, 15000);
}

if (document.readyState === 'complete') {
	scheduleAnalytics();
} else {
	window.addEventListener('load', scheduleAnalytics, { once: true });
}

createRoot(document.getElementById('root')!).render(<App />);
