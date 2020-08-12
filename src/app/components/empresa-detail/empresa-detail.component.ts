import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Empresa } from '../../models/empresa';
import { Valor } from '../../models/valor';
import { EmpresaService } from '../../services/empresa.service';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-empresa-detail',
  templateUrl: './empresa-detail.component.html',
  styleUrls: ['./empresa-detail.component.css'],
  providers: [EmpresaService, UserService]
})
export class EmpresaDetailComponent implements OnInit {
  public empresa: Empresa;
  public valores: Array<Valor>;
  public url: string;
  public status;
  public token;
  public valor: Valor;
  public empresaId;

  constructor(
      private _router: Router,
      private _route: ActivatedRoute,
      private _empresaService: EmpresaService,
      private _userService: UserService
  ) {
    this.url = global.url;
    this.token = this._userService.getToken();
    this.valor = new Valor(null,null,'','','');
  }

  ngOnInit() {
      this._route.params.subscribe(params => {
          this.empresaId = +params['id'];

          this.getEmpresa();
          this.getValores();
      });


  }

  getEmpresa(){
      //Toma id de la empresa por parametro
      /*this._route.params.subscribe(params => {
          this.empresaId = +params['id'];*/

          this._empresaService.getEmpresa(this.empresaId).subscribe(
              response => {
                  if(response.status == 'success'){
                      this.empresa = response.empresa;

                      //Se vacia status para que no salga el mensaje de actualizacion de arriba al cambiar
                      //de pagina
                      this.status = '';

                  }
                  else{
                      this._router.navigate(['/inicio']);
                  }
              },
              error => {
                  console.log(error);
              }
          );
      /*});*/

  }

  onSubmit(form){

      this._empresaService.update(this.empresaId, this.empresa).subscribe(
          response => {
            if(response && response.status){
              this.status = 'success';
            }
            else{
              this.status = 'error';
            }

          },
          error => {
            this.status = 'error';
            console.log(<any>error);
          }
      );


  }

  getValores(){
      this._empresaService.getValores(this.empresaId).subscribe(
          response => {
              if(response.status == 'success'){
                  this.valores = response.valores;
              }
          },
          error => {
              console.log(error);
          }
      )
  }

  addValor(form){
      this._empresaService.createValor(this.empresaId, this.valor, this.token).subscribe(
          response => {
              if(response.status == 'success'){
                  form.reset();
                  this.getValores();

              }
              else{
                  console.log('error');
              }
          },
          error => {
              console.log(error);
          }
      );

  }

  deleteValor(id){
      this._empresaService.deleteValor(this.token, id).subscribe(
          response => {
              this.getValores();
              },
          error => {
              console.log(error);
          }
          )
  }



}
