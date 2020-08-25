import { Component, OnInit } from '@angular/core';
import { CajaService } from '../../services/caja.service';
import { UserService } from '../../services/user.service';
import { Movimiento } from '../../models/movimiento';
import { Caja } from '../../models/caja';
import { global } from '../../services/global';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css'],
  providers: [CajaService, UserService]
})
export class CajaComponent implements OnInit {
  public page_title: string;
  public url;
  public identity;
  public token;
  public caja: Caja;
  public status;
  public movimiento: Movimiento;
  public movimientos;
  public mbc;
  public valor_actual = 0;


  //Configuracion de paginacion
  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
    previousLabel: 'Anterior',
    nextLabel: 'Siguiente',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
  };
  config: any;

  tipos = ['Entrada','Salida'];

  constructor(
      private _userService: UserService,
      private _cajaService: CajaService
  ) {
    this.page_title = 'Caja';
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

  }

  ngOnInit(): void {
      this.movimiento = new Movimiento(null, null,'Entrada',0,
          '', null, null);
      this.getCaja();
      this.getMovimientos();

  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  getCaja(){
    this._cajaService.getLastCaja(this.token).subscribe(
        response => {
          if(response.status == 'success'){
            this.caja = response.caja;
            this.getMovimientosByCaja();
          }
        },
        error => {
          console.log('error');
        }
    )
  }

  cerrarCaja(){
    this.caja.monto_cierre = this.valor_actual;

    this._cajaService.update(this.caja.id, this.caja, this.token).subscribe(
        response => {
          if(response && response.status){
            this.status = 'success';
            this.valor_actual = 0;
            this.getCaja();
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

  abrirCaja(){
    this._cajaService.create(this.token).subscribe(
        response => {
          if(response && response.status){
            this.status = 'success';
            this.getCaja();
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

  getMovimientos(){
      this._cajaService.getMovimientos(this.token).subscribe(
          response => {
              if(response.status == 'success'){
                  this.movimientos = response.movimientos;

                  this.config = {
                      itemsPerPage: 15,
                      currentPage: 1,
                      totalItems: this.movimientos.length
                  };
              }
              },
          error => {
              console.log('error');
          }
          )
  }

    onSubmit(form){
      this.movimiento.caja_id = this.caja.id;
      this._cajaService.createMovimiento(this.token, this.movimiento).subscribe(
            response => {
                if(response && response.status){
                    this.status = 'success';
                    /*form.controls['valor'].reset();*/
                    this.ngOnInit();
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

    getMovimientosByCaja(){
      if(this.caja){
          this._cajaService.getMovimientosByCaja(this.token, this.caja.id).subscribe(
              response => {
                  if(response.status == 'success'){
                      this.mbc = response.movimientos;
                      this.montoSumado(this.mbc);
                  }
              },
              error => {
                  console.log('error');
              }
          )
      }
    }

    montoSumado(mbc){
      let sumador = 0;
      for(let i = 0; i < mbc.length; i++){
          if(mbc[i].tipo == 'Entrada'){
              sumador = sumador + mbc[i].valor;
          }
          else{
              sumador = sumador - mbc[i].valor;
          }
      }
      this.valor_actual = sumador + this.caja.monto_apertura;
    }


}
