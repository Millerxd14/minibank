import { Component, Input } from '@angular/core';
import { CuentaService } from 'src/app/services/cuenta.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  public info = {
    n_cuenta: '',
    valor: 0,
    tipo : "",
  }
  constructor(
    private tokenService: TokenService,
    private cuentaService :CuentaService
  ){

  }



  on_create_account(){
    this.cuentaService.create_account(this.info.valor)
    .subscribe( response =>{
      Swal.fire({
        icon: 'success',
        title: `Muy bien ${response.data.user} !`,
        text: `Cuenta creada, tu numero de cuenta es ${response.data.n_cuenta}`
      });
    }, error =>{
      if(error == 'Sesión expirada'){
        this.tokenService.saveToken('');
      }
      Swal.fire({
        icon: 'error',
        title: `Algo sucedió`,
        text: ` ${error}`
      });
    });
  }


  on_add_cash(){
    this.cuentaService.add_cash(this.info.valor, this.info.n_cuenta)
    .subscribe( response =>{

      console.log(response);
      Swal.fire({
        icon: 'success',
        title: `Muy bien ${response.data.user} !`,
        text: `El dinero se consignó correctamente, el nuevo saldo es ${response.data.saldo}`
      });
    }, error =>{
      if(error == 'Sesión expirada'){
        this.tokenService.saveToken('');
      }
      Swal.fire({
        icon: 'error',
        title: `Algo sucedió`,
        text: ` ${error}`
      });
    });
  }



  on_withdraw_cash(){
    this.cuentaService.withdraw_cash(this.info.valor, this.info.n_cuenta)
    .subscribe( response =>{
      Swal.fire({
        icon: 'success',
        title: `Muy bien ${response.data.user} !`,
        text: `El dinero retirado, su nuevo saldo es: ${response.data.saldo}`
      });
    }, error=>{
      if(error == 'Sesión expirada'){
        this.tokenService.saveToken('');
      }
      Swal.fire({
        icon: 'error',
        title: `Algo sucedió`,
        text: ` ${error}`
      });
    });
  }


  on_balance(){
    this.cuentaService.balance(this.info.n_cuenta)
    .subscribe( response =>{
      Swal.fire({
        icon: 'success',
        title: `Aquí están tus datos ${response.data.user}!`,
        text: `El saldo de la cuenta ${response.data.n_cuenta} es: ${response.data.saldo}`
      });
    }, error=>{
      if(error == 'Sesión expirada'){
        this.tokenService.saveToken('');
      }
      Swal.fire({
        icon: 'error',
        title: `Algo sucedió`,
        text: ` ${error}`
      });
    });
  }

}
