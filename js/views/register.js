import { authService } from '../services/auth.js';
import { router } from '../router.js';
import { updateNavigation } from '../main.js';

export function registerView(container) {
    container.innerHTML = `
        <div class="form-container">
            <h2>Register</h2>
            <form id="register-form">
                <div class="form-group">
                    <div>Full Name</label>
                    <input required>
                </div>
                <div class="form-group">
                    <div>Email</label>
                    <input type="email" id="email" required>
                </div>
                <div class="form-group">
                    <div>Password</label>
                    <input type="password" id="password" required minlength="6">
                </div>
                <div id="error-message" class="error-message"></div>
                <button type="submit" class="btn btn-primary">Register</button>
            </form>
        </div>
    `;

    const form = document.getElementById('register-form');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorMessage.textContent = '';

        const userData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };

        try {
            await authService.register(userData);
            updateNavigation();
            router.navigate('/profile');
        } catch (error) {
            errorMessage.textContent = error.message;
        }
    });
}