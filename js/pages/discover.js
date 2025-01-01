import { getAllUsers, getCurrentUser } from '../services/auth.js';

export function renderDiscover(container) {
    const currentUser = getCurrentUser();
    const users = getAllUsers()
        .filter(user => user.id !== currentUser.id);

    container.innerHTML = `
        <div class="discover-container">
            <h2>Discover Users</h2>
            <div class="filters">
                <select id="role-filter">
                    <option value="">All Roles</option>
                    <option value="mentor">Mentors</option>
                    <option value="mentee">Mentees</option>
                </select>
                <input type="text" id="skills-filter" placeholder="Filter by skills...">
            </div>
            <div id="users-list" class="users-list">
                ${renderUsers(users)}
            </div>
        </div>
    `;

    const roleFilter = document.getElementById('role-filter');
    const skillsFilter = document.getElementById('skills-filter');
    const usersList = document.getElementById('users-list');

    function filterUsers() {
        const roleValue = roleFilter.value;
        const skillsValue = skillsFilter.value.toLowerCase();
        
        const filteredUsers = users.filter(user => {
            const roleMatch = !roleValue || user.role === roleValue;
            const skillsMatch = !skillsValue || 
                (user.skills && user.skills.toLowerCase().includes(skillsValue));
            return roleMatch && skillsMatch;
        });

        usersList.innerHTML = renderUsers(filteredUsers);
    }

    roleFilter.addEventListener('change', filterUsers);
    skillsFilter.addEventListener('input', filterUsers);
}

function renderUsers(users) {
    if (users.length === 0) {
        return '<p>No users found</p>';
    }

    return users.map(user => `
        <div class="user-card">
            <div class="user-info">
                <h3>${user.name}</h3>
                <p class="role">${user.role}</p>
                ${user.skills ? `<p class="skills">Skills: ${user.skills}</p>` : ''}
                ${user.bio ? `<p class="bio">${user.bio}</p>` : ''}
            </div>
        </div>
    `).join('');
}