import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';
import { RecargaService } from '../../services/recarga.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService, RecargaService]
})
export class HomeComponent implements OnInit {
  public page_title: string;
  public url;
  public identity;
  public token;
  public recargas;

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
      private _recargaService: RecargaService
  ) {
    this.page_title = 'Recargas';
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

  }

  ngOnInit(): void {
    this.getRecargas();

  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  getRecargas(){
    this._recargaService.getRecargas(this.token).subscribe(
        response => {
          if(response.status == 'success'){
            this.recargas = response.recargas;
            this.config = {
              itemsPerPage: 15,
              currentPage: 1,
              totalItems: this.recargas.length
            };

          }
        },
        error => {
          console.log('error');
        }
    )
  }




}
