import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AirportModel } from 'src/app/models/airport.model';
import { AirportService } from 'src/app/services/airport.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private airportService: AirportService,
    private router: Router
  ) { }
  fgValidacion = this.fb.group({
    name: ['', [Validators.required]],
    city: ['', [Validators.required]],
    country: ['', [Validators.required]],
    coordinateX: ['', [Validators.required]],
    coordinateY: ['', [Validators.required]],
    acronym: ['', [Validators.required]],
    type: ['', [Validators.required]],
  });


  ngOnInit(): void {
  }
  store(){
    let airport = new AirportModel();
    airport.name = this.fgValidacion.controls["name"].value;
    airport.city = this.fgValidacion.controls["city"].value;
    airport.country = this.fgValidacion.controls["country"].value;
    airport.coordinateX = this.fgValidacion.controls["coordinateX"].value;
    airport.coordinateY = this.fgValidacion.controls["coordinateY"].value;
    airport.acronym = this.fgValidacion.controls["acronym"].value;
    airport.type = this.fgValidacion.controls["type"].value;
 
    this.airportService.store(airport).subscribe((data: AirportModel)=> {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/airport/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

}
