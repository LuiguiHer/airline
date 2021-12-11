import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserModelo } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private usuarioService: UserService,
    private router: Router,
    private route: ActivatedRoute) { }

    fgValidacion = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
    });
 
    id: string=''

    buscarRegistro(id: string){
      this.usuarioService.getWithId(id).subscribe((data: UserModelo) => {
        console.log(data)
        this.fgValidacion.controls["id"].setValue(id)
        this.fgValidacion.controls["name"].setValue(data.name)
        this.fgValidacion.controls["lastname"].setValue(data.lastname)
        this.fgValidacion.controls["email"].setValue(data.email)
        this.fgValidacion.controls["phone"].setValue(data.phone)
      })
    }
    edit(){
      let usuario = new UserModelo();
      usuario.id = this.fgValidacion.controls["id"].value;
      usuario.name = this.fgValidacion.controls["name"].value;
      usuario.lastname = this.fgValidacion.controls["lastname"].value;
      usuario.email = this.fgValidacion.controls["email"].value;
      usuario.phone = this.fgValidacion.controls["phone"].value;
   
      this.usuarioService.update(usuario).subscribe((data: UserModelo)=> {
        Swal.fire('Editado Correctamente!', '', 'success')
        this.router.navigate(['/admin/get']);
      },
      (error: any) => {
        console.log(error)
        alert("Error en el envio");
      })
    }
  
  

  ngOnInit(): void {this.id = this.route.snapshot.params["id"]
  this.buscarRegistro(this.id);
  }

}
