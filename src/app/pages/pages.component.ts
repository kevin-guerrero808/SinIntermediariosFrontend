import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
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
      this.updateMenuRole(user.id_role);
    });
  }

  updateMenuRole(id) : void{
    let nameMenuItems:String[];
    if(this.isLogged){
      if(id==environment.ID_ROL_ADMIN){
        nameMenuItems=['E-commerce', "Permisos"];
      }else{
        nameMenuItems=['E-commerce'];
      }
    }else{
      nameMenuItems=["home"]
    }

    //console.log("nameMenuItems->"+JSON.stringify(nameMenuItems))
    
    //let nameMenuItems:String[]=items;
    MENU_ITEMS.forEach(actualNameMenuItem => {
      ////console.log(actualNameMenuItem.idName);
      
      //################ URGENTE  DESCOMENTAR ESTO ###################
      if(nameMenuItems.indexOf(actualNameMenuItem.title)!=-1){
        this.menu.push(actualNameMenuItem);
        
      }
      
      //this.menu.push(actualNameMenuItem);
      
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
