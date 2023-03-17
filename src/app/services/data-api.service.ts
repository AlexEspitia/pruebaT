import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  public api: string = environment.urlApi;
  private  httpHeaders= new  HttpHeaders({'Content-Type':'application/json' });

  constructor(private _http: HttpClient) { }

  public get<T>(endpoint: string) : Observable<T> {
    return this._http.get<T>(`${this.api}${endpoint}`);
  }

  public post<T>(endpoint: string, body: T ): Observable<boolean> {
    return this._http.post<boolean>(`${this.api}${endpoint}`, body, {headers: this.httpHeaders });
  }

  public update<T>(endpoint: string, body: T, id: number): Observable<boolean> {
    return this._http.post<boolean>(`${this.api}${endpoint}/${id}`, body, {headers: this.httpHeaders })
  }

  public delete(endpoint: string, id: number ): Observable<boolean> {
    return this._http.delete<boolean>(`${this.api}${endpoint}/${id}`, {headers: this.httpHeaders });
  }
}
