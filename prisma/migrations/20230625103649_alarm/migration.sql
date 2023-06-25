/*
  Warnings:

  - Added the required column `stateAddress` to the `AlarmSchema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stateAddressType` to the `AlarmSchema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusAddress` to the `AlarmSchema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusAddressType` to the `AlarmSchema` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AlarmSchema" ADD COLUMN     "stateAddress" TEXT NOT NULL,
ADD COLUMN     "stateAddressType" "AddressType" NOT NULL,
ADD COLUMN     "statusAddress" TEXT NOT NULL,
ADD COLUMN     "statusAddressType" "AddressType" NOT NULL;
