using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace infra.Data.Migrations
{
    /// <inheritdoc />
    public partial class DeployCVRefId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Deployments_CVRefs_CVRefId",
                table: "Deployments");

            migrationBuilder.DropForeignKey(
                name: "FK_Deployments_CVRefs_DeployCVRefId",
                table: "Deployments");

            migrationBuilder.DropIndex(
                name: "IX_Deployments_DeployCVRefId",
                table: "Deployments");

            migrationBuilder.DropIndex(
                name: "IX_Deployments_DeployCVRefId_Sequence",
                table: "Deployments");

            migrationBuilder.RenameColumn(
                name: "DeployCVRefId",
                table: "Deployments",
                newName: "CVRefId2");

            migrationBuilder.CreateIndex(
                name: "IX_Deployments_CVRefId_Sequence",
                table: "Deployments",
                columns: new[] { "CVRefId", "Sequence" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Deployments_CVRefId1",
                table: "Deployments",
                column: "CVRefId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Deployments_CVRefs_CVRefId",
                table: "Deployments",
                column: "CVRefId",
                principalTable: "CVRefs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Deployments_CVRefs_CVRefId1",
                table: "Deployments",
                column: "CVRefId1",
                principalTable: "CVRefs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Deployments_CVRefs_CVRefId",
                table: "Deployments");

            migrationBuilder.DropForeignKey(
                name: "FK_Deployments_CVRefs_CVRefId1",
                table: "Deployments");

            migrationBuilder.DropIndex(
                name: "IX_Deployments_CVRefId_Sequence",
                table: "Deployments");

            migrationBuilder.DropIndex(
                name: "IX_Deployments_CVRefId1",
                table: "Deployments");

            migrationBuilder.RenameColumn(
                name: "CVRefId2",
                table: "Deployments",
                newName: "DeployCVRefId");

            migrationBuilder.CreateIndex(
                name: "IX_Deployments_DeployCVRefId",
                table: "Deployments",
                column: "DeployCVRefId");

            migrationBuilder.CreateIndex(
                name: "IX_Deployments_DeployCVRefId_Sequence",
                table: "Deployments",
                columns: new[] { "DeployCVRefId", "Sequence" },
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Deployments_CVRefs_CVRefId",
                table: "Deployments",
                column: "CVRefId",
                principalTable: "CVRefs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Deployments_CVRefs_DeployCVRefId",
                table: "Deployments",
                column: "DeployCVRefId",
                principalTable: "CVRefs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
