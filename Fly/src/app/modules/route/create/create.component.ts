import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouteModel } from 'src/app/models/route.model';
import { RouteService } from 'src/app/services/route.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private routeService: RouteService,
    private router: Router) {

    }
    fgValidacion = this.fb.group({
      Time: ['', [Validators.required]],
      origin: ['', [Validators.required]],
      destiny: ['', [Validators.required]],
      
    });

  ngOnInit(): void {
  }
  store(){
    let route = new RouteModel();
    route.Time = this.fgValidacion.controls["Time"].value;
    route.origin = this.fgValidacion.controls["origin"].value;
    route.destiny = this.fgValidacion.controls["destiny"].value;

    this.routeService.store(route).subscribe((data: RouteModel)=> {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/route/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

}
