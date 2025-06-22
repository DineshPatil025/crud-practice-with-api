import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.apiUrl;

  constructor(
    private _http: HttpClient,
  ) { }


  signup(signUpPayload: any) {
    return this._http.post(`${this.baseUrl}auth/signup`, signUpPayload).pipe(
      tap((response: any) => {
        console.log('Signup response:', response);
      })
    );
  }


}
