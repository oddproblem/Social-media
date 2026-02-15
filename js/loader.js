document.addEventListener('DOMContentLoaded', () => {
    // Intercept all link clicks
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.href && !link.target && !link.hasAttribute('download') && !link.getAttribute('href').startsWith('#') && !link.getAttribute('href').startsWith('javascript:')) {
            // Check if it's an internal link
            const url = new URL(link.href, window.location.origin);
            if (url.origin === window.location.origin) {
                e.preventDefault();
                window.location.href = `buffer.html?dest=${encodeURIComponent(url.pathname + url.search + url.hash)}`;
            }
        }
    });

    // Intercept form submissions
    document.addEventListener('submit', (e) => {
        const form = e.target;
        if (form.action && form.method.toLowerCase() === 'get' && !form.target) {
            // For GET forms, we can maintain query params easily
            // For POST/others, it's more complex, but this simple app likely uses GET or JS-handled submissions.
            // However, the login form uses an action to index.html which implies a GET or just navigation.
            // Let's assume standard navigation for simplicity as per requirements.
            
            // If the form has a specific action that is a page
            const url = new URL(form.action, window.location.origin);
            if (url.origin === window.location.origin) {
                e.preventDefault();
                // We'll just redirect to the action URL for now, ignoring form data for this visual prototype
                // unless it's critical. The login page just goes to index.html.
                 window.location.href = `buffer.html?dest=${encodeURIComponent(url.pathname + url.search + url.hash)}`;
            }
        }
    });
});
