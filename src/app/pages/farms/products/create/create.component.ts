import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Product } from '../../../../models/product.model';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'ngx-create-product',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateProductComponent implements OnInit {

  modoCreacion: boolean = true;
  id_product: number;
  id_farm: number;
  intentoEnvio: boolean = false;
  product: Product = new Product();

  constructor(private productService: ProductService,
    private rutaActiva: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params.id) {
      this.modoCreacion = false;
      this.id_product = this.rutaActiva.snapshot.params.id;
      this.getProduct(this.id_product);
    } else {
      this.modoCreacion = true;
    }
    this.id_farm = this.rutaActiva.snapshot.params.idFarm;
    console.log('id farm on ngonnit')
    console.log(this.id_farm)
  }

  getProduct(id: number) {
    this.productService.show(id).subscribe(
      (product) => {
        this.product = product;
      }
    )
  }

  create() {
    this.intentoEnvio = true;
    this.productService.create(this.product, this.id_farm).
      subscribe(data => {
        Swal.fire(
          'Creado',
          'El producto ha sido creada satisfactoriamente',
          'success'
        )
        this.router.navigate(["pages/farms/detail/"+this.id_farm]);
      },
      error => {
        Swal.fire(
          'Error',
          'Error para actualizar el producto',
          'error'
        )
      });

  }

  update() {
    this.intentoEnvio = true;
    this.productService.update(this.product, this.id_farm).
      subscribe(data => {
        Swal.fire(
          'Actualizado',
          'El producto ha sido actualizado satisfactoriamente',
          'success'
        )
        this.router.navigate(["pages/farms/detail/"+this.id_farm]);
      });
  }
}
