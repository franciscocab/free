import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GiroService } from '../../services/giro.service';

@Component({
  selector: 'app-giro-detail',
  templateUrl: './giro-detail.component.html',
  styleUrls: ['./giro-detail.component.css'],
  providers: [GiroService]
})
export class GiroDetailComponent implements OnInit {
  public giro;
  public page_title;

  constructor(
      private _router: Router,
      private _route: ActivatedRoute,
      private _giroService: GiroService
  ) {
    this.page_title = 'Giro';
  }

  ngOnInit(): void {
    this.getGiro();
  }

  getGiro(){
    this._route.params.subscribe(params => {
      let giroId = +params['id'];

      this._giroService.getGiro(giroId).subscribe(
          response => {
            if(response.status == 'success'){
              this.giro = response.giro;
            }
            else{
              this._router.navigate(['/inicio']);
            }
          },
          error => {
            console.log(error);
          }
      );

    });

  }

}
