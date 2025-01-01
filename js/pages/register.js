import { register } from '../services/auth.js';
import { router } from '../router.js';
import { updateNavigation } from '../navigation.js';

export function renderRegister(container) {
    container.innerHTML = `
        <div class="form-container">
            <h2>Register</h2>
            <form id="register-form">
                <div class="form-group">
                    <div>Full Name</div>
                    <input type="text" id="name" required>
                </div>
                <div class="form-group">
                    <div>Email</div>
                    <input type="email" id="email" required>
                </div>
                <div class="form-group">
                    <div>Password</div>
                    <input type="password" id="password" required minlength="6">
                </div>
                <div class="form-group">
                    <div>Role</div>
                    <select id="role" required>
                        <option value="mentee">Mentee</option>
                        <option value="mentor">Mentor</option>
                    </select>
                </div>
                <div id="error" class="error"></div>
                <button type="submit" class="btn">Register</button>
            </form>
        </div>
    `;

    const form = document.getElementById('register-form');
    const error = document.getElementById('error');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        error.textContent = '';

        try {
            await register({
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                role: document.getElementById('role').value
            });
            updateNavigation();
            router.navigate('/profile');
        } catch (err) {
            error.textContent = err.message;
        }
    });
}