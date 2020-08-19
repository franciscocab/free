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

    getCaja(token):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.get(this.url + 'caja', {headers: headers});

    }




}
