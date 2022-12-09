import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import MenuConsumer from '../configs/menu-consumer';
import MenuFarmer from '../configs/menu-farmer.config';
import { roles } from '../enums/roles';
import { SecurityService } from '../services/security.service';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  subscription: Subscription;
  isLogged: boolean = false;
  menu = [];

  constructor(private securityService: SecurityService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.subscription = this.securityService.getUser().subscribe((user) => {
      this.isLogged = this.securityService.sesionExiste();
      this.updateMenuRole(user);
    });
  }

  updateMenuRole(user) : void{
    let nameMenuItems:String[];
    if(this.isLogged){
      if(user.role.name === roles.ADMIN){
        nameMenuItems=['Usuarios', "Permisos"];
      }
      else if(user.role.name === roles.FARMER){
        nameMenuItems=MenuFarmer;
      }else{
        nameMenuItems=MenuConsumer;
      }
    }else{
      console.log('update')
      nameMenuItems=["E-commerce"]
    }

    this.menu = [];
    MENU_ITEMS.forEach(actualNameMenuItem => {
      if(nameMenuItems.indexOf(actualNameMenuItem.title)!=-1){
        this.menu.push(actualNameMenuItem);
        
      }
      
    });
  }
  getItemsMenuRole(menuItems): String[]{
    let items:String[]=[]
    if(this.isLogged){
      menuItems.forEach(itemActual => {
        items.push(itemActual.url);
      });
    }
    
    return items;
  }
}
