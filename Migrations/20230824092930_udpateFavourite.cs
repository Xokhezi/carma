using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace carma.Migrations
{
    /// <inheritdoc />
    public partial class udpateFavourite : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Favourites",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TypeOfRequest",
                table: "Favourites",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "VehicleId",
                table: "Favourites",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Favourites");

            migrationBuilder.DropColumn(
                name: "TypeOfRequest",
                table: "Favourites");

            migrationBuilder.DropColumn(
                name: "VehicleId",
                table: "Favourites");
        }
    }
}
