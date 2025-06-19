/*
  Warnings:

  - You are about to drop the column `foto` on the `JadwalDokter` table. All the data in the column will be lost.
  - You are about to drop the column `jamMulai` on the `JadwalDokter` table. All the data in the column will be lost.
  - You are about to drop the column `jamSelesai` on the `JadwalDokter` table. All the data in the column will be lost.
  - You are about to drop the column `nama` on the `JadwalDokter` table. All the data in the column will be lost.
  - You are about to drop the column `spesialis` on the `JadwalDokter` table. All the data in the column will be lost.
  - You are about to alter the column `hari` on the `JadwalDokter` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - Added the required column `foto_dokter` to the `JadwalDokter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jam_dokter` to the `JadwalDokter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `layanan` to the `JadwalDokter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama_dokter` to the `JadwalDokter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `JadwalDokter` DROP COLUMN `foto`,
    DROP COLUMN `jamMulai`,
    DROP COLUMN `jamSelesai`,
    DROP COLUMN `nama`,
    DROP COLUMN `spesialis`,
    ADD COLUMN `foto_dokter` VARCHAR(20) NOT NULL,
    ADD COLUMN `jam_dokter` VARCHAR(50) NOT NULL,
    ADD COLUMN `layanan` VARCHAR(50) NOT NULL,
    ADD COLUMN `nama_dokter` VARCHAR(50) NOT NULL,
    MODIFY `hari` VARCHAR(50) NOT NULL;
