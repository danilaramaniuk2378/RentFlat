/*global console:true*/
import jwtDecode from 'jwt-decode';

export default class AuthService {
    constructor ($http, User, $rootScope, $window, $q) {
        'ngInject';

        this.store = window.localStorage;
        this.key = 'auth-token-rent-app';
        this.$http = $http;
        this.User = User;
        this.$rootScope = $rootScope;
        this.$q = $q;

        // Asynchronously initialize Facebook SDK
        $window.fbAsyncInit = () => {
            window.FB.init({
                appId: '', // Use you own
                responseType: 'token',
                version: 'v2.0'
            });
        };

        // Asynchronously load Facebook SDK
        (function (d, s, id) {
            var js = null;
            var fjs = d.getElementsByTagName(s)[0];

            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = '//connect.facebook.net/en_US/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
        }(window.document, 'script', 'facebook-jssdk'));
    }

    facebookLogin () {
        var deferred = this.$q.defer();

        window.FB.login((response) => {
            window.FB.api('/me?fields=email,name', (profile) => {
                var data = {
                    signedRequest: response.authResponse.signedRequest,
                    profile: profile
                };

                this.$http.post('/auth/facebook', data)
                    .then((nodeServerResponse) => {
                        this.loginUserByToken(nodeServerResponse.data.token);

                        deferred.resolve(response);
                    })
                    .catch((error) => {
                        deferred.reject(error);
                    });
            });
        });

        return deferred.promise;
    }

    setCurrentUserByToken (token) {
        this.$rootScope.currentUser = jwtDecode(token).user;
    }

    createUser (user) {
        return this.User.save(user).$promise
            .then((data) => {
                this.loginUserByToken(data.token);

                return data;
            })
            .catch((error) => {
                console.log(`AuthService createUser error ${error.data}`);
                return error;
            });
    }

    loginUserByToken (token) {
        this.setToken(token);
        this.setCurrentUserByToken(token);
    }

    logout () {
        this.setToken();
        this.$rootScope.currentUser = null;
    }

    login (user) {
        return this.$http.post('/login', user).then((response) => {
            this.loginUserByToken(response.data.token);

            return response;
        }).catch((error) => {
            console.log(`AuthService login error ${error.data}`);
            return error;
        });
    }

    setToken (token) {
        if (token) {
            this.store.setItem(this.key, token);
        }
        else {
            this.store.removeItem(this.key);
        }
    }

    getToken () {
        return this.store.getItem(this.key);
    }

    isAdmin () {
        return this.$rootScope.currentUser && this.$rootScope.currentUser.isAdmin;
    }

    isLogin () {
        return this.$rootScope.currentUser;
    }
}
