import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Farm } from '../../../models/farm.model';
import { FarmService } from '../../../services/farm.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  modoCreacion: boolean = true;
  id_farm: number;
  intentoEnvio: boolean = false;
  farm: Farm = new Farm();

  constructor(private farmService: FarmService,
    private rutaActiva: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params.id) {
      this.modoCreacion = false;
      this.id_farm = this.rutaActiva.snapshot.params.id;
      this.getFarm(this.id_farm);
    } else {
      this.modoCreacion = true;
    }
  }

  getFarm(id: number) {
    this.farmService.show(id).subscribe(
      (farm) => {
        this.farm = farm;
      }
    )
  }

  create() {
    console.group("creating a " + JSON.stringify(this.farm));
    this.intentoEnvio = true;
    this.farmService.create(this.farm).
      subscribe(data => {
        Swal.fire(
          'Creado',
          'La granja ha sido creada satisfactoriamente',
          'success'
        )
        this.router.navigate(["pages/farm/list"]);
      });

  }

  update() {
    console.group("updating a " + JSON.stringify(this.farm));
    this.intentoEnvio = true;
    this.farmService.update(this.farm).
      subscribe(data => {
        Swal.fire(
          'Update',
          'The farm has been updated successfull',
          'success'
        )
        this.router.navigate(["pages/farms/list"]);
      });
  }
}
