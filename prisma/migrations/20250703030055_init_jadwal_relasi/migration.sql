-- CreateTable
CREATE TABLE `Dokter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `layanan` VARCHAR(191) NOT NULL,
    `foto` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jadwal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dokterId` INTEGER NOT NULL,
    `hari` VARCHAR(191) NOT NULL,
    `jam` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Jadwal` ADD CONSTRAINT `Jadwal_dokterId_fkey` FOREIGN KEY (`dokterId`) REFERENCES `Dokter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
