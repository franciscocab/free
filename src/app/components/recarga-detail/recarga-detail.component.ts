import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RecargaService } from '../../services/recarga.service';

@Component({
  selector: 'app-recarga-detail',
  templateUrl: './recarga-detail.component.html',
  styleUrls: ['./recarga-detail.component.css'],
  providers: [RecargaService]
})
export class RecargaDetailComponent implements OnInit {
  public recarga;
  public page_title;

  constructor(
      private _router: Router,
      private _route: ActivatedRoute,
      private _recargaService: RecargaService
  ) {
    this.page_title = 'Recarga';
  }

  ngOnInit(): void {
    this.getRecarga();
  }

  getRecarga(){
    this._route.params.subscribe(params => {
      let recargaId = +params['id'];

      this._recargaService.getRecarga(recargaId).subscribe(
          response => {
            if(response.status == 'success'){
              this.recarga= response.recarga;
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
