import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MonedaService } from '../../services/moneda.service';
import { Moneda } from '../../models/moneda';

@Component({
  selector: 'app-moneda-new',
  templateUrl: './moneda-new.component.html',
  styleUrls: ['./moneda-new.component.css'],
  providers: [UserService, MonedaService]
})
export class MonedaNewComponent implements OnInit {
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
    this.page_title = "Crear nueva moneda";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.moneda = new Moneda(1,'','','');

  }

  ngOnInit(): void {
  }

  onSubmit(form){
    this._monedaService.create(this.token, this.moneda).subscribe(
        response => {
          if(response.status == 'success'){
            this.moneda = response.moneda;
            this.status = 'success';
            form.reset();
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
