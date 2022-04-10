-- AlterTable
ALTER TABLE "Employee" ADD COLUMN "textSearch" TSVECTOR
    GENERATED ALWAYS AS
        (setweight(to_tsvector('english', coalesce(email, '')), 'A') ||
        setweight(to_tsvector('english', coalesce("name", '')), 'B') ||
        setweight(to_tsvector('english', coalesce("lastName", '')), 'C'))
    STORED;;

-- CreateIndex
CREATE INDEX "Employee_textSearch_idx" ON "Employee" USING GIN ("textSearch");
