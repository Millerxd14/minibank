import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { TokenService } from './token.service';
import { throwError } from 'rxjs';
import { tap } from 'rxjs/operators'
import { Auth } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrlRoot = "http://192.168.0.14";
  constructor(
    private http :HttpClient,
    private tokenService: TokenService
  ) { }


  login(username:string, password:string ){
    return this.http.post<Auth>(`${this.apiUrlRoot}/api/token/`, {username , password})
    .pipe(
      tap( response => this.tokenService.saveToken(response.access)),
    ).pipe(
      catchError((response:HttpErrorResponse)=>{
        if(response.status == HttpStatusCode.Unauthorized){
          return throwError('Usuario y contraseña erroneos');
        }else{
          return throwError('Algo salió mal durante el proceso');
        }
      })

    );
  }
}
