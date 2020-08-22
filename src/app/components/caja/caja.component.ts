import { Component, OnInit } from '@angular/core';
import { CajaService } from '../../services/caja.service';
import { UserService } from '../../services/user.service';
import { Movimiento } from '../../models/movimiento';
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
  public caja;
  public status;
  public movimiento: Movimiento;
  public movimientos;


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

  tipos=['Entrada','Salida'];

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
      this.movimiento = new Movimiento(null, null,'Entrada',null,
          '', null);
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

          }
        },
        error => {
          console.log('error');
        }
    )
  }

  cerrarCaja(){
    this._cajaService.update(this.caja.id, this.caja, this.token).subscribe(
        response => {
          if(response && response.status){
            this.status = 'success';
            localStorage.removeItem('caja');
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
            localStorage.setItem('caja', JSON.stringify(response));
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
                    form.controls['valor'].reset();
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


}
