import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { roles } from '../enums/roles';
import { Profile } from '../models/profile.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {
  
  constructor(private http: HttpClient,private router: Router) { }

  /**
   * complete register as customer
   * @param profile 
   * @returns 
   */
  register(profile: Profile, user: User): Observable<Profile> {
    if (user.role.name === roles.CONSUMER) {
      return this.http.post<Profile>(`${environment.url_backend}/consumers`, {
        ...profile,
        ...user
      })
    } else if (user.role.name === roles.ADMIN) {
      return this.http.post<Profile>(`${environment.url_backend}/admins`, {
        ...profile,
        ...user
      })
    } else if (user.role.name === roles.FARMER) {
      return this.http.post<Profile>(`${environment.url_backend}/farmers`, {
        ...profile,
        ...user
      })
    }
  }
}
