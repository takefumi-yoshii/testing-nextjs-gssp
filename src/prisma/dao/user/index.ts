import { prisma } from "@/prisma";
import { convoluteData, convoluteErr } from "@/prisma/dao";

export const userFindMany = async () =>
  prisma.user
    .findMany()
    .then((users) => convoluteData({ users }))
    .catch(convoluteErr);
