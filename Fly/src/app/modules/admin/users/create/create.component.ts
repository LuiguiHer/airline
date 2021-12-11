import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserModelo } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private usuarioService: UserService,
    private router: Router) { }
    fgValidacion = this.fb.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
    });
  

  ngOnInit(): void {
  }
  store(){
    let usuario = new UserModelo();
    usuario.name = this.fgValidacion.controls["name"].value;
    usuario.lastname = this.fgValidacion.controls["lastname"].value;
    usuario.email = this.fgValidacion.controls["email"].value;
    usuario.phone = this.fgValidacion.controls["phone"].value;
 
    this.usuarioService.store(usuario).subscribe((data: UserModelo)=> {
      Swal.fire('Create succes!', '', 'success')
      this.router.navigate(['/admin/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error ");
    })
  }


}
