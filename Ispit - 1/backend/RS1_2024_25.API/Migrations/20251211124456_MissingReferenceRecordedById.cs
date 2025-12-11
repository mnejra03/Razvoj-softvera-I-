using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RS1_2024_25.API.Migrations
{
    /// <inheritdoc />
    public partial class MissingReferenceRecordedById : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Semesters",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DatumUpisa = table.Column<DateTime>(type: "datetime2", nullable: false),
                    GodinaStudija = table.Column<int>(type: "int", nullable: false),
                    AkademskaGodinaId = table.Column<int>(type: "int", nullable: false),
                    CijenaSkolarine = table.Column<float>(type: "real", nullable: false),
                    Obnova = table.Column<bool>(type: "bit", nullable: false),
                    DatumOvjere = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Napomena = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StudentId = table.Column<int>(type: "int", nullable: false),
                    RecordedById = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Semesters", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Semesters_AcademicYears_AkademskaGodinaId",
                        column: x => x.AkademskaGodinaId,
                        principalTable: "AcademicYears",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_Semesters_MyAppUsers_RecordedById",
                        column: x => x.RecordedById,
                        principalTable: "MyAppUsers",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_Semesters_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Semesters_AkademskaGodinaId",
                table: "Semesters",
                column: "AkademskaGodinaId");

            migrationBuilder.CreateIndex(
                name: "IX_Semesters_RecordedById",
                table: "Semesters",
                column: "RecordedById");

            migrationBuilder.CreateIndex(
                name: "IX_Semesters_StudentId",
                table: "Semesters",
                column: "StudentId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Semesters");
        }
    }
}
