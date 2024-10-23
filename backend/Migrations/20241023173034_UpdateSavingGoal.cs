using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSavingGoal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "22c8767a-895a-49f5-a510-824cf2d5a277");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b2ac7781-c44d-420d-ad0a-33a0b92df1f1");

            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "SavingGoals");

            migrationBuilder.DropColumn(
                name: "Prority",
                table: "SavingGoals");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "SavingGoals");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "169353e8-dde1-410a-8dc0-f1ef90ceb1e7", null, "User", "USER" },
                    { "3c3ce685-be08-4286-a04a-804acf8266fa", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "169353e8-dde1-410a-8dc0-f1ef90ceb1e7");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3c3ce685-be08-4286-a04a-804acf8266fa");

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "SavingGoals",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Prority",
                table: "SavingGoals",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "SavingGoals",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "22c8767a-895a-49f5-a510-824cf2d5a277", null, "Admin", "ADMIN" },
                    { "b2ac7781-c44d-420d-ad0a-33a0b92df1f1", null, "User", "USER" }
                });
        }
    }
}
