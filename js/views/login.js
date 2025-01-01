import { authService } from '../services/auth.js';
import { router } from '../router.js';
import { updateNavigation } from '../main.js';

export function loginView(container) {
    container.innerHTML = `
        <div class="form-container">
            <h2>Login</h2>
            <form id="login-form">
                <div class="form-group">
                    <div>Email</div>
                    <input type="email" id="email" required>
                </div>
                <div class="form-group">
                    <div>Password</div>
                    <input type="password" id="password" required>
                </div>
                <div id="error-message" class="error-message"></div>
                <button type="submit" class="btn btn-primary">Login</button>
            </form>
        </div>
    `;

    const form = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorMessage.textContent = '';

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            await authService.login(email, password);
            updateNavigation();
            router.navigate('/profile');
        } catch (error) {
            errorMessage.textContent = error.message;
        }
    });
}