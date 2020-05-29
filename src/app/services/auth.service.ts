import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public static readonly TOKEN = "auth_token";
  public static readonly EXPIRES = "expires_at";

  constructor(private http: HttpClient) { }

  testSecret(){
    return this.http.get("http://localhost:5000/api/secret");
  }

  login(name: string, password: string){
    return this.http.post("http://localhost:5000/api/login", {
      name: name,
      password: password
    }).pipe(
      tap(response => this.saveSession)
    )
  }

  logout(){
    if (localStorage.getItem(AuthService.TOKEN) != null){
      localStorage.removeItem(AuthService.TOKEN);
    }
    if (localStorage.getItem(AuthService.EXPIRES) != null){
      localStorage.removeItem(AuthService.EXPIRES);
    }
  }

  public isLoggedIn() : boolean {
    if (localStorage.getItem(AuthService.EXPIRES) == null){
      return false;
    }
    return moment().isBefore(moment(JSON.parse(localStorage.getItem(AuthService.EXPIRES))));
  }

  private saveSession(response) {
    const expiresAt = moment().add(response.expiresIn,'second');
    localStorage.setItem(AuthService.TOKEN, JSON.stringify(response.token));
    localStorage.setItem(AuthService.EXPIRES, JSON.stringify(expiresAt.valueOf()));
  }
}
