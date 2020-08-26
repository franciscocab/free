import { Component, OnInit, DoCheck  } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CajaService } from '../../services/caja.service';
import { GiroService } from '../../services/giro.service';
import { EmpresaService } from '../../services/empresa.service';
import { Movimiento } from '../../models/movimiento';
import { Giro } from '../../models/giro';

@Component({
  selector: 'app-giro-new',
  templateUrl: './giro-new.component.html',
  styleUrls: ['./giro-new.component.css'],
  providers: [UserService, GiroService, CajaService, EmpresaService]
})
export class GiroNewComponent implements OnInit {
  public page_title: string;
  public identity;
  public token;
  public status: string;
  public valores;
  public caja;
  public movimiento: Movimiento;
  public giro: Giro;

  constructor(
      private _router: Router,
      private _route: ActivatedRoute,
      private _userService: UserService,
      private _giroService: GiroService,
      private _cajaService: CajaService,
      private _empresaService: EmpresaService
  ) {
    this.page_title = 'Girar';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.giro = new Giro(null, this.identity.sub,null,'');

  }

  ngOnInit(): void {
    this.getAllValores();
    this.getCaja();
  }

    getCaja(){
        this._cajaService.getLastCaja(this.token).subscribe(
            response => {
                if(response.status == 'success'){
                    this.caja = response.caja;
                }
            },
            error => {
                console.log('error');
            }
        )
    }

  getAllValores(){
    this._empresaService.getAllValores().subscribe(
        response => {
          if(response.status == 'success'){
            this.valores = response.valores;

          }
        } ,
        error => {
          console.log(error);
        }
    );
  }

  onSubmit(form){

      this._giroService.create(this.token, this.giro).subscribe(
        response => {
          if(response.status == 'success'){
            this.giro = response.giro;


            this._empresaService.getValor(this.giro.valor_id).subscribe(
                response => {
                  let valor = response.valor.valor_guaranies;

                  this.movimiento = new Movimiento(null, this.caja.id,'Entrada', valor,
                      'Giro', null, this.giro.id);


                  //Guarda el movimiento
                  this._cajaService.createMovimiento(this.token, this.movimiento).subscribe(
                      response => {
                        if(response && response.status){
                          this.status = 'success';
                          form.reset();
                        }
                        else {
                          this.status = 'error';
                        }
                      },
                      error => {
                        this.status = 'error';
                        console.log(<any>error);
                      }
                  );

                },
                error => {
                  this.status = 'error';
                  console.log(<any>error);
                }
            );
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
