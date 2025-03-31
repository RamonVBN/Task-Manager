/*
  Warnings:

  - You are about to drop the `Task_History` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Task_History" DROP CONSTRAINT "Task_History_changed_by_fkey";

-- DropForeignKey
ALTER TABLE "Task_History" DROP CONSTRAINT "Task_History_task_id_fkey";

-- DropTable
DROP TABLE "Task_History";

-- CreateTable
CREATE TABLE "tasks_histories" (
    "id" SERIAL NOT NULL,
    "task_id" INTEGER NOT NULL,
    "changed_by" INTEGER NOT NULL,
    "old_status" "Status" NOT NULL,
    "new_status" "Status" NOT NULL,
    "changed_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tasks_histories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tasks_histories" ADD CONSTRAINT "tasks_histories_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks_histories" ADD CONSTRAINT "tasks_histories_changed_by_fkey" FOREIGN KEY ("changed_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
