import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
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
    return this.http.post<Profile>(`${environment.url_backend}/consumers`, {
      ...profile,
      ...user
    });
  }
}
