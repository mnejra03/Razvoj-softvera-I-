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
  datumOvjere: Date;
  napomena: string;
  studentId: number;
  student: StudentGetByIdResponse;
  recordedById: number;
  recordedByName: string;
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
}
