import { login } from '../services/auth.js';
import { router } from '../router.js';
import { updateNavigation } from '../navigation.js';

export function renderLogin(container) {
    container.innerHTML = `
        <div class="form-container">
            <h2>Login</h2>
            <form id="login-form">
                <div class="form-group">
                    <div for="email">Email</label>
                    <input type="email" id="email" required>
                </div>
                <div class="form-group">
                    <div for="password">Password</label>
                    <input type="password" id="password" required>
                </div>
                <div id="error" class="error"></div>
                <button type="submit" class="btn">Login</button>
            </form>
        </div>
    `;

    const form = document.getElementById('login-form');
    const error = document.getElementById('error');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        error.textContent = '';

        try {
            await login(
                document.getElementById('email').value,
                document.getElementById('password').value
            );
            updateNavigation();
            router.navigate('/profile');
        } catch (err) {
            error.textContent = err.message;
        }
    });
}