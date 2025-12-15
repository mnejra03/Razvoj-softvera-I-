import {Component, OnInit} from '@angular/core';
import {
  StudentGetByIdEndpointService, StudentGetByIdResponse
} from '../../../../endpoints/student-endpoints/student-get-by-id-endpoint.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {
  SemesterGetByStudentEndpointService,
  SemesterReadResponse
} from '../../../../endpoints/semester-endpoints/semester-get-by-student-endpoint.service';

@Component({
  selector: 'app-student-semesters',
  standalone: false,

  templateUrl: './student-semesters.component.html',
  styleUrl: './student-semesters.component.css'
})
export class StudentSemestersComponent implements OnInit {

  constructor(private studentService: StudentGetByIdEndpointService,
              private route: ActivatedRoute,
              private router: Router,
              private semesterService: SemesterGetByStudentEndpointService) {
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.getStudent(this.studentId);
    this.getSemesters(this.studentId);
  }

  student: StudentGetByIdResponse | null = null;
  studentId: number;
  dataSource : MatTableDataSource<SemesterReadResponse> = new MatTableDataSource<SemesterReadResponse>();
  displayedColumns: string[] = ['id', 'akademskaGodinaDescription', 'godinaStudija', 'obnova', 'datumUpisa', 'recordedByName'];
  semesters:SemesterReadResponse[]=[];

  getStudent(id: number){
    this.studentService.handleAsync(id).subscribe(response=>{
      this.student = response;
    })
  }

  getSemesters(id:number): void {
    this.semesterService.getSemesters(id).subscribe(response=>{
      this.semesters = response;
      this.dataSource = new MatTableDataSource<SemesterReadResponse>(this.semesters);
    })
  }

  newSemester(id: number) {
    this.router.navigate(['/admin/students/semesters/new-semester',id]);
  }
}
