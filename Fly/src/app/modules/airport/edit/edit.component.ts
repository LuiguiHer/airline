import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AirportModel } from 'src/app/models/airport.model';
import { AirportService } from 'src/app/services/airport.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private airportService: AirportService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  
  fgValidacion = this.fb.group({
    id: ['', [Validators.required]],
    name: ['', [Validators.required]],
    city: ['', [Validators.required]],
    country: ['', [Validators.required]],
    coordinateX: ['', [Validators.required]],
    coordinateY: ['', [Validators.required]],
    acronym: [{value: '', disabled: true},'', [Validators.required]],
    type: ['', [Validators.required]],
  });

  id: string=''

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.buscarRegistro(this.id);
  }

  buscarRegistro(id: string){
    this.airportService.getWithId(id).subscribe((data: AirportModel) => {
      this.fgValidacion.controls["id"].setValue(id)
      this.fgValidacion.controls["name"].setValue(data.name)
      this.fgValidacion.controls["city"].setValue(data.city)
      this.fgValidacion.controls["country"].setValue(data.country)
      this.fgValidacion.controls["coordinateX"].setValue(data.coordinateX)
      this.fgValidacion.controls["coordinateY"].setValue(data.coordinateY)
      this.fgValidacion.controls["acronym"].setValue(data.acronym)
      this.fgValidacion.controls["type"].setValue(data.type)
    })
  }
  edit(){
    let airport = new AirportModel();
    airport.id = this.fgValidacion.controls["id"].value;
    airport.name = this.fgValidacion.controls["name"].value;
    airport.city = this.fgValidacion.controls["city"].value;
    airport.country = this.fgValidacion.controls["country"].value;
    airport.coordinateX = this.fgValidacion.controls["coordinateX"].value;
    airport.coordinateY = this.fgValidacion.controls["coordinateY"].value;
    airport.acronym = this.fgValidacion.controls["acronym"].value;
    airport.type = this.fgValidacion.controls["type"].value;
 
    this.airportService.update(airport).subscribe((data: AirportModel)=> {
      Swal.fire('Editado Correctamente!', '', 'success')
      this.router.navigate(['/airport/get']);
      
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }


}
