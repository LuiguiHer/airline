import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as cryptoJS from 'crypto-js';
import { SecurityService } from 'src/app/services/security.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  fgValidacion = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    clave: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private securityService: SecurityService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  identificarUsuario() {
    let usuario = this.fgValidacion.controls["correo"].value;
    let clave = this.fgValidacion.controls["clave"].value;
    let claveCifrada = cryptoJS.MD5(clave).toString();
 
    this.securityService.login(usuario, claveCifrada).subscribe(
      (data: any) => {
        this.securityService.almacenarSesion(data)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Bienvenido',
          showConfirmButton: false,
          timer: 1500
        }).then(() =>{
          this.router.navigate(['/index']);
        });
      },
      (error: any) => {
        console.log(error)
        Swal.fire({
          title: 'Error!',
          text: 'Datos invalidos',
          icon: 'error',
          confirmButtonText: 'Cool'
        });
      }
      );
    }

}
