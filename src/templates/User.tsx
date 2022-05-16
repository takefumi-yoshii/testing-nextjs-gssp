import { User as IUser } from "@/prisma";
import Link from "next/link";

export const User = ({ user }: { user: IUser }) => {
  return (
    <div>
      <h1>User: {user.name}</h1>
      <p>{user.email}</p>
      <hr />
      <Link href={`/users`}>
        <a>back to users</a>
      </Link>
    </div>
  );
};
