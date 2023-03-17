import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Request } from 'src/app/models/request.model';
import { DataApiService } from 'src/app/services/data-api.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private _endpoint: string = 'Request';

  constructor(private _dataApi: DataApiService) { }

  public getRequest(): Observable<Request[]> {
    return this._dataApi.get<Request[]>(this._endpoint);
  }

  public createRequest(body: Request): Observable<boolean> {
    return this._dataApi.post<Request>(this._endpoint, body);
  }

  public updateRequest(body: Request, id: number): Observable<boolean> {
    return this._dataApi.update<Request>(this._endpoint, body, id);
  }

  public deleteRequest(id: number): Observable<boolean>{
    return this._dataApi.delete(this._endpoint, id);
  }
}
