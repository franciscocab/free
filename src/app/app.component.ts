//OnInit se ejecuta el componente cuando se carga algo nuevo
//DoCheck Permite cada tiempo realizar una actualizacion si hay un cambio
import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { CategoryService } from './services/category.service';
import { EmpresaService } from './services/empresa.service';
import { global } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, CategoryService, EmpresaService]
})
export class AppComponent implements OnInit, DoCheck{
  public title = 'Free';
  public identity;
  public token;
  public url;
  public categories;
  public empresas;

  constructor(
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _empresaService: EmpresaService
  ){
    this.loadUser();
  }

  ngOnInit(): void {
    /*this.getCategories();*/
    this.getEmpresas();
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

  /*getCategories(){
    this._categoryService.getCategories().subscribe(
        response => {
          if(response.status == 'success'){
            this.categories = response.categories;

          }
        },
        error => {
          console.log('error');
        }
    )
  }*/

}
