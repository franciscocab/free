import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class CajaService {
    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = global.url;
    }

    create(token):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.post(this.url + 'caja', {headers: headers});

    }

    getCajas(token):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.get(this.url + 'cajas', {headers: headers});

    }

    getLastCaja(token):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.get(this.url + 'caja-last', {headers: headers});

    }

    getCaja(token, id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.get(this.url + 'caja/'+ id, {headers: headers});

    }

    //Actualiza el estado de la caja (abierta o cerrada)
    update(id, caja, token): Observable<any>{
        let json = JSON.stringify(caja);
        let params = 'json='+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.put(this.url + 'caja/'+ id, params, {headers: headers})

    }

    getMovimientos(token):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.get(this.url + 'movimientos', {headers: headers});

    }

    createMovimiento(token, movimiento):Observable<any>{
        let json = JSON.stringify(movimiento);
        let params = "json="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.post(this.url + 'movimiento/store', params, {headers: headers});

    }

    getLastMovimiento(token):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.get(this.url + 'movimiento/last', {headers: headers});

    }




}
