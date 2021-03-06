import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';


// id_token is chosen because it is a default in angular2-jwt
const LOCAL_STORAGE_JWT_TOKEN_KEY = 'token';

@Injectable()
export class AuthService {

  static setJwtToken(token) {
    console.log('setting ', token);
    localStorage.setItem(LOCAL_STORAGE_JWT_TOKEN_KEY, token);
  }

  static getJwtToken() {
    const notExpired = tokenNotExpired();
    if (!notExpired) {
      console.log('token expired');
      return this.logout();
    }
    const token = localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY);
    return token;
  }

  static logout() {
    localStorage.removeItem(LOCAL_STORAGE_JWT_TOKEN_KEY);
  }

  static isLoggedIn() {
    // angular2-jwt assumes token is id_token by default
    const notExpired = tokenNotExpired();
    if (!notExpired) {
      console.log('token expired');
      this.logout();
    }
    return notExpired;
  }

  constructor() { }
}
