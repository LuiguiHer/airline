import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-sign-off',
  templateUrl: './sign-off.component.html',
  styleUrls: ['./sign-off.component.css']
})
export class SignOffComponent implements OnInit {

  constructor(
    private securityService: SecurityService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.securityService.eliminarSesion();
    this.router.navigate(['/index']);
  }

}
