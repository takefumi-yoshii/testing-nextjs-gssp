import { User } from "@/prisma";
import { prismaMock } from "@/prisma/jest";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

export function mockUserFindMany(status: 200 | 404 = 200) {
  if (status === 404) {
    prismaMock.user.findMany.mockRejectedValue(
      new PrismaClientKnownRequestError("Not Found", "P2025", "1")
    );
  }
  if (status === 200) {
    const users: User[] = [
      { id: 1, email: "takepepe@example.com", name: "takepepe" },
    ];
    prismaMock.user.findMany.mockResolvedValue(users);
  }
}
