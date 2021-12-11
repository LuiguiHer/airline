import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FlightModel } from '../models/flight.model';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private http: HttpClient,
    private securityService: SecurityService) 
    {
      this.token = this.securityService.getToken();
    }

  url = "http://localhost:3000"
  token: string = ''

  store(flight: FlightModel): Observable<FlightModel> {
    return this.http.post<FlightModel>(`${this.url}/flights`, {
      fecha_inicio: flight.fecha_inicio,
      Star_Time: flight.Star_Time,
      end_date: flight.end_date,
      end_time: flight.end_time,
      sold_seats: flight.sold_seats,
      pilot_name: flight.pilot_name,
      ruta: flight.ruta,
    },
    {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    }
    );
  }

  getAll(): Observable<FlightModel[]>{
    return this.http.get<FlightModel[]>(`${this.url}/flights`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  update(flight: FlightModel): Observable<FlightModel> {
    return this.http.put<FlightModel>(`${this.url}/flights/${flight.id}`, {
      fecha_inicio: flight.fecha_inicio,
      Star_Time: flight.Star_Time,
      end_date: flight.end_date,
      end_time: flight.end_time,
      sold_seats: flight.sold_seats,
      pilot_name: flight.pilot_name,
      ruta: flight.ruta,
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  delete(id: string): Observable<FlightModel[]>{
    return this.http.delete<FlightModel[]>(`${this.url}/flights/${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  getWithId(id: string): Observable<FlightModel>{
    return this.http.get<FlightModel>(`${this.url}/flights/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }
}

