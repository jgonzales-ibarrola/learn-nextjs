import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";

export async function fetchUserTypes(): Promise<Prisma.userTypesGetPayload<{}>[]> {
  return await prisma.userTypes.findMany({
    orderBy: {
      updated_at: "desc"
    }
  });
}