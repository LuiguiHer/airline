import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModelo } from '../models/user.model';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
    private securityService: SecurityService) 
    {
      this.token = this.securityService.getToken();
    }

  url = "http://localhost:3000"
  token: string = ''

  store(user: UserModelo): Observable<UserModelo> {
    return this.http.post<UserModelo>(`${this.url}/usuarios`, {
      name: user.name,
      lastname: user.lastname,
      phone: user.phone,
      email: user.email
    });
  }

  getAll(): Observable<UserModelo[]>{
    return this.http.get<UserModelo[]>(`${this.url}/usuarios`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  update(user: UserModelo): Observable<UserModelo> {
    return this.http.put<UserModelo>(`${this.url}/usuarios/${user.id}`, {
      name: user.name,
      lastname: user.lastname,
      phone: user.phone,
      email: user.email
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  delete(id: string): Observable<UserModelo[]>{
    return this.http.delete<UserModelo[]>(`${this.url}/usuarios/${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  getWithId(id: string): Observable<UserModelo>{
    return this.http.get<UserModelo>(`${this.url}/usuarios/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

}
