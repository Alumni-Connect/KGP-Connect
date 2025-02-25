-- CreateTable
CREATE TABLE "verification_Otp" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_Otp_pkey" PRIMARY KEY ("id")
);
