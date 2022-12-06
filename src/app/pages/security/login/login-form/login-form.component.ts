import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../../../../models/user.model';
import { SecurityService } from '../../../../services/security.service';

@Component({
  selector: 'ngx-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  correo:string="";
  contrasena:string="";

  @Output() switch = new EventEmitter<boolean>();

  constructor(private miServicioSeguridad : SecurityService,
              private router: Router) { }
  
  /**
   * Método que se ejecuta una vez se carga la página
   */
  ngOnInit(): void {
  }
  /**
   * Este método permite llevar a cabo el proceso de login,
   * llamando al método correspondiente de los servicios
   * para solicitar la validación al backend
   */
  login():void{  
    console.log("aqui"+this.correo+" contraseña "+this.contrasena)
    let elUser:User={
      email:this.correo,
      password:this.contrasena
    }
    this.miServicioSeguridad.login(elUser).subscribe(
      data=>{
        this.router.navigate(['pages/dashboard']);
        this.miServicioSeguridad.guardarDatosSesion(data);
      },
      error=>{
        Swal.fire({
          title: 'Error Login',
          //text: error["error"]["message"],
          icon: 'error',
          timer:5000 
        });
      }
    );
  }

  showRegister() {
    this.switch.emit(true);
  }

}
