import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Farm } from '../models/farm.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FarmService {

  constructor(private http: HttpClient) { }

  index(): Observable<Farm[]> {
    return this.http.get<Farm[]>(`${environment.url_backend}/farms`);    
  }
  indexByFarmer(user: User): Observable<Farm[]> {
    return this.http.get<Farm[]>(`${environment.url_backend}/farmer/${user.profile.id}/farms`);    
  }
  create(farm: Farm): any {
    return this.http.post(`${environment.url_backend}/farms`, farm);
  }
  update(farm: Farm): any {
    return this.http.put(`${environment.url_backend}/farms/${farm.id}`, farm);
  }
  show(id: number): Observable<Farm> {
    return this.http.get<Farm>(`${environment.url_backend}/farms/${id}`);    
  }
  destroy(id:string){
    return this.http.delete<Farm>(`${environment.url_backend}/farms/${id}`);
  }
}
