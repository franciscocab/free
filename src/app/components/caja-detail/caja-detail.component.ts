import { Component, OnInit } from '@angular/core';
import { CajaService } from '../../services/caja.service';
import { UserService } from '../../services/user.service';
import { Movimiento } from '../../models/movimiento';
import { Caja } from '../../models/caja';
import { global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-caja-detail',
  templateUrl: './caja-detail.component.html',
  styleUrls: ['./caja-detail.component.css'],
  providers: [CajaService, UserService]
})
export class CajaDetailComponent implements OnInit {
  public page_title: string;
  public url;
  public identity;
  public token;
  public caja: Caja;
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

  constructor(
      private _userService: UserService,
      private _cajaService: CajaService,
      private _router: Router,
      private _route: ActivatedRoute
  ) {
    this.page_title = 'Caja';
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

  }

  ngOnInit(): void {
    this.getCaja();
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  getCaja(){
    this._route.params.subscribe(params => {
      let id = +params['id'];

      this._cajaService.getCaja(this.token, id).subscribe(
          response => {
            if(response.status == 'success'){
              this.caja = response.caja;
              this.getMovimientos(this.caja.id);
            }
          },
          error => {
            console.log('error');
          }
      )
    })

  }


  getMovimientos(id){
    this._cajaService.getMovimientosByCaja(this.token, id).subscribe(
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

}
