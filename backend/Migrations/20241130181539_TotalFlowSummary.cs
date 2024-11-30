using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class TotalFlowSummary : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "348435ce-b8d8-4cf5-a98e-2a6343969d44");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f200f0a8-1083-4a44-a424-e7d60908a87b");

            migrationBuilder.AlterColumn<decimal>(
                name: "Amount",
                table: "SavingTransactions",
                type: "numeric",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<decimal>(
                name: "TargetAmount",
                table: "SavingGoals",
                type: "numeric",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<decimal>(
                name: "CurrentSaved",
                table: "SavingGoals",
                type: "numeric",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.CreateTable(
                name: "TotalFlowSummary",
                columns: table => new
                {
                    TotalFlow = table.Column<decimal>(type: "numeric", nullable: false),
                    TransactionTotal = table.Column<decimal>(type: "numeric", nullable: false),
                    TransferTotal = table.Column<decimal>(type: "numeric", nullable: false),
                    SavingTotal = table.Column<decimal>(type: "numeric", nullable: false),
                    TransactionPercentage = table.Column<decimal>(type: "numeric", nullable: false),
                    TransferPercentage = table.Column<decimal>(type: "numeric", nullable: false),
                    SavingPercentage = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3ee271c5-d380-479c-945e-266b36b03dd6", null, "Admin", "ADMIN" },
                    { "757ab933-63ff-48cd-b6cc-bc88965fcef0", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TotalFlowSummary");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3ee271c5-d380-479c-945e-266b36b03dd6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "757ab933-63ff-48cd-b6cc-bc88965fcef0");

            migrationBuilder.AlterColumn<int>(
                name: "Amount",
                table: "SavingTransactions",
                type: "integer",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric");

            migrationBuilder.AlterColumn<int>(
                name: "TargetAmount",
                table: "SavingGoals",
                type: "integer",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric");

            migrationBuilder.AlterColumn<int>(
                name: "CurrentSaved",
                table: "SavingGoals",
                type: "integer",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "348435ce-b8d8-4cf5-a98e-2a6343969d44", null, "User", "USER" },
                    { "f200f0a8-1083-4a44-a424-e7d60908a87b", null, "Admin", "ADMIN" }
                });
        }
    }
}
