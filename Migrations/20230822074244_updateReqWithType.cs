using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace carma.Migrations
{
    /// <inheritdoc />
    public partial class updateReqWithType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TypeOfRequest",
                table: "Requests",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TypeOfRequest",
                table: "Requests");
        }
    }
}
