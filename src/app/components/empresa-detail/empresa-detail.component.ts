import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Empresa } from '../../models/empresa';
import { EmpresaService } from '../../services/empresa.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-empresa-detail',
  templateUrl: './empresa-detail.component.html',
  styleUrls: ['./empresa-detail.component.css'],
  providers: [EmpresaService]
})
export class EmpresaDetailComponent implements OnInit {
  public empresa: Empresa;
  public posts: any;
  public url: string;
  public status;

  constructor(
      private _router: Router,
      private _route: ActivatedRoute,
      private _empresaService: EmpresaService
  ) {
    this.url = global.url;

  }

  ngOnInit(): void {
      this.getEmpresa();
  }

  getEmpresa(){
    this._route.params.subscribe(params => {
      let id = +params['id'];

      this._empresaService.getEmpresa(id).subscribe(
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

    });
  }

  onSubmit(form){

      this._empresaService.update(this.empresa.id, this.empresa).subscribe(
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

  /*deleteEmpresa(id){
    this._postService.delete(this.token, id).subscribe(
        response => {
          this.getPostsByCategory();
        },
        error => {
          console.log(error);
        }
    )
  }*/

}
