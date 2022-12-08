import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Farm } from '../../../models/farm.model';
import { Product } from '../../../models/product.model';
import { FarmService } from '../../../services/farm.service';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  id_farm: number;
  farm: Farm = new Farm();
  products: Product[] = [];

  constructor(private farmService: FarmService,
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private productService: ProductService) { }

  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params.id) {
      this.id_farm = this.rutaActiva.snapshot.params.id;
      this.getFarm(this.id_farm);
      this.getProducts(this.id_farm);
    } else {
      this.router.navigate(["pages/farms/list"]);
    }
  }

  getFarm(id: number) {
    this.farmService.show(id).subscribe(
      (farm) => {
        this.farm = farm;
      }
    )
  }

  getProducts(idFarm) {
    this.productService.indexByFarm(idFarm).subscribe((products) => {
      this.products = products;
    })
  }

  createProduct(idFarm) {
    this.router.navigate([`pages/farms/${idFarm}/products/create`]);
  }

  updateProduct(idFarm, idProduct) {
    this.router.navigate([`pages/farms/${idFarm}/products/create/${idProduct}`]);
  }

  deleteFarm(id: string): void {
    Swal.fire({
      title: 'Eliminar Producto',
      text: "Está seguro que quiere eliminar este producto?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.destroy(id).
          subscribe(data => {
            Swal.fire(
              'Eliminado!',
              'El producto ha sido eliminada correctamente',
              'success'
            )
            this.ngOnInit();
          });
      }
    })
  }

}
