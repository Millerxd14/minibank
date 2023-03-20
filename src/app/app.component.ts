import { Component, OnInit } from '@angular/core';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  public token:string | null = '';
  constructor(
    private tokenService: TokenService
  ){
  }

  user_loged(){
    this.token = this.tokenService.getToken();
  }

}
