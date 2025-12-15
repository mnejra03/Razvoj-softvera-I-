import {Component, OnInit} from '@angular/core';
import {
  StudentGetByIdEndpointService,
  StudentGetByIdResponse
} from '../../../../../endpoints/student-endpoints/student-get-by-id-endpoint.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {
  AcademicYear,
  AcademicYearEndpointService
} from '../../../../../endpoints/academic-year-endpoints/academic-year-endpoint.service';
import {
  SemesterGetByStudentEndpointService, SemesterReadResponse, SemesterRequest
} from '../../../../../endpoints/semester-endpoints/semester-get-by-student-endpoint.service';

@Component({
  selector: 'app-student-semesters-new',
  standalone: false,

  templateUrl: './student-semesters-new.component.html',
  styleUrl: './student-semesters-new.component.css'
})
export class StudentSemestersNewComponent implements OnInit {

  student : StudentGetByIdResponse|null=null;
  semesterForm: FormGroup;
  akademskeGodine: AcademicYear[] = [];
  studentId:number;
  semesters: SemesterReadResponse[]=[];

  constructor(private route: ActivatedRoute,
              private frmBuilder: FormBuilder,
              private router: Router,
              private akademskaGodinaService: AcademicYearEndpointService,
              private semesterService: SemesterGetByStudentEndpointService,
              private studentService: StudentGetByIdEndpointService) {
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));
    this.semesterForm = this.frmBuilder.group({
      datumUpisa : [' '],
      godinaStudija: [' '],
      akademskaGodina: [' '],
      cijenaSkolarine: [1800],
      obnova: [false]
    })
  }

  ngOnInit() {
    this.getSemesters(this.studentId);
    this.getStudents(this.studentId);
    this.getAkademskeGodine();

    this.semesterForm.get('godinaaStudija')?.valueChanges.subscribe(value => {
      let exists = false;

      for(let i = 0; i < this.semesters.length; i++) {
        if(this.semesters[i].godinaStudija === Number(value)){
          exists = true; break;
        }
      }

      if(exists)this.semesterForm.get('obnova')?.setValue(true);
      else this.semesterForm.get('obnova')?.setValue(false);
    })

    this.semesterForm.get('obnova')?.valueChanges.subscribe((checked : boolean) => {
      this.semesterForm.patchValue({cijenaSkolarine : checked ? 400 : 1800});
    });

    this.semesterForm.get('cijenaSkolarine')?.disable();
    this.semesterForm.get('obnova')?.disable();
  }

  getSemesters(id:number) {
    this.semesterService.getSemesters(id).subscribe(response => {
      this.semesters = response;
    })
  }
  getStudents(id:number) {
    this.studentService.handleAsync(id).subscribe(response => {
      this.student = response;
    })
  }
  getAkademskeGodine(){
    this.akademskaGodinaService.getAll().subscribe(response =>
    this.akademskeGodine = response);
  }

  saveSemester(){
    if(this.semesterForm.invalid)return;

    const semesterData : SemesterRequest = {
      studentId: this.studentId,
      recordedById: 1,
      datumUpisa: this.semesterForm.value.datumUpisa,
      godinaStudija: Number(this.semesterForm.value.godinaStudija),
      akademskaGodinaId: this.semesterForm.value.akademskaGodina,
      cijenaSkolarine: this.semesterForm.getRawValue().cijenaSkolarine,
      obnova: this.semesterForm.getRawValue().obnova
    };

    this.semesterService.createSemester(semesterData).subscribe({
      next:()  => {
        this.router.navigate(['/admin/students/semesters',this.studentId]);
      },
      error: (err) => {
        console.error("Error saving semester");
        alert(err.error);
      }
    })
  }

  goBack(id:number){
    this.router.navigate(['/admin/students/semesters/',id]);
  }

}
