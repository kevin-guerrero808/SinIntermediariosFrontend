import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  index(): Observable<Role[]> {
    return this.http.get<Role[]>(`${environment.url_backend}/roles`);    
  }
  create(Role: Role): any {
    return this.http.post(`${environment.url_backend}/roles`, Role);
  }
  update(Role: Role): any {
    return this.http.put(`${environment.url_backend}/roles/${Role.id}`, Role);
  }
  show(id: number): Observable<Role> {
    return this.http.get<Role>(`${environment.url_backend}/roles/${id}`);
  }
  destroy(id:string){
    return this.http.delete<Role>(`${environment.url_backend}/roles/${id}`);
  }

}
