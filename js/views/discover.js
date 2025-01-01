import { authService } from '../services/auth.js';

export function discoverView(container) {
    const currentUser = authService.getCurrentUser();
    const users = authService.getAllUsers()
        .filter(user => user.id !== currentUser.id);

    container.innerHTML = `
        <h2>Discover Users</h2>
        <div class="users-container">
            ${users.map(user => `
                <div class="user-card">
                    <div class="user-avatar">${user.name.charAt(0)}</div>
                    <div class="user-info">
                        <h3>${user.name}</h3>
                        ${user.bio ? `<p>${user.bio}</p>` : ''}
                        ${user.location ? `<p>📍 ${user.location}</p>` : ''}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}