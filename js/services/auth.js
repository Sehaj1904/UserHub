const STORAGE_KEY = 'user_auth';
const USERS_KEY = 'users';

export function register(userData) {
    const users = getAllUsers();
    
    if (users.find(user => user.email === userData.email)) {
        throw new Error('Email already exists');
    }

    const newUser = {
        id: crypto.randomUUID(),
        ...userData,
        password: hashPassword(userData.password)
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    const { password, ...userWithoutPassword } = newUser;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userWithoutPassword));
    
    return userWithoutPassword;
}

export function login(email, password) {
    const users = getAllUsers();
    const user = users.find(u => u.email === email);

    if (!user || user.password !== hashPassword(password)) {
        throw new Error('Invalid email or password');
    }

    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userWithoutPassword));
    
    return userWithoutPassword;
}

export function logout() {
    localStorage.removeItem(STORAGE_KEY);
}

export function getCurrentUser() {
    const userData = localStorage.getItem(STORAGE_KEY);
    return userData ? JSON.parse(userData) : null;
}

export function isAuthenticated() {
    return !!getCurrentUser();
}

export function updateProfile(userData) {
    const currentUser = getCurrentUser();
    const users = getAllUsers();
    
    const updatedUsers = users.map(user => {
        if (user.id === currentUser.id) {
            return { ...user, ...userData };
        }
        return user;
    });

    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...currentUser, ...userData }));
}

export function getAllUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
}

function hashPassword(password) {
    // In a real app, use proper password hashing
    return btoa(password);
}