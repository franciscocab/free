import { Component, OnInit } from '@angular/core';
import { MonedaService } from '../../services/moneda.service';
import { Moneda } from '../../models/moneda';


@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css'],
  providers: [MonedaService]
})
export class CotizacionComponent implements OnInit {
  public monedas: Array<Moneda>;
  public page_title: string;

  constructor(
      private _monedaService: MonedaService
  ) {
    this.page_title = 'Cotizaciones';
  }

  ngOnInit(): void {
    this.getCotizacion();

  }

  getCotizacion(){
    this._monedaService.getCotizacion().subscribe(
        response => {
            this.getMonedas();
        },
        error => {
          console.log('error');
        }
    )  }

  getMonedas(){
    this._monedaService.getMonedas().subscribe(
        response => {
          if(response.status == 'success'){
            this.monedas = response.monedas;
          }
        },
        error => {
          console.log('error');
        }
    )
  }
}
