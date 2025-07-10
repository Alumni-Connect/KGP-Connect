-- Create indexes for better performance
CREATE INDEX "idx_users_email" ON "users"("email");
CREATE INDEX "idx_posts_authorId" ON "Post"("authorId");
CREATE INDEX "idx_comments_postId" ON "Comment"("postId");
CREATE INDEX "idx_comments_authorId" ON "Comment"("authorId");
CREATE INDEX "idx_jobs_userId" ON "jobs"("userId");
CREATE INDEX "idx_scholarships_createdBy" ON "Scholarships"("createdBy");
CREATE INDEX "idx_scholarshipform_scholarshipid" ON "ScholarshipForm"("ScholarshipId");
CREATE INDEX "idx_scholarshipform_studentid" ON "ScholarshipForm"("studentId");
CREATE INDEX "idx_formquestion_scholarshipid" ON "FormQuestion"("scholarShipId");
CREATE INDEX "idx_formresponses_scholarshipformid" ON "FormResponses"("scholarshipFormId");
CREATE INDEX "idx_formresponses_linkedformid" ON "FormResponses"("linkedFormId"); 