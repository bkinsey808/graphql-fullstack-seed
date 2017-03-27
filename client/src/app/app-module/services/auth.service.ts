import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';


// id_token is chosen because it is a default in angular2-jwt
const LOCAL_STORAGE_JWT_TOKEN_KEY = 'id_token';

@Injectable()
export class AuthService {

  static setJwtToken(token) {
    console.log('setting ', token);
    localStorage.setItem(LOCAL_STORAGE_JWT_TOKEN_KEY, token);
  }

  static getJwtToken() {
    console.log('getting token');
    return localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY);
  }

  static logout() {
    localStorage.removeItem(LOCAL_STORAGE_JWT_TOKEN_KEY);
  }

  static isLoggedIn() {
    // angular2-jwt assumes token is id_token by default
    return tokenNotExpired();
  }

  constructor() { }
}
