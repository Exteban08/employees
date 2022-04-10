-- AlterTable
ALTER TABLE "Employee" ADD COLUMN "textSearch" TSVECTOR
    GENERATED ALWAYS AS
        (setweight(to_tsvector('english', coalesce(email, '')), 'A') ||
        setweight(to_tsvector('english', coalesce("name", '')), 'A') ||
        setweight(to_tsvector('english', coalesce("lastName", '')), 'A') ||
        setweight(to_tsvector('english', coalesce(nationality, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(phone, '')), 'A') ||
        setweight(to_tsvector('english', coalesce("civilStatus", '')), 'A'))
    STORED;

-- CreateIndex
CREATE INDEX "Employee_textSearch_idx" ON "Employee" USING GIN ("textSearch");
