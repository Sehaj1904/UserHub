import { renderLogin } from './pages/login.js';
import { renderRegister } from './pages/register.js';
import { renderProfile } from './pages/profile.js';
import { renderDiscover } from './pages/discover.js';
import { isAuthenticated } from './services/auth.js';

const routes = {
    '/': { render: renderLogin, auth: false },
    '/login': { render: renderLogin, auth: false },
    '/register': { render: renderRegister, auth: false },
    '/profile': { render: renderProfile, auth: true },
    '/discover': { render: renderDiscover, auth: true }
};

export const router = {
    navigate(path) {
        const route = routes[path] || routes['/'];
        
        if (route.auth && !isAuthenticated()) {
            window.history.pushState({}, '', '/login');
            this.loadPage(renderLogin);
            return;
        }

        window.history.pushState({}, '', path);
        this.loadPage(route.render);
    },

    loadPage(renderFn) {
        const appContainer = document.getElementById('app');
        appContainer.innerHTML = '';
        renderFn(appContainer);
    }
};