import { Component, OnInit } from '@angular/core';
import { UserModelo } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  constructor(private usuarioService: UserService) { }

  listado: UserModelo[] = []

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.usuarioService.getAll().subscribe((data: UserModelo[]) => {
      this.listado = data
      console.log(data)
    })
  }
 
  delete(id?: any){
    console.log(id)
    Swal.fire({
      title: '¿Are you sure?',
      showCancelButton: true,
      confirmButtonText: 'To accept',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.delete(id).subscribe((data: any) => {
          Swal.fire('¡Delete success!', '', 'success')
          this.getAll();
        })
      }
    })
  }
}

