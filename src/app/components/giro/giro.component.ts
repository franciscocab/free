import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { GiroService } from '../../services/giro.service';
import { global } from '../../services/global';


@Component({
  selector: 'app-giro',
  templateUrl: './giro.component.html',
  styleUrls: ['./giro.component.css'],
  providers: [UserService, GiroService]
})
export class GiroComponent implements OnInit {
  public page_title: string;
  public url;
  public identity;
  public token;
  public giros;
  public searchText: string;

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
      private _giroService: GiroService
  ) {
    this.page_title = 'Giros';
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.getGiros();
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  getGiros(){
    this._giroService.getGiros(this.token).subscribe(
        response => {
          if(response.status == 'success'){
            this.giros = response.giros;

            this.config = {
              itemsPerPage: 15,
              currentPage: 1,
              totalItems: this.giros.length
            };

          }
        },
        error => {
          console.log('error');
        }
    )
  }

}
