using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class SavingTransaction : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0a1fc1e7-9bb8-4393-8ce6-30b696999c9a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ac020a2c-af45-4745-9ed2-d82af37087b1");

            migrationBuilder.DropColumn(
                name: "Date",
                table: "SavingTransactions");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "SavingTransactions",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "348435ce-b8d8-4cf5-a98e-2a6343969d44", null, "User", "USER" },
                    { "f200f0a8-1083-4a44-a424-e7d60908a87b", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "348435ce-b8d8-4cf5-a98e-2a6343969d44");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f200f0a8-1083-4a44-a424-e7d60908a87b");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "SavingTransactions");

            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "SavingTransactions",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0a1fc1e7-9bb8-4393-8ce6-30b696999c9a", null, "Admin", "ADMIN" },
                    { "ac020a2c-af45-4745-9ed2-d82af37087b1", null, "User", "USER" }
                });
        }
    }
}
