import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class EmpresaService {
    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = global.url;
    }

    create(token, empresa):Observable<any>{
        let json = JSON.stringify(empresa);
        let params = "json="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.post(this.url + 'empresa', params, {headers: headers});

    }

    getEmpresas():Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'empresa', {headers: headers});

    }

    getEmpresa(id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url + 'empresa/'+ id, {headers: headers});

    }

    update(id, empresa, token): Observable<any>{
        let json = JSON.stringify(empresa);
        let params = 'json='+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.put(this.url+'empresa/'+ id, params, {headers: headers})

    }

    getValores(id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'empresa/valores/'+ id, {headers: headers});
    }

    createValor(id, valor, token):Observable<any>{
        let json = JSON.stringify(valor);
        let params = "json="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.post(this.url + 'empresa/valor/'+ id, params, {headers: headers});

    }

    deleteValor(token, id): Observable<any>{

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.delete(this.url + 'empresa/valor/'+ id, {headers: headers});
    }

    getValor(id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'empresa/valor/'+ id, {headers: headers});
    }

    getAllValores():Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'valores', {headers: headers});
    }

}
