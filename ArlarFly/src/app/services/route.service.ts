import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RouteModel } from '../models/route.model';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private http: HttpClient,
    private securityService: SecurityService) 
    {
      this.token = this.securityService.getToken();
    }

  url = "http://localhost:3000"
  token: string = ''

  store(route: RouteModel): Observable<RouteModel> {
    return this.http.post<RouteModel>(`${this.url}/routes`, {
      Time: route.Time,
      origin: route.origin,
      destiny: route.destiny
    },{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }
  getAll(): Observable<RouteModel[]>{
    return this.http.get<RouteModel[]>(`${this.url}/routes`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  update(route: RouteModel): Observable<RouteModel> {
    return this.http.put<RouteModel>(`${this.url}/routes/${route.id}`, {
      Time: route.Time,
      origin: route.origin,
      destiny: route.destiny
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  delete(id: string): Observable<RouteModel[]>{
    return this.http.delete<RouteModel[]>(`${this.url}/routes/${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  getWithId(id: string): Observable<RouteModel>{
    return this.http.get<RouteModel>(`${this.url}/routes/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }
  
}

