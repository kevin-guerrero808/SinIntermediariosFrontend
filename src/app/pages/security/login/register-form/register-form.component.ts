import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../../../../models/user.model';
import { SecurityService } from '../../../../services/security.service';

@Component({
  selector: 'ngx-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

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
  register():void{  
    console.log("aqui"+this.correo+" contraseña "+this.contrasena)
    let elUser:User={
      email:this.correo,
      password:this.contrasena
    }
    this.miServicioSeguridad.registerCustomer(elUser).subscribe(
      data=>{
        Swal.fire({
          title: 'Revisa tu correo para completar el registro',
          //text: error["error"]["message"],
          icon: 'success',
          timer: 5000
        });
        this.router.navigate(['pages/security/login']);
        //this.router.navigate(['pages/dashboard']);
        //this.miServicioSeguridad.guardarDatosSesion(data);
      },
      error=>{
        Swal.fire({
          title: 'Error Registro',
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
