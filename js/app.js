import { router } from './router.js';
import { updateNavigation } from './navigation.js';

// Initialize the application
function initApp() {
    updateNavigation();
    
    // Handle navigation link clicks
    document.addEventListener('click', (e) => {
        if (e.target.matches('.nav-link')) {
            e.preventDefault();
            const path = e.target.getAttribute('href');
            router.navigate(path);
        }
    });

    // Handle initial route
    router.navigate(window.location.pathname);

    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        router.navigate(window.location.pathname);
    });
}

document.addEventListener('DOMContentLoaded', initApp);