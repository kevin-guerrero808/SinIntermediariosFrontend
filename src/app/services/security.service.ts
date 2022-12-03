import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  elUser = new BehaviorSubject<User>(new User);
  constructor(private http: HttpClient,private router: Router) {
    this.verificarSesionActual();
  }
  /**
   * Permite obtener la información de usuario 
   * que tiene la función activa y servirá
   * para acceder a la información del token
   */
  public get usuarioSesionActiva(): User {
    return this.elUser.value;
  }
  /**
   * Permite actualizar la información del usuario
   * que acabó de validarse correctamente
   * @param user información del usuario logueado
   */
  setUser(user: User) {
    this.elUser.next(user);
  }
  /**
   * Permite obtener la información del usuario
   * con datos tales como el identificador y el token
   * @returns 
   */
  getUser() {
    return this.elUser.asObservable();
  }
  /**
   * Realiza la petición al backend con el correo y la contraseña
   * para verificar si existe o no en la plataforma
   * @param infoUser JSON con la información de correo y contraseña
   * @returns Respuesta HTTP la cual indica si el usuario tiene permiso de acceso
   */
  login(infoUser: User): Observable<User> {
    return this.http.post<User>(`${environment.url_backend}/login`, infoUser);
  }
  /**
   * Guarda los datos tales como el identificador
   * y token del usuario en una base de datos 
   * interna del navegador llamada local storage
   * @param datosSesion información del usuario
   * @returns un booleano que indica si la información 
   * fue almacenada correctamente
   */
  guardarDatosSesion(datosSesion: any) {
    let sesionActual = localStorage.getItem('sesion');
      let data: User = {
        id: datosSesion.user.id,
        id_role: datosSesion.user.id_role,
        token: datosSesion.token.token,
      };
      localStorage.setItem('sesion', JSON.stringify(data));
      this.setUser(data);
  }

  /**
   * Permite cerrar la sesión del usuario
   * que estaba previamente logueado
   */
  logout() {
    return this.http.post<User>(`${environment.url_backend}/logout`, this.elUser.value);
    localStorage.removeItem('sesion');
    this.setUser(new User());
  }
  /**
   * Permite verificar si actualmente en el local storage
   * existe información de un usuario previamente logueado 
   */
  verificarSesionActual() {
    let sesionActual = this.getDatosSesion();
    if (sesionActual) {
      this.setUser(JSON.parse(sesionActual));
    }
  }
  /**
   * Verifica si hay una sesion activa 
   * @returns 
   */
  sesionExiste(): boolean {
    let sesionActual = this.getDatosSesion();
    return (sesionActual) ? true : false;
  }
  /**
   * Permite obtener los dato de la sesión activa en el 
   * local storage
   * @returns 
   */
  getDatosSesion() {
    let sesionActual = localStorage.getItem('sesion');
    return sesionActual;
  }

  verifySesionRole(roleId): Boolean {
    let currentSession = JSON.parse(this.getDatosSesion());

    return (currentSession.role_id == roleId)
  }
}
