import { NotFoundError } from "@/prisma/dao";
import { prismaMock } from "@/prisma/jest";
import { users } from "./fixture";

export function mockUserFindMany(id: number = 1) {
  const res = users.filter((user) => user.id === id);
  if (!res.length) {
    prismaMock.user.findMany.mockRejectedValue(NotFoundError());
    return;
  }
  prismaMock.user.findMany.mockResolvedValue(res);
}

export function mockUserFindUnique(id: number = 1) {
  const res = users.find((user) => user.id === id);
  if (!res) {
    prismaMock.user.findUnique.mockRejectedValue(NotFoundError());
    return;
  }
  prismaMock.user.findUnique.mockResolvedValue(res);
}
