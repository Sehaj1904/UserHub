import { router } from './router.js';
import { authService } from './services/auth.js';

// Initialize the application
function initApp() {
    updateNavigation();
    router.navigate(window.location.pathname);

    // Handle navigation
    window.addEventListener('popstate', () => {
        router.navigate(window.location.pathname);
    });
}

// Update navigation based on auth status
export function updateNavigation() {
    const navLinks = document.getElementById('nav-links');
    const isAuthenticated = authService.isAuthenticated();

    navLinks.innerHTML = isAuthenticated
        ? `
            <a href="/profile" class="nav-link">Profile</a>
            <a href="/discover" class="nav-link">Discover</a>
            <a href="#" class="nav-link" id="logout">Logout</a>
        `
        : `
            <a href="/login" class="nav-link">Login</a>
            <a href="/register" class="nav-link">Register</a>
        `;

    if (isAuthenticated) {
        document.getElementById('logout').addEventListener('click', (e) => {
            e.preventDefault();
            authService.logout();
            router.navigate('/login');
        });
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', initApp);