import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { global } from '../../services/global';

@Component({
  selector: 'app-post-edit',
  templateUrl: '../post-new/post-new.component.html',//Se carga el mismo template html de new-component
  providers: [ UserService, CategoryService, PostService ]
})
export class PostEditComponent implements OnInit {
  public page_title: string;
  public identity;
  public token;
  public status: string;
  public post: Post;
  public categories;
  public resetVar = true;
  public is_edit: boolean;
  public url: string;

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
      url: global.url+"post/upload",
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
      private _userService: UserService,
      private _categoryService: CategoryService,
      private _postService: PostService,
      private _router: Router,
      private _route: ActivatedRoute
  ) {
    this.page_title = 'Editar entrada';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.is_edit = true;
    this.url = global.url;
  }

  ngOnInit(): void {
    //Por defecto
    this.post = new Post(1,this.identity.sub,1,'','',null,null);
    this.getPost();
    this.getCategories();

  }

  getPost(){
    //Sacar el id del post de la url
    this._route.params.subscribe(params => {
      //Se agrega '+' para convertirlo a entero
      let id = +params['id'];

      this._postService.getPost(id).subscribe(
          response => {
            if(response.status == 'success'){
              this.post = response.posts;

              //Solo pueda editar su propio post
              if(this.post.user_id != this.identity.sub){
                this._router.navigate(['/inicio']);
              }

            }
            else {
              this._router.navigate(['/inicio']);
            }
          },
          error => {
            console.log(error);
            this._router.navigate(['/inicio']);
          }
      );

    });

    //Peticion ajax para sacar los datos
  }

  getCategories(){
    this._categoryService.getCategories().subscribe(
        response => {
          if(response.status == 'success'){
            this.categories = response.categories;

          }
        } ,
        error => {
          console.log(error);
        }
    );
  }

  imageUpload(data){
    /*
    En el curso devuelve response, pero por tener angular-file-uploader mas
    actualizado devuelve body. Por eso el cambio
    let data = JSON.parse(datos.response);
    this.user.image = data.image;
    */

    //Devuelve objeto datos, donde lo que se necesita es data.body.image
    let image_data = data.body;
    this.post.image = image_data.image;

  }

  onSubmit(form){
    this._postService.update(this.token, this.post, this.post.id).subscribe(
        response => {
          if(response.status == 'success'){
            this.status = 'success';
            //this.post = response.post;
            //redirigir a la pagina del post
            this._router.navigate(['/entrada', this.post.id]);
          }
          else {
            this.status = 'error';
          }
        },
        error => {
          console.log(error);
          this.status = 'error';
        }
    )
  }

}
