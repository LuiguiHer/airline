import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteModel } from 'src/app/models/route.model';
import { RouteService } from 'src/app/services/route.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private routeService: RouteService,
    private router: Router,
    private route: ActivatedRoute) { }
    fgValidacion = this.fb.group({
      id: ['', [Validators.required]],
      Time: ['', [Validators.required]],
      origin: ['', [Validators.required]],
      destiny: ['', [Validators.required]]});
 
    id: string=''
    // metodo para traer la informacion del  registro
    buscarRegistro(id: string){
      this.routeService.getWithId(id).subscribe((data: RouteModel) => {
        console.log(data)
        this.fgValidacion.controls["id"].setValue(id)
        this.fgValidacion.controls["Time"].setValue(data.Time)
        this.fgValidacion.controls["origin"].setValue(data.origin)
        this.fgValidacion.controls["destiny"].setValue(data.destiny)
      })
    }
  //  editar la informacion
  edit(){
    let route = new RouteModel();
    route.id = this.fgValidacion.controls["id"].value;
    route.Time = this.fgValidacion.controls["Time"].value;
    route.origin = this.fgValidacion.controls["origin"].value;
    route.destiny = this.fgValidacion.controls["destiny"].value;
 
    this.routeService.update(route).subscribe((data: RouteModel)=> {
      Swal.fire('Editado Correctamente!', '', 'success')
      this.router.navigate(['/route/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.buscarRegistro(this.id);
  }
}

