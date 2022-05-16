import { User } from "@/prisma";

export const user = (id: number): User => ({
  id,
  email: `takepepe+${id}@example.com`,
  name: `takepepe+${id}`,
});

export const users = [...new Array(100)].map((_, i) => user(i));
