import { updateProfile, getCurrentUser } from '../services/auth.js';
import { updateNavigation } from '../navigation.js';

export function renderProfile(container) {
    const user = getCurrentUser();

    container.innerHTML = `
        <div class="form-container">
            <h2>Profile</h2>
            <form id="profile-form">
                <div class="form-group">
                    <div>Full Name</div>
            <input type="text" id="name" value="${user.name}" required>
                </div>
                <div class="form-group">
            <div>Role</div>
            <select id="role" required>
            <option value="mentee" ${user.role === 'mentee' ? 'selected' : ''}>Mentee</option>
            <option value="mentor" ${user.role === 'mentor' ? 'selected' : ''}>Mentor</option>
            </select>
                </div>
                <div class="form-group">
            <div>Skills (comma-separated)</div>
                    <input type="text" id="skills" value="${user.skills || ''}" placeholder="e.g., JavaScript, Python, React">
                </div>
                <div class="form-group">
                    <div>Bio</div>
                    <textarea id="bio" rows="4">${user.bio || ''}</textarea>
                </div>
                <div id="success" class="success"></div>
                <div id="error" class="error"></div>
                <button type="submit" class="btn">Update Profile</button>
            </form>
        </div>
    `;

    const form = document.getElementById('profile-form');
    const success = document.getElementById('success');
    const error = document.getElementById('error');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        success.textContent = '';
        error.textContent = '';

        try {
            updateProfile({
                name: document.getElementById('name').value,
                role: document.getElementById('role').value,
                skills: document.getElementById('skills').value,
                bio: document.getElementById('bio').value
            });
            updateNavigation();
            success.textContent = 'Profile updated successfully!';
        } catch (err) {
            error.textContent = err.message;
        }
    });
}