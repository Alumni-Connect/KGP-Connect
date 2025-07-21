-- This extension is no longer needed since we're using SERIAL IDs
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table (ID changed to SERIAL)
CREATE TABLE users (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT,
  "hall" TEXT,
  "rollNumber" TEXT,
  "email" TEXT UNIQUE,
  "password" TEXT,
  "Department" TEXT,
  "Degree" TEXT,
  "contactNum" TEXT,
  "YearOfGraduation" TIMESTAMP,
  "image" TEXT,
  "emailVerified" TIMESTAMPTZ, -- This is the standard Auth.js field
  "role" "Role" DEFAULT 'STUDENT',
  "isVerified" BOOLEAN DEFAULT false,
  "hasRegistered" BOOLEAN DEFAULT false
);

-- Create accounts table (userId changed to INTEGER)
CREATE TABLE accounts (
  id SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(255) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  "providerAccountId" VARCHAR(255) NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at BIGINT,
  id_token TEXT,
  scope TEXT,
  session_state TEXT,
  token_type TEXT,
  UNIQUE (provider, "providerAccountId")
);

-- Create sessions table (userId changed to INTEGER)
CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires TIMESTAMPTZ NOT NULL,
  "sessionToken" VARCHAR(255) NOT NULL UNIQUE
);

-- Create verification_token table (ID removed, composite primary key added)
CREATE TABLE verification_token
(
  identifier TEXT NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  token TEXT NOT NULL,
  PRIMARY KEY (identifier, token)
);

-- Create verification_Otp table (Changed to SERIAL)
CREATE TABLE "verification_Otp" (
  "id" SERIAL PRIMARY KEY,
  "identifier" TEXT NOT NULL,
  "otp" TEXT NOT NULL,
  "expires" TIMESTAMP NOT NULL
);

-- Create Donation table (Changed to SERIAL, foreign keys to users are INTEGER)
CREATE TABLE "Donation" (
  "id" SERIAL PRIMARY KEY,
  "amount" DOUBLE PRECISION NOT NULL,
  "currency" TEXT DEFAULT 'INR',
  "donorId" INTEGER NOT NULL,
  "recipientId" INTEGER NOT NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "message" TEXT,
  "status" TEXT DEFAULT 'pending',
  FOREIGN KEY ("donorId") REFERENCES "users"("id"),
  FOREIGN KEY ("recipientId") REFERENCES "users"("id")
);

-- Create Post table (Changed to SERIAL, foreign key to users is INTEGER)
CREATE TABLE "Post" (
  "id" SERIAL PRIMARY KEY,
  "caption" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "subreddit" TEXT NOT NULL,
  "type" TEXT DEFAULT 'text',
  "authorId" INTEGER NOT NULL,
  "score" INTEGER DEFAULT 0,
  "commentCount" INTEGER DEFAULT 0,
  "isVerified" BOOLEAN DEFAULT false,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("authorId") REFERENCES "users"("id")
);

-- Create Comment table (Changed to SERIAL, all ID references are now INTEGER)
CREATE TABLE "Comment" (
  "id" SERIAL PRIMARY KEY,
  "content" TEXT NOT NULL,
  "postId" INTEGER NOT NULL,
  "parentId" INTEGER,
  "path" INTEGER[] DEFAULT '{}',
  "depth" INTEGER DEFAULT 0,
  "authorId" INTEGER NOT NULL,
  "score" INTEGER DEFAULT 0,
  "status" TEXT DEFAULT 'active',
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("postId") REFERENCES "Post"("id"),
  FOREIGN KEY ("parentId") REFERENCES "Comment"("id"),
  FOREIGN KEY ("authorId") REFERENCES "users"("id")
);

-- Create PostVote table (Changed to SERIAL, all ID references are now INTEGER)
CREATE TABLE "PostVote" (
  "id" SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL,
  "postId" INTEGER NOT NULL,
  "value" INTEGER NOT NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE("userId", "postId"),
  FOREIGN KEY ("postId") REFERENCES "Post"("id"),
  FOREIGN KEY ("userId") REFERENCES "users"("id")
);

-- Create CommentVote table (Changed to SERIAL, all ID references are now INTEGER)
CREATE TABLE "CommentVote" (
  "id" SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL,
  "commentId" INTEGER NOT NULL,
  "value" INTEGER NOT NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE("userId", "commentId"),
  FOREIGN KEY ("commentId") REFERENCES "Comment"("id"),
  FOREIGN KEY ("userId") REFERENCES "users"("id")
);

-- Create jobs table (Changed to SERIAL, foreign key to users is INTEGER)
CREATE TABLE "jobs" (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "company" TEXT NOT NULL,
  "location" TEXT NOT NULL,
  "salary" INTEGER NOT NULL,
  "postedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "userId" INTEGER NOT NULL,
  "isVerified" BOOLEAN DEFAULT false,
  "status" "JobStatus" DEFAULT 'open',
  "url" TEXT DEFAULT '',
  FOREIGN KEY ("userId") REFERENCES "users"("id")
);

-- Create Scholarships table (Changed to SERIAL, foreign key to users is INTEGER)
CREATE TABLE "Scholarships" (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "criteria" TEXT[] DEFAULT '{}',
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "lastDate" TIMESTAMP NOT NULL,
  "createdBy" INTEGER NOT NULL,
  "isVerified" BOOLEAN DEFAULT false,
  "Accepted" "Status" DEFAULT 'PENDING',
  FOREIGN KEY ("createdBy") REFERENCES "users"("id")
);

-- Create FormQuestion table (Changed to SERIAL, scholarShipId is now INTEGER)
CREATE TABLE "FormQuestion" (
  "id" SERIAL PRIMARY KEY,
  "description" TEXT NOT NULL,
  "type" "SchFormQuestion" NOT NULL,
  "required" BOOLEAN NOT NULL,
  "scholarShipId" INTEGER NOT NULL,
  "options" TEXT[] DEFAULT '{}',
  FOREIGN KEY ("scholarShipId") REFERENCES "Scholarships"("id") ON DELETE CASCADE
);

-- Create ScholarshipForm table (Changed to SERIAL, all ID references are now INTEGER)
CREATE TABLE "ScholarshipForm" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "hall" TEXT NOT NULL,
  "rollNumber" TEXT NOT NULL,
  "curriculumVitae" TEXT NOT NULL,
  "Department" TEXT NOT NULL,
  "YearOfGraduation" TIMESTAMP NOT NULL,
  "AppliedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "ScholarshipId" INTEGER NOT NULL,
  "studentId" INTEGER NOT NULL,
  FOREIGN KEY ("ScholarshipId") REFERENCES "Scholarships"("id") ON DELETE CASCADE,
  FOREIGN KEY ("studentId") REFERENCES "users"("id") ON DELETE CASCADE
);

-- Create FormResponses table (Changed to SERIAL, all ID references are now INTEGER)
CREATE TABLE "FormResponses" (
  "id" SERIAL PRIMARY KEY,
  "answer" TEXT[] DEFAULT '{}',
  "scholarshipFormId" INTEGER NOT NULL,
  "linkedFormId" INTEGER NOT NULL,
  FOREIGN KEY ("scholarshipFormId") REFERENCES "ScholarshipForm"("id") ON DELETE CASCADE,
  FOREIGN KEY ("linkedFormId") REFERENCES "FormQuestion"("id") ON DELETE CASCADE
);