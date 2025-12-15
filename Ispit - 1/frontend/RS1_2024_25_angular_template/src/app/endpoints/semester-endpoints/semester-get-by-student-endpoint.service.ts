import { Injectable } from '@angular/core';
import {StudentGetByIdResponse} from '../student-endpoints/student-get-by-id-endpoint.service';
import {HttpClient} from '@angular/common/http';
import {MyConfig} from '../../my-config';

export interface SemesterReadResponse{
  id: number;
  datumUpisa: Date;
  godinaStudija: number;
  akademskaGodinaId: number;
  akademskaGodinaStartDate: Date;
  akademskaGodinaDescription: string;
  cijenaSkolarine: string;
  obnova: boolean;
  studentId: number;
  student: StudentGetByIdResponse;
  recordedById: number;
  recordedByName: string;
}

export interface SemesterRequest{
  studentId: number;
  datumUpisa: Date;
  godinaStudija: number;
  akademskaGodinaId: number;
  recordedById: number;
  obnova: boolean;
  cijenaSkolarine: number;
}

@Injectable({
  providedIn: 'root'
})
export class SemesterGetByStudentEndpointService {

  constructor(private httpClient: HttpClient) {}

  private apiUrl = `${MyConfig.api_address}/semesters/getByStudent`;

  getSemesters(id: number){
    return this.httpClient.get<SemesterReadResponse[]>(`${this.apiUrl}/${id}`);
  }

  createSemester(request: any){
    return this.httpClient.post(`${this.apiUrl}/create`, request);
  }
}
