import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Profile } from '../../../models/profile.model';
import { User } from '../../../models/user.model';
import { ConsumerService } from '../../../services/consumer.service';
import { SecurityService } from '../../../services/security.service';

@Component({
  selector: 'ngx-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.scss']
})
export class CompleteProfileComponent implements OnInit {

  profile: Profile;
  user: User;

  @Output() switch = new EventEmitter<boolean>();

  constructor(private securityService : SecurityService,
    private rutaActiva: ActivatedRoute,
    private consumerService : ConsumerService,
    private router: Router) {
    this.profile = new Profile();    
    this.user = new User();  
  }

  /**
   * Método que se ejecuta una vez se carga la página
   */
   ngOnInit(): void {
    this.setUser();
  }

  setUser(): void {
    console.log("token");
    const user: User = {token: this.rutaActiva.snapshot.queryParams.token};
    this.user.role = { name: this.rutaActiva.snapshot.queryParams.role };
    this.securityService.setUser(user);
  }

  /**
   * Este método permite llevar a cabo el proceso de login,
   * llamando al método correspondiente de los servicios
   * para solicitar la validación al backend
   */
  complete():void{
    this.consumerService.register(this.profile, this.user).subscribe(
      data=>{
        Swal.fire({
          title: 'Registro completado satisfactoriamente',
          //text: error["error"]["message"],
          icon: 'success',
          timer:5000 
        });
        this.router.navigate(['pages/security/login']);
      },
      error=>{
        Swal.fire({
          title: 'Error al registrarse',
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
