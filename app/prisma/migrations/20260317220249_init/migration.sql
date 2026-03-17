-- CreateTable
CREATE TABLE "Aircraft" (
    "id" SERIAL NOT NULL,
    "registration" TEXT NOT NULL,
    "aircraftType" TEXT NOT NULL,
    "engine" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Aircraft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskType" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaskType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LicenceCategory" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LicenceCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogEntry" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "aircraftId" INTEGER NOT NULL,
    "ata" TEXT NOT NULL,
    "taskTypeId" INTEGER NOT NULL,
    "taskDescription" TEXT NOT NULL,
    "workType" TEXT NOT NULL,
    "licenceCategoryId" INTEGER NOT NULL,
    "durationHours" DOUBLE PRECISION NOT NULL,
    "workorder" TEXT,
    "verifiedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LogEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Aircraft_registration_key" ON "Aircraft"("registration");

-- CreateIndex
CREATE UNIQUE INDEX "TaskType_code_key" ON "TaskType"("code");

-- CreateIndex
CREATE UNIQUE INDEX "LicenceCategory_code_key" ON "LicenceCategory"("code");

-- CreateIndex
CREATE INDEX "LogEntry_date_idx" ON "LogEntry"("date");

-- CreateIndex
CREATE INDEX "LogEntry_aircraftId_idx" ON "LogEntry"("aircraftId");

-- CreateIndex
CREATE INDEX "LogEntry_taskTypeId_idx" ON "LogEntry"("taskTypeId");

-- CreateIndex
CREATE INDEX "LogEntry_licenceCategoryId_idx" ON "LogEntry"("licenceCategoryId");

-- AddForeignKey
ALTER TABLE "LogEntry" ADD CONSTRAINT "LogEntry_aircraftId_fkey" FOREIGN KEY ("aircraftId") REFERENCES "Aircraft"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogEntry" ADD CONSTRAINT "LogEntry_taskTypeId_fkey" FOREIGN KEY ("taskTypeId") REFERENCES "TaskType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogEntry" ADD CONSTRAINT "LogEntry_licenceCategoryId_fkey" FOREIGN KEY ("licenceCategoryId") REFERENCES "LicenceCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
