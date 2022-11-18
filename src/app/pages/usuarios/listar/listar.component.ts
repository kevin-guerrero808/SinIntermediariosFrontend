import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  columns = ['id', 'name', 'email', 'role', 'options'];
  users: User[];

  constructor(private usersService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.listUsers();
  }

  listUsers(): void {
    this.usersService.index().subscribe(
      (users) => {
        this.users = users;
        console.log(users);
      }
    )
  }

  updateUser(id: number): void {
    console.log("update " + id);
    this.router.navigate(["/pages/users/update/" + id])
    // this.usersService.destroy(id).subscribe(

    // )
  }

  deleteUser(id: string): void {
    Swal.fire({
      title: 'Eliminar Estudiante',
      text: "Está seguro que quiere eliminar el estudiante?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersService.destroy(id).
          subscribe(data => {
            Swal.fire(
              'Eliminado!',
              'El estudiante ha sido eliminada correctamente',
              'success'
            )
            this.ngOnInit();
          });
      }
    })

    //console.log("deleten " + id);
    // this.usersService.destroy(id).subscribe(

    // )
  }
  
  create() {
    this.router.navigate(["/pages/users/create"])
  }

}
