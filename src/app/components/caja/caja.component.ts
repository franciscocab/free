import { Component, OnInit } from '@angular/core';
import { CajaService } from '../../services/caja.service';
import { UserService } from '../../services/user.service';
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
      private _cajaService: CajaService
  ) {
    this.page_title = 'Caja';
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.getCaja();
  }

  /*pageChanged(event){
    this.config.currentPage = event;
  }*/

  //Va en getMovimientos
  /*this.config = {
    itemsPerPage: 15,
    currentPage: 1,
    totalItems: this.recargas.length
  };*/


  getCaja(){
    this._cajaService.getCaja(this.token).subscribe(
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
}
