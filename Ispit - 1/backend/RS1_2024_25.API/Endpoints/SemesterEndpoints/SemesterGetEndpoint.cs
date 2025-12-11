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
                                                     DatumOvjere = x.DatumOvjere.ToString("yyyy-MM-dd"),
                                                     Napomena = x.Napomena,
                                                     Student = x.Student,
                                                     StudentId = x.StudentId,
                                                     RecordedById = x.RecordedById,
                                                     RecordedByName = x.RecordedBy.FirstName + " " + x.RecordedBy.LastName
                                                 }).ToListAsync(cancellationToken);
            return Ok(semesters);
        }

        public class SemesterResponse
        {
            public required int Id { get; set; }
            public required string DatumUpisa { get; set; }
            public required int GodinaStudija { get; set; }
            public required int AkademskaGodinaId { get; set; }
            public AcademicYear? AkademskaGodina {  get; set; }
            public DateOnly AkademskaGodinaStartDate { get; set; }
            public string AkademskaGodinaDescription { get; set; }
            public required float CijenaSkolarine { get; set; }
            public required bool Obnova {  get; set; }
            public required string DatumOvjere { get; set; }
            public required string Napomena { get; set; }
            public required int StudentId { get; set; }
            public Student? Student {  get; set; }
            public required int RecordedById { get; set; }
            public MyAppUser? RecordedBy { get; set; }
            public string RecordedByName { get; set; }
        }
    }
}
