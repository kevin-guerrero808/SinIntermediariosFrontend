import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Farm } from '../../../models/farm.model';
import { User } from '../../../models/user.model';
import { FarmService } from '../../../services/farm.service';
import { SecurityService } from '../../../services/security.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  columns = ['name', 'description', 'direction', 'options'];
  farms: Farm[];

  constructor(private securityService: SecurityService,
    private farmsService: FarmService,
    private router: Router) { }

  ngOnInit(): void {
    this.securityService.getUser().subscribe((user) => {
      this.listFarms(user);
    })
  }

  listFarms(user: User): void {
    this.farmsService.indexByFarmer(user).subscribe(
      (farms) => {
        this.farms = farms;
        console.log(farms);
      }
    )
  }

  viewFarm(id: number): void {
    this.router.navigate(["/pages/farms/detail/" + id])
  }

  deleteFarm(id: string): void {
    Swal.fire({
      title: 'Eliminar Granja',
      text: "Está seguro que quiere eliminar esta granja?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.farmsService.destroy(id).
          subscribe(data => {
            Swal.fire(
              'Eliminado!',
              'La granaja ha sido eliminada correctamente',
              'success'
            )
            this.ngOnInit();
          });
      }
    })
  }
  
  create() {
    this.router.navigate(["/pages/farms/create"])
  }

}
