import { User } from "@/prisma";
import Link from "next/link";

export const Users = ({ users }: { users: User[] }) => {
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>
              <a>{user.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
