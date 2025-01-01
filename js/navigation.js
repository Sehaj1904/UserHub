import { isAuthenticated, logout } from './services/auth.js';
import { router } from './router.js';

export function updateNavigation() {
    const navLinks = document.getElementById('nav-links');
    
    if (isAuthenticated()) {
        navLinks.innerHTML = `
            <a href="/profile" class="nav-link">Profile</a>
            <a href="/discover" class="nav-link">Discover</a>
            <a href="#" class="nav-link" id="logout">Logout</a>
        `;
        
        const logoutButton = document.getElementById('logout');
        if (logoutButton) {
            logoutButton.addEventListener('click', (e) => {
                e.preventDefault();
                logout();
                updateNavigation(); // Update navigation after logout
                router.navigate('/login');
            });
        }
    } else {
        navLinks.innerHTML = `
            <a href="/login" class="nav-link">Login</a>
            <a href="/register" class="nav-link">Register</a>
        `;
    }
}