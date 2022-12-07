import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Role } from '../../../models/role';
import { User } from '../../../models/user.model';
import { RoleService } from '../../../services/role.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {

  modoCreacion: boolean = true;
  id_user: number;
  intentoEnvio: boolean = false;
  user: User = {
    name: "",
    email: "",
    password: "",
    id_role: -1
  };
  roles: Role[] = []
  idSelectedRole: number = -1;

  constructor(private userService: UserService,
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private roleService: RoleService) { }

  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params.id) {
      this.modoCreacion = false;
      this.id_user = this.rutaActiva.snapshot.params.id;
      this.getUser(this.id_user);
    } else {
      this.modoCreacion = true;
    }
    this.getRoles();
  }

  getUser(id: number) {
    this.userService.show(id).subscribe(
      (user) => {
        this.user = user;
      }
    )
  }

  create() {
    console.group("creating a " + JSON.stringify(this.user));
    if (this.validarDatosCompletos()) {
      this.intentoEnvio = true;
      this.userService.create(this.user).
        subscribe(data => {
          Swal.fire(
            'Creado',
            'Revisar el correo para completar el registro',
            'success'
          )
          this.router.navigate(["pages/user/list"]);
        });
    }

  }

  update() {
    console.group("updating a " + JSON.stringify(this.user));
    if (this.validarDatosCompletos()) {
      this.intentoEnvio = true;
      this.userService.update(this.user).
        subscribe(data => {
          Swal.fire(
            'Update',
            'The user has been updated successfull',
            'success'
          )
          this.router.navigate(["pages/users/list"]);
        });
    }
  }

  validarDatosCompletos():boolean{
    this.intentoEnvio=true;
    if(this.user.email=="" || 
       this.user.password==""){

      return false;
    }else{
      return true;
    }
  }

  getRoles() {
    this.roleService.index().subscribe(
      (result) => {
        console.log("recibe");
        console.log(result);
        this.roles = result;
      }
    )
  }
}
