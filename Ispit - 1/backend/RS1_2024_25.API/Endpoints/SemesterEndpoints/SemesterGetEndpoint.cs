using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RS1_2024_25.API.Data;
using RS1_2024_25.API.Data.Models.SharedTables;
using RS1_2024_25.API.Data.Models.TenantSpecificTables.Modul1_Auth;
using RS1_2024_25.API.Data.Models.TenantSpecificTables.Modul2_Basic;


namespace RS1_2024_25.API.Endpoints.SemesterEndpoints
{
    [Route("semesters/getByStudent")]
    [ApiController]
    public class SemesterGetEndpoint(ApplicationDbContext db, IHttpContextAccessor httpContextAccessor) : ControllerBase
    {
        [HttpGet("{id}")]
        public async Task<ActionResult> GetSemestersByStudent(int id, CancellationToken cancellationToken = default)
        {
            var semesters = await db.SemestersAll.Include(x => x.Student)
                                                 .Include(x => x.RecordedBy)
                                                 .Include(x => x.AkademskaGodina)
                                                 .Where(x => x.StudentId == id)
                                                 .Select(x => new SemesterResponse
                                                 {
                                                     Id = x.Id,
                                                     DatumUpisa = x.DatumUpisa.ToString("yyyy-MM-dd"),
                                                     GodinaStudija = x.GodinaStudija,
                                                     AkademskaGodinaId = x.AkademskaGodinaId,
                                                     AkademskaGodinaStartDate = x.AkademskaGodina.StartDate,
                                                     AkademskaGodinaDescription = x.AkademskaGodina.Description.Substring(x.AkademskaGodina.Description.LastIndexOf(' ') + 1),
                                                     CijenaSkolarine = x.CijenaSkolarine,
                                                     Obnova = x.Obnova,
                                                     
                                                     Student = x.Student,
                                                     StudentId = x.StudentId,
                                                     RecordedById = x.RecordedById,
                                                     RecordedByName = x.RecordedBy.FirstName + " " + x.RecordedBy.LastName
                                                 }).ToListAsync(cancellationToken);
            return Ok(semesters);
        }

        [HttpPost("create")]
        public async Task<ActionResult> CreateSemester([FromBody] SemesterRequest request, CancellationToken cancellationToken = default)
        {
            if (request == null) return BadRequest("Request body is empty.");

            var semester = new Semester
            {
                StudentId = request.StudentId,
                DatumUpisa = request.DatumUpisa,
                GodinaStudija = request.GodinaStudija,
                AkademskaGodinaId = request.AkademskaGodinaId,
                CijenaSkolarine = request.CijenaSkolarine,
                Obnova = request.Obnova,
                RecordedById = 1
            };

            db.SemestersAll.Add(semester);
            await db.SaveChangesAsync(cancellationToken);

            return Ok(semester);
        }

        public class SemesterResponse
        {
            public required int Id { get; set; }
            public required string DatumUpisa { get; set; }//
            public required int GodinaStudija { get; set; }//
            public required int AkademskaGodinaId { get; set; }//
            public AcademicYear? AkademskaGodina {  get; set; }
            public DateOnly AkademskaGodinaStartDate { get; set; }
            public string AkademskaGodinaDescription { get; set; }
            public required float CijenaSkolarine { get; set; }//
            public required bool Obnova {  get; set; }//
            public required int StudentId { get; set; }//
            public Student? Student {  get; set; }
            public required int RecordedById { get; set; }//
            public MyAppUser? RecordedBy { get; set; }
            public string RecordedByName { get; set; }
        }
        public class SemesterRequest
        {
            public required int StudentId { get; set; }
            public required int RecordedById { get; set; }
            public required DateTime DatumUpisa { get; set; }
            public required int GodinaStudija { get; set; }
            public required int AkademskaGodinaId { get; set; }
            public required float CijenaSkolarine { get; set; }
            public required bool Obnova { get; set; }
        }
    }
}
