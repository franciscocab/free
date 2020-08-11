import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { EmpresaService } from '../../services/empresa.service';
import { Empresa } from '../../models/empresa';

@Component({
  selector: 'app-empresa-new',
  templateUrl: './empresa-new.component.html',
  styleUrls: ['./empresa-new.component.css'],
  providers: [UserService, EmpresaService]
})
export class EmpresaNewComponent implements OnInit {
  public page_title: string;
  public identity;
  public token;
  public status: string;
  public empresa: Empresa;

  constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService,
      private _empresaService: EmpresaService
  ) {
    this.page_title = "Crear nueva empresa";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.empresa = new Empresa(1,'','');
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    this._empresaService.create(this.token, this.empresa).subscribe(
        response => {
          if(response.status == 'success'){
            this.empresa = response.empresa;
            this.status = 'success';

            this._router.navigate(['/inicio']);
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
