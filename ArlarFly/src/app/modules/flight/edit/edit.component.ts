import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightModel } from 'src/app/models/flight.model';
import { RouteModel } from 'src/app/models/route.model';
import { FlightService } from 'src/app/services/flight.service';
import { RouteService } from 'src/app/services/route.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private flightService: FlightService,
    private router: Router,
    private route: ActivatedRoute,
    private routeService: RouteService,
  ) { }

  listadoRutas: RouteModel[] = []

  fgValidacion = this.fb.group({
    id: ['', [Validators.required]],
    fecha_inicio: ['', [Validators.required]],
    Star_Time: ['', [Validators.required]],
    end_date: ['', [Validators.required]],
    end_time: ['', [Validators.required]],
    sold_seats: ['', [Validators.required]],
    pilot_name: ['', [Validators.required]],
    ruta: ['', [Validators.required]],
  });

  id: string=''

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.buscarRegistro(this.id);
    this.getAllRoutes();
  }

  getAllRoutes(){
    this.routeService.getAll().subscribe((data: RouteModel[]) => {
      this.listadoRutas = data
      console.log(data)
    })
  }


  buscarRegistro(id: string){
    this.flightService.getWithId(id).subscribe((data: FlightModel) => {
      console.log(data)
      this.fgValidacion.controls["id"].setValue(id)
      this.fgValidacion.controls["fecha_inicio"].setValue(data.fecha_inicio)
      this.fgValidacion.controls["Star_Time"].setValue(data.Star_Time)
      this.fgValidacion.controls["end_date"].setValue(data.end_date)
      this.fgValidacion.controls["end_time"].setValue(data.end_time)
      this.fgValidacion.controls["sold_seats"].setValue(data.sold_seats)
      this.fgValidacion.controls["pilot_name"].setValue(data.pilot_name)
      this.fgValidacion.controls["ruta"].setValue(data.ruta)
    })
  }

  edit(){
    let flight = new FlightModel();
    flight.id = this.fgValidacion.controls["id"].value;
    flight.fecha_inicio = this.fgValidacion.controls["fecha_inicio"].value;
    flight.Star_Time = this.fgValidacion.controls["Star_Time"].value;
    flight.end_date = this.fgValidacion.controls["end_date"].value;
    flight.end_time = this.fgValidacion.controls["end_time"].value;
    flight.sold_seats = this.fgValidacion.controls["sold_seats"].value;
    flight.pilot_name = this.fgValidacion.controls["pilot_name"].value;
    flight.ruta = this.fgValidacion.controls["ruta"].value;

    this.flightService.update(flight).subscribe((data: FlightModel)=> {
      Swal.fire('Editado Correctamente!', '', 'success')
      this.router.navigate(['/flight/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }



}
