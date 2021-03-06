import { Component, OnInit, DoCheck  } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { RecargaService } from '../../services/recarga.service';
import { MonedaService } from '../../services/moneda.service';
import { EmpresaService } from '../../services/empresa.service';
import { CajaService } from '../../services/caja.service';
import { Recarga } from '../../models/recarga';
import { Movimiento } from '../../models/movimiento';

@Component({
  selector: 'app-recarga-new',
  templateUrl: './recarga-new.component.html',
  styleUrls: ['./recarga-new.component.css'],
  providers: [UserService, RecargaService, MonedaService, EmpresaService, CajaService]
})
export class RecargaNewComponent implements OnInit {
  public page_title: string;
  public identity;
  public token;
  public status: string;
  public recarga: Recarga;
  public empresas;
  public valores;
  public caja;
  public movimiento: Movimiento;
  public valor;

  constructor(
      private _router: Router,
      private _route: ActivatedRoute,
      private _userService: UserService,
      private _recargaService: RecargaService,
      private _monedaService: MonedaService,
      private _empresaService: EmpresaService,
      private _cajaService: CajaService
  ) {
    this.page_title = 'Recargar';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.recarga = new Recarga(null, this.identity.sub,null,null,
        '','');


  }


  ngOnInit(): void {
    this.getEmpresas();
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

  getEmpresas(){
    this._empresaService.getEmpresas().subscribe(
        response => {
          if(response.status == 'success'){
            this.empresas = response.empresas;
          }
        } ,
        error => {
          console.log(error);
        }
    );
  }

  getValores(id){
      this._empresaService.getValores(id).subscribe(
          response => {
              this.valores = response.valores;
              if(this.valores.length == 0){
                  this.recarga.valor_id = null;
              }

          } ,
          error => {
              console.log(error);
          }
      );
  }



  onSubmit(form){
      if(this.recarga.client && this.recarga.empresa_id && this.recarga.valor_id) {

          this._empresaService.getValor(this.recarga.valor_id).subscribe(
              response => {
                  this.valor = response.valor;

                  this._monedaService.updateCotizacion().subscribe(
                      response => {

                          this._monedaService.getMoneda(this.valor.moneda_id).subscribe(
                              response => {
                                  if (response.status == 'success') {
                                      this.recarga.valor_cotizacion = response.moneda.venta;
                                      this.store(form);

                                  }
                              },
                              error => {
                                  console.log('error');
                              }
                          )

                      },
                      error => {
                          console.log('error');
                      }
                  )


              } ,
              error => {
                  console.log(error);
              }
          );
      }
      else{
          this.status = 'error';
      }

  }

    //Guarda recarga y el movimiento
    store(form) {
        this._recargaService.create(this.token, this.recarga).subscribe(
            response => {
                if(response.status == 'success'){
                    this.recarga = response.recarga;

                    let monto = this.valor.valor;
                    let valor_cotizacion = parseInt(this.recarga.valor_cotizacion);

                    let valor_guaranies = monto * valor_cotizacion;
                    let impuesto = (valor_guaranies * this.valor.impuesto) / 100;
                    let valor = valor_guaranies + impuesto;

                    this.movimiento = new Movimiento(null, this.caja.id,'Salida',valor,
                        'Recarga', this.recarga.id,null);

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
