import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../models/empresa';
import { global } from './global';

@Injectable()
export class EmpresaService {
    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = global.url;
    }

    create(token, category):Observable<any>{
        let json = JSON.stringify(category);
        let params = "json="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.post(this.url + 'empresa', params, {headers: headers});

    }

    getEmpresas():Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')

        return this._http.get(this.url + 'empresa', {headers: headers});

    }

    getEmpresa(id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url + 'empresa/'+ id, {headers: headers});

    }

    update(id, empresa): Observable<any>{
        let json = JSON.stringify(empresa);
        let params = 'json='+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.put(this.url+'empresa/'+ id, params, {headers: headers})

    }

    /*getPosts(id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'post/category/'+ id, {headers: headers});
    }*/

}
