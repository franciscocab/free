import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MonedaService } from '../../services/moneda.service';
import { Moneda } from '../../models/moneda';

@Component({
  selector: 'app-moneda-detail',
  templateUrl: '../moneda-new/moneda-new.component.html',
  styleUrls: ['./moneda-detail.component.css']
})
export class MonedaDetailComponent implements OnInit {
    public page_title: string;
    public identity;
    public token;
    public status: string;
    public moneda: Moneda;
    public is_edit: boolean;

  constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService,
      private _monedaService: MonedaService
  ) {
      this.page_title = "Datos de moneda";
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.is_edit = true;
  }

  ngOnInit(): void {
      this.moneda = new Moneda(1,'','','');
      this.getMoneda();
  }

    getMoneda(){
        //Sacar el id del post de la url
        this._route.params.subscribe(params => {
            //Se agrega '+' para convertirlo a entero
            let id = +params['id'];

            this._monedaService.getMoneda(id).subscribe(
                response => {
                    if(response.status == 'success'){
                        this.moneda = response.moneda;

                    }
                    else {
                        this._router.navigate(['/inicio']);
                    }
                },
                error => {
                    console.log(error);
                    this._router.navigate(['/inicio']);
                }
            );

        });

        //Peticion ajax para sacar los datos
    }

  onSubmit(form){
    this._monedaService.update(this.moneda.id, this.moneda, this.token).subscribe(
        response => {
          if(response.status == 'success'){
            /*this.moneda = response.moneda;*/
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

}
