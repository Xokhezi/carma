using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace carma.Migrations
{
    /// <inheritdoc />
    public partial class updateReqToRequest : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Code",
                table: "Requests",
                newName: "Description");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Requests",
                newName: "Code");
        }
    }
}
