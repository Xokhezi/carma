using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace carma.Migrations
{
    /// <inheritdoc />
    public partial class hcardCode : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AxigonCode",
                table: "Vehicles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "OrlenCode",
                table: "Vehicles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AxigonCode",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "OrlenCode",
                table: "Vehicles");
        }
    }
}
