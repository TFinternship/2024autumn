import { db } from "./db";

export async function getStudentsByParentId({
  parentId,
}: {
  parentId: string;
}) {
  const students = await db.student.findMany({
    where: {
      parentId,
    },
  });
  return students;
}

export function fn(arg: number) {
  return arg;
}
