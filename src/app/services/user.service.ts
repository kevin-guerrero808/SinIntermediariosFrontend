import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  index(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.url_backend}/users`);    
  }
  create(user: User): any {
    return this.http.post(`${environment.url_backend}/users`, user);
  }
  update(user: User): any {
    return this.http.put(`${environment.url_backend}/users/${user.id}`, user);
  }
  show(id: number): Observable<User> {
    return this.http.get<User>(`${environment.url_backend}/users/${id}`);    
  }
  destroy(id:string){
    return this.http.delete<User>(`${environment.url_backend}/users/${id}`);
  }

}
