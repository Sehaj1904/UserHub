import { authService } from '../services/auth.js';
import { updateNavigation } from '../main.js';

export function profileView(container) {
    const user = authService.getCurrentUser();

    container.innerHTML = `
        <div class="form-container">
            <h2>Profile</h2>
            <form id="profile-form">
                <div class="form-group">
                    <div>Full Name</div>
                    <input type="text" id="name" value="${user.name}" required>
                </div>
                <div class="form-group">
                    <div>Bio</div>
                    <input type="text" id="bio" value="${user.bio || ''}" placeholder="Tell us about yourself">
                </div>
                <div class="form-group">
                    <div>Location</div>
                    <input type="text" id="location" value="${user.location || ''}" placeholder="Where are you from?">
                </div>
                <div id="success-message" class="success-message"></div>
                <div id="error-message" class="error-message"></div>
                <button type="submit" class="btn btn-primary">Update Profile</button>
            </form>
        </div>
    `;

    const form = document.getElementById('profile-form');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        successMessage.textContent = '';
        errorMessage.textContent = '';

        const userData = {
            name: document.getElementById('name').value,
            bio: document.getElementById('bio').value,
            location: document.getElementById('location').value
        };

        try {
            authService.updateProfile(userData);
            updateNavigation();
            successMessage.textContent = 'Profile updated successfully!';
        } catch (error) {
            errorMessage.textContent = error.message;
        }
    });
}