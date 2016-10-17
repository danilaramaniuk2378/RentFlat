export default class AuthInterceptor {
    request (config) {
        const token = window.localStorage.getItem('auth-token-rent-app');

        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    }
}
