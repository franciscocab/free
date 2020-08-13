//OnInit se ejecuta el componente cuando se carga algo nuevo
//DoCheck Permite cada tiempo realizar una actualizacion si hay un cambio
import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { EmpresaService } from './services/empresa.service';
import { MonedaService } from './services/moneda.service';
import { global } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, EmpresaService, MonedaService]
})
export class AppComponent implements OnInit, DoCheck{
  public title = 'Free';
  public identity;
  public token;
  public url;
  public empresas;
  public monedas;

  constructor(
    private _userService: UserService,
    private _empresaService: EmpresaService,
    private _monedaService: MonedaService
  ){
    this.loadUser();
  }

  ngOnInit(): void {
    this.getEmpresas();
    this.getMonedas();
  }

  ngDoCheck(): void {
    this.loadUser();
    this.url = global.url;

  }

  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  getEmpresas(){
    this._empresaService.getEmpresas().subscribe(
        response => {
          if(response.status == 'success'){
            this.empresas = response.empresas;

          }
        },
        error => {
          console.log('error');
        }
    )
  }

  getMonedas(){
    this._monedaService.getMonedas().subscribe(
        response => {
          if(response.status == 'success'){
            this.monedas = response.monedas;
          }
        },
        error => {
          console.log('error');
        }
    )
  }

}
