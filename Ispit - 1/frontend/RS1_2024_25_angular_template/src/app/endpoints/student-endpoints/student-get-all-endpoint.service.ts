import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MyPagedRequest} from '../../helper/my-paged-request';
import {MyConfig} from '../../my-config';
import {buildHttpParams} from '../../helper/http-params.helper';
import {MyBaseEndpointAsync} from '../../helper/my-base-endpoint-async.interface';
import {MyPagedList} from '../../helper/my-paged-list';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';

// DTO za zahtjev
export interface StudentGetAllRequest extends MyPagedRequest {
  q?: string; // Upit za pretragu (ime, prezime, broj indeksa, itd.)
}

// DTO za odgovor
export interface StudentGetAllResponse {
  id: number;
  firstName: string;
  lastName: string;
  studentNumber: string;
  citizenship?: string; // Državljanstvo
  birthMunicipality?: string; // Općina rođenja
}

@Injectable({
  providedIn: 'root',
})
export class StudentGetAllEndpointService
  implements MyBaseEndpointAsync<StudentGetAllRequest, MyPagedList<StudentGetAllResponse>> {
  private apiUrl = `${MyConfig.api_address}/students/filter`;

  constructor(private httpClient: HttpClient) {
  }

  private cache = new Map<string, {timestamp: number, data:MyPagedList<StudentGetAllResponse>}>();
  private cacheDuration = 30000;

  handleAsync(request: StudentGetAllRequest):Observable<MyPagedList<StudentGetAllResponse>> {
    const params = buildHttpParams(request);
    const cacheKey = params.toString();
    const now = Date.now();
    const cached = this.cache.get(cacheKey);

    if(cached && now - cached.timestamp < this.cacheDuration) {
      return of(cached.data);
    }

    return this.httpClient.get<MyPagedList<StudentGetAllResponse>>(this.apiUrl, {params}).pipe(
      tap((response) => {
        this.cache.set(cacheKey, {timestamp:now,data:response});
      })
    )
  }
}
