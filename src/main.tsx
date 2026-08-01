import { createRoot } from 'react-dom/client';

import App from './App';

import './index.css';

type AnalyticsWindow = Window & {
	dataLayer?: unknown[];
	gtag?: (...args: unknown[]) => void;
	requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
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
	const analyticsWindow = window as AnalyticsWindow;
	if (analyticsWindow.requestIdleCallback) {
		analyticsWindow.requestIdleCallback(loadAnalytics, { timeout: 5000 });
	} else {
		window.setTimeout(loadAnalytics, 4000);
	}
}

if (document.readyState === 'complete') {
	scheduleAnalytics();
} else {
	window.addEventListener('load', scheduleAnalytics, { once: true });
}

createRoot(document.getElementById('root')!).render(<App />);
