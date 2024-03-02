using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace infra.Data.Migrations
{
    /// <inheritdoc />
    public partial class Dep_CVRefId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Deployments_CVRefs_CVRefId1",
                table: "Deployments");

            migrationBuilder.DropColumn(
                name: "CVRefId2",
                table: "Deployments");

            migrationBuilder.AlterColumn<int>(
                name: "CVRefId1",
                table: "Deployments",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddForeignKey(
                name: "FK_Deployments_CVRefs_CVRefId1",
                table: "Deployments",
                column: "CVRefId1",
                principalTable: "CVRefs",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Deployments_CVRefs_CVRefId1",
                table: "Deployments");

            migrationBuilder.AlterColumn<int>(
                name: "CVRefId1",
                table: "Deployments",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CVRefId2",
                table: "Deployments",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Deployments_CVRefs_CVRefId1",
                table: "Deployments",
                column: "CVRefId1",
                principalTable: "CVRefs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
