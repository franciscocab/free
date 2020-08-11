import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {

  public page_title: string;
  public user: User;
  public identity;
  public token;
  public status;
  public url;
  public resetVar = true;

  public froala_options: Object = {
    placeholderText: 'Escribe una biografía',
    charCounterCount: true,
    language: 'es',
    toolbarButtons:   ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat'],
  };


  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: "50",
    uploadAPI:  {
      url: global.url+"user/upload",
      method:"POST",
      headers: {
        "Authorization" : this._userService.getToken()
      },
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: true,
    fileNameIndex: true,
    replaceTexts: {
      attachPinBtn: 'Sube tu avatar',
    }
  };

  constructor(
      private _userService: UserService

  ) {
    this.page_title = 'Ajustes de usuario';
    this.token = this._userService.getToken();
    this.url = global.url;

  }

  ngOnInit(): void {

    this.identity = this._userService.getIdentity();

    //Rellenar objeto usuario
    this.user = new User(
        this.identity.sub,
        this.identity.name,
        this.identity.surname,
        '',
        this.identity.email,
        '',
        this.identity.description,
        this.identity.image
    );
  }

  onSubmit(form){
    this._userService.update(this.token, this.user).subscribe(
        response => {
          if(response && response.status){
            this.status = 'success';


            //Actualizar usuario en sesion
            //Se actualizado los datos actuales en la pagina de ajustes
            if(response.changes.name){
              this.user.name = response.changes.name;
            }
            if(response.changes.surname){
              this.user.surname = response.changes.surname;
            }
            if(response.changes.email){
              this.user.email = response.changes.email;
            }
            if(response.changes.description){
              this.user.description = response.changes.description;
            }
            if(response.changes.image){
              this.user.image = response.changes.image;
            }

            this.identity = this.user;

            //El objeto identity no lleva el campo "id"
            //Se pasa a eliminarlo y agregando el campo "sub", que si existe de forma predeterminada
            this.identity.sub = this.user.id;
            delete this.identity.id;

            localStorage.setItem('identity', JSON.stringify(this.identity));

            //Recarga porque no permanece en la misma vista
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

  avatarUpload(datos){

    /*
    En el curso devuelve response, pero por tener angular-file-uploader mas
    actualizado devuelve body. Por eso el cambio
    let data = JSON.parse(datos.response);
    this.user.image = data.image;
    */


    //Devuelve objeto datos, donde lo que se necesita es datos.body.image
    let data = datos.body;
    this.user.image = data.image;

  }

}
