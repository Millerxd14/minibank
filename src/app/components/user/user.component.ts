import { Component, EventEmitter, Output,Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  
  @Output() loged  = new EventEmitter<string>();
  public login = {
    username: '',
    password: ''
  };

  constructor(
    private authService: AuthService
  ){
  }

  on_login(){
    console.log("Hola ?");
    this.authService.login(this.login.username, this.login.password)
    .subscribe(response =>{
      console.log(response);
      this.loged.emit();
    }, response =>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Usuario o contraseña incorrectos!'
      });
    });
  }
}
