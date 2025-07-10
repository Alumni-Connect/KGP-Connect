CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE users (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "name" TEXT,
  "hall" TEXT,
  "rollNumber" TEXT,
  "email" TEXT UNIQUE,
  "password" TEXT,
  "Department" TEXT,
  "Degree" TEXT,
  "contactNum" TEXT,
  "YearOfGraduation" TIMESTAMP,
  "email_verified" TIMESTAMP,
  "image" TEXT,
  "emailVerified" TIMESTAMPTZ,
  "role" "Role" DEFAULT 'STUDENT',
  "isVerified" BOOLEAN DEFAULT false,
  "hasRegistered" BOOLEAN DEFAULT false
);

CREATE TABLE accounts (
  id SERIAL PRIMARY KEY,
  "userId" uuid NOT NULL REFERENCES users(id),
  type VARCHAR(255) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  "providerAccountId" VARCHAR(255) NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at BIGINT,
  id_token TEXT,
  scope TEXT,
  session_state TEXT,
  token_type TEXT
);

CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  "userId" uuid NOT NULL REFERENCES users(id),
  expires TIMESTAMPTZ NOT NULL,ypeError: Cannot read properties of undefined (reading 'id')
  "sessionToken" VARCHAR(255) NOT NULL
);
-- Create verification_token table
CREATE TABLE verification_token
(
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  identifier TEXT NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  token TEXT NOT NULL,
  UNIQUE(identifier, token)
);

-- Create verification_Otp table
CREATE TABLE "verification_Otp" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "identifier" TEXT NOT NULL,
  "otp" TEXT NOT NULL,
  "expires" TIMESTAMP NOT NULL
);

-- Create Donation table
CREATE TABLE "Donation" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "amount" DOUBLE PRECISION NOT NULL,
  "currency" TEXT DEFAULT 'INR',
  "donorId" uuid NOT NULL,
  "recipientId" uuid NOT NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "message" TEXT,
  "status" TEXT DEFAULT 'pending',
  FOREIGN KEY ("donorId") REFERENCES "users"("id"),
  FOREIGN KEY ("recipientId") REFERENCES "users"("id")
);

-- Create Post table
CREATE TABLE "Post" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "caption" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "subreddit" TEXT NOT NULL,
  "type" TEXT DEFAULT 'text',
  "authorId" uuid NOT NULL,
  "score" INTEGER DEFAULT 0,
  "commentCount" INTEGER DEFAULT 0,
  "isVerified" BOOLEAN DEFAULT false,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("authorId") REFERENCES "users"("id")
);

-- Create Comment table
CREATE TABLE "Comment" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "content" TEXT NOT NULL,
  "postId" uuid NOT NULL,
  "parentId" uuid,
  "path" TEXT[] DEFAULT '{}',
  "depth" INTEGER DEFAULT 0,
  "authorId" uuid NOT NULL,
  "score" INTEGER DEFAULT 0,
  "status" TEXT DEFAULT 'active',
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("postId") REFERENCES "Post"("id"),
  FOREIGN KEY ("parentId") REFERENCES "Comment"("id"),
  FOREIGN KEY ("authorId") REFERENCES "users"("id")
);

-- Create PostVote table
CREATE TABLE "PostVote" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "userId" uuid NOT NULL,
  "postId" uuid NOT NULL,
  "value" INTEGER NOT NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE("userId", "postId"),
  FOREIGN KEY ("postId") REFERENCES "Post"("id"),
  FOREIGN KEY ("userId") REFERENCES "users"("id")
);

-- Create CommentVote table
CREATE TABLE "CommentVote" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "userId" uuid NOT NULL,
  "commentId" uuid NOT NULL,
  "value" INTEGER NOT NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE("userId", "commentId"),
  FOREIGN KEY ("commentId") REFERENCES "Comment"("id"),
  FOREIGN KEY ("userId") REFERENCES "users"("id")
);

-- Create jobs table
CREATE TABLE "jobs" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "title" TEXT NOT NULL,
  "company" TEXT NOT NULL,
  "location" TEXT NOT NULL,
  "salary" INTEGER NOT NULL,
  "postedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "userId" uuid NOT NULL,
  "isVerified" BOOLEAN DEFAULT false,
  "status" "JobStatus" DEFAULT 'open',
  "url" TEXT DEFAULT '',
  FOREIGN KEY ("userId") REFERENCES "users"("id")
);

-- Create Scholarships table
CREATE TABLE "Scholarships" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "criteria" TEXT[] DEFAULT '{}',
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "lastDate" TIMESTAMP NOT NULL,
  "createdBy" uuid NOT NULL,
  "isVerified" BOOLEAN DEFAULT false,
  "Accepted" "Status" DEFAULT 'PENDING',
  FOREIGN KEY ("createdBy") REFERENCES "users"("id")
);

-- Create FormQuestion table
CREATE TABLE "FormQuestion" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "description" TEXT NOT NULL,
  "type" "SchFormQuestion" NOT NULL,
  "required" BOOLEAN NOT NULL,
  "scholarShipId" uuid NOT NULL,
  "options" TEXT[] DEFAULT '{}',
  FOREIGN KEY ("scholarShipId") REFERENCES "Scholarships"("id") ON DELETE CASCADE
);

-- Create ScholarshipForm table
CREATE TABLE "ScholarshipForm" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "hall" TEXT NOT NULL,
  "rollNumber" TEXT NOT NULL,
  "curriculumVitae" TEXT NOT NULL,
  "Department" TEXT NOT NULL,
  "YearOfGraduation" TIMESTAMP NOT NULL,
  "AppliedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "ScholarshipId" uuid NOT NULL,
  "studentId" uuid NOT NULL,
  FOREIGN KEY ("ScholarshipId") REFERENCES "Scholarships"("id") ON DELETE CASCADE,
  FOREIGN KEY ("studentId") REFERENCES "users"("id") ON DELETE CASCADE
);

-- Create FormResponses table
CREATE TABLE "FormResponses" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "answer" TEXT[] DEFAULT '{}',
  "scholarshipFormId" uuid NOT NULL,
  "linkedFormId" uuid NOT NULL,
  FOREIGN KEY ("scholarshipFormId") REFERENCES "ScholarshipForm"("id") ON DELETE CASCADE,
  FOREIGN KEY ("linkedFormId") REFERENCES "FormQuestion"("id") ON DELETE CASCADE
); 