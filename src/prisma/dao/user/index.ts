import { prisma, Prisma } from "@/prisma";
import { convoluteData, convoluteErr } from "@/prisma/dao";

export const userFindMany = async (args?: Prisma.UserFindManyArgs) =>
  prisma.user
    .findMany(args)
    .then((users) => convoluteData({ users }))
    .catch(convoluteErr);

export const userFindUnique = async (args: Prisma.UserFindUniqueArgs) =>
  prisma.user
    .findUnique(args)
    .then((user) => convoluteData({ user }))
    .catch(convoluteErr);
