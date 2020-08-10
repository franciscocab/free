import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { global } from '../../services/global';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [ UserService, CategoryService, PostService ]
})
export class PostNewComponent implements OnInit {
  public page_title: string;
  public identity;
  public token;
  public status: string;
  public post: Post;
  public categories;
  public resetVar = true;
  public is_edit: boolean;


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
    this.page_title = 'Crear una entrada';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    //Por defecto
    this.post = new Post(1,this.identity.sub,1,'','',null,null);

    this.getCategories();

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
    this._postService.create(this.token, this.post).subscribe(
      response => {
        if(response.status == 'success'){
          this.post = response.post;
          this.status = 'success';
          this._router.navigate(['/inicio']);
        }
        else{
          this.status = 'error';
        }
      },
      error => {
        console.log(error);
        this.status = 'error';
      }
    );
  }

}
