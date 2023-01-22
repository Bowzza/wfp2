import { userService } from '../services/user.service';



export const fetchWrapper = {
    get,
    post,
    put,
    delete: _delete
};

function get(url, token) {
    let requestOptions;
    if(token != null && checkIfSendingJWT()) {
        requestOptions = {
            method: 'GET',
            headers: { 'auth-token': token }
        };
    } else {
        requestOptions = {
            method: 'GET',
            headers: authHeader(url)
        };
    }
    return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body, token) {
    let requestOptions;
    if(token != null && checkIfSendingJWT()) {
        requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'auth-token': token },
            body: JSON.stringify(body)
        }; 
    } else {
        requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };
    }

    return fetch(url, requestOptions).then(handleResponse);
}

function put(url, body) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);    
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url, token) {
    let requestOptions;
    if(token != null && checkIfSendingJWT()) {
        requestOptions = {
            method: 'DELETE',
            headers: { 'auth-token' : token}
        };
    } else {
        requestOptions = {
            method: 'DELETE',
            headers: authHeader(url)
        };
    }
    return fetch(url, requestOptions).then(handleResponse);
}

// helper functions

function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    // const user = userService.userValue;
    // const isLoggedIn = user && user.token;
    // const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
    // if (isLoggedIn && isApiUrl) {
    //     return { Authorization: `Bearer ${user.token}` };
    // } else {
    //     return {};
    // }
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        
        if (!response.ok) {
            if ([401, 403].includes(response.status) && userService.userValue) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                userService.logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function checkIfSendingJWT() {
    const authInfo = userService.getAuthData();
    const now = new Date();
    if(!authInfo?.expirationDate) return;
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    if(expiresIn > 0) {
      return true;
    }
    return false;
}