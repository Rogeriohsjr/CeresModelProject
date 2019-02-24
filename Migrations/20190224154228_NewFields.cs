using Microsoft.EntityFrameworkCore.Migrations;

namespace Ceres.Migrations
{
    public partial class NewFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Credential",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "Credential",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "Credential",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "Credential");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "Credential");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "Credential");
        }
    }
}
