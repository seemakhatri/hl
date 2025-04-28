import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getRole(): string | null {
    return localStorage.getItem('role');
  }
}
