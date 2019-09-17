import { Component, OnInit } from '@angular/core';
import { PoPageLogin } from '@portinari/portinari-templates';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-de-login',
  templateUrl: './pagina-de-login.component.html',
  styleUrls: ['./pagina-de-login.component.css']
})
export class PaginaDeLoginComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }

  efetuarLogin(formData: PoPageLogin) {
    if (formData.login == 'admin' && formData.password == 'admin') {
      this.router.navigate(['tela-inicial']);
    }
  }

}
