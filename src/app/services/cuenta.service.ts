import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpStatusCode, HttpHeaders } from '@angular/common/http';
import { ResponseApi } from '../models/auth.models';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CuentaService {
  private apiUrlRoot = "http://192.168.0.14";

  constructor(
    private http :HttpClient
  ) { }


  create_account(valor:number){
    return this.http.post<ResponseApi>(`${this.apiUrlRoot}/cuenta/`, {
      saldo: valor 
    })
    .pipe(
      catchError((response:HttpErrorResponse) => {
        if(response.status == HttpStatusCode.Unauthorized){
          return throwError('Sesion expirada');
        }
        return throwError('Algo salió mal');
      })
    );
  }


  add_cash(valor:number, n_cuenta :string){
    return this.http.post<ResponseApi>(`${this.apiUrlRoot}/cuenta/manipular/`, {
      valor: valor ,
      n_cuenta : n_cuenta,
      tipo : "consignar"
    })
    .pipe(
      catchError((response:HttpErrorResponse) => {
        if(response.status == HttpStatusCode.Unauthorized){
          return throwError('Sesión expirada');
        }
        return throwError('Algo salió mal');
      })
    );
  }

  withdraw_cash(valor:number, n_cuenta :string){
    return this.http.post<ResponseApi>(`${this.apiUrlRoot}/cuenta/manipular/`, {
      valor: valor ,
      n_cuenta : n_cuenta,
      tipo : "retirar"
    })
    .pipe(
      catchError((response: HttpErrorResponse) =>{
        if(response.status == HttpStatusCode.Forbidden){
          return throwError('Parece que no tienes permisos para retirar de esta cuenta');
        }
        if(response.status == HttpStatusCode.Unauthorized){
          return throwError('Sesión expirada');
        }
        return throwError('Ups algo anda mal ');
      })
    );
  }

  balance(n_cuenta :string){
    return this.http.get<ResponseApi>(`${this.apiUrlRoot}/cuenta/`, {
      params: {
        n_cuenta: n_cuenta
      }
    })
    .pipe(
      catchError((response: HttpErrorResponse) =>{
        if(response.status == HttpStatusCode.Forbidden){
          return throwError('Parece que no tienes permisos para consultar esta cuenta');
        }
        if(response.status == HttpStatusCode.Unauthorized){
          return throwError('Sesión expirada');
        }
        return throwError('Ups algo anda mal ');
      })
    );
  }
}
