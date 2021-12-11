import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightModel } from 'src/app/models/flight.model';
import { RouteModel } from 'src/app/models/route.model';
import { FlightService } from 'src/app/services/flight.service';
import { RouteService } from 'src/app/services/route.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private flightService: FlightService,
    private router: Router,
    private routeService: RouteService,
  ) { }

  listadoRutas: RouteModel[] = []

  fgValidacion = this.fb.group({
    fecha_inicio: ['', [Validators.required]],
    Star_Time: ['', [Validators.required]],
    end_date: ['', [Validators.required]],
    end_time: ['', [Validators.required]],
    sold_seats: ['', [Validators.required]],
    pilot_name: ['', [Validators.required]],
    ruta: ['', [Validators.required]],
  });


  ngOnInit(): void {
    this.getAllRoutes()
  }

  getAllRoutes(){
    this.routeService.getAll().subscribe((data: RouteModel[]) => {
      this.listadoRutas = data
      console.log(data)
    })
  }


  store(){
    let flight = new FlightModel();
    flight.fecha_inicio = this.fgValidacion.controls["fecha_inicio"].value;
    flight.Star_Time = this.fgValidacion.controls["Star_Time"].value;
    flight.end_date = this.fgValidacion.controls["end_date"].value;
    flight.end_time = this.fgValidacion.controls["end_time"].value;
    flight.sold_seats = this.fgValidacion.controls["sold_seats"].value;
    flight.pilot_name = this.fgValidacion.controls["pilot_name"].value;
    flight.ruta = this.fgValidacion.controls["ruta"].value;
 
    this.flightService.store(flight).subscribe((data: FlightModel)=> {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/flight/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }



}
