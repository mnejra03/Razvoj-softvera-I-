import {Component, OnInit} from '@angular/core';
import {
  StudentGetByIdEndpointService, StudentGetByIdResponse
} from '../../../../endpoints/student-endpoints/student-get-by-id-endpoint.service';
import {ActivatedRoute} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {SemesterReadResponse} from '../../../../endpoints/semester-endpoints/semester-get-by-student-endpoint.service';

@Component({
  selector: 'app-student-semesters',
  standalone: false,

  templateUrl: './student-semesters.component.html',
  styleUrl: './student-semesters.component.css'
})
export class StudentSemestersComponent implements OnInit {

  constructor(private studentService: StudentGetByIdEndpointService,
              private route: ActivatedRoute,) {
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.getStudent(this.studentId);
  }

  student: StudentGetByIdResponse | null = null;
  studentId: number;
  dataSource : MatTableDataSource<SemesterReadResponse> = new MatTableDataSource<SemesterReadResponse>();
  displayedColumns: string[] = ['id', 'akademskaGodinaDescription', 'godinaStudija', 'obnova', 'datumUpisa', 'recordedByName'];

  getStudent(id: number){
    this.studentService.handleAsync(id).subscribe(response=>{
      this.student = response;
    })
  }
}
