import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService, UserService]
})
export class PostDetailComponent implements OnInit {
  public post: Post;
  public identity;

  constructor(
      private _router: Router,
      private _route: ActivatedRoute,
      private _postService: PostService,
      private _userService: UserService

  ) {
      this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    this.getPost();
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

}
