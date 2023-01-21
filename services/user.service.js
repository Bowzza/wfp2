import { Subject } from 'rxjs';
import { useRouter } from 'next/router'
import { fetchWrapper } from '../helpers/fetch-wrapper';

let tokenTimer;
let authStatusListener = new Subject();
let errorMessageListener = new Subject();
let loadingListener = new Subject();
let isAuthenticated;
let errorMessage;
let token;




function login(email, password) {
    return fetchWrapper.post('http://localhost:3001/api/users/login', { email, password })
        .then(res => {
            console.log(res);
            const token = res.token;
            this.token = token;
            if(token) {
              const expiresInDuration = res.expiresIn;
              const userId = res.userId;
              const name = res.email;
              setAuthTimer(expiresInDuration);
              authStatusListener.next(true);
              const now = new Date();
              const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
              saveAuthData(token, expirationDate, userId, name);
              isAuthenticated = true;
              loadingListener.next(false);
              // this.router.navigate(['/']);
            }
        })
}

function registration(email, password) {
  return fetchWrapper.post('http://localhost:3001/api/users/register', { email, password })
    .then(res => {
      console.log(res);
    })
}

function changePassword(password) {
  return fetchWrapper.post('http://localhost:3001/api/users/changePassword', {password}, localStorage.getItem('token'))
    .then(res => {
      console.log(res);
    })
}

function register(user) {
    return fetchWrapper.post(`${baseUrl}/register`, user);
}

function getIsAuth() {
    return isAuthenticated;
}

function returnAuthListener() {
  return authStatusListener.asObservable();
}

function autoAuthUser() {
    const authInfo = getAuthData();
    const now = new Date();
    if(!authInfo?.expirationDate) return;
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    if(expiresIn > 0) {
      token = authInfo?.token;
      isAuthenticated = true;
      setAuthTimer(expiresIn / 1000);
      authStatusListener.next(true);
    }
  }

  function protectRoute() {
    const authInfo = getAuthData();
    const now = new Date();
    if(!authInfo?.expirationDate) return;
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    if(expiresIn > 0) {
      return true;
    }
    return false;
  }

  function logout() {
    token = '';
    isAuthenticated = false;
    authStatusListener.next(false);
    clearTimeout(tokenTimer);
    clearAuthData();
    location.url = 'http://localhost:3000/home';
  }

  function setAuthTimer(duration) {
    tokenTimer = setTimeout(() => {
      this.logout();
    }, duration*1000);
  }

  function saveAuthData(token, expirationDate, userId, email) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('email', email);
  }

  function clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
  }

  function getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if(!token || !expirationDate) return;
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }

  export const userService = {
    user: authStatusListener.asObservable(),
    // get userValue () { return userSubject.value },
    login,
    registration,
    changePassword,
    logout,
    register,
    returnAuthListener,
    autoAuthUser,
    protectRoute,
    getAuthData
};