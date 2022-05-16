import { userFindMany } from "@/prisma/dao/user";
import { Error } from "@/templates/Error";
import { Users } from "@/templates/Users";
import type { GetServerSideProps, NextPage } from "next";

type Props = Awaited<ReturnType<typeof userFindMany>>;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return { props: await userFindMany() };
};

export const Page: NextPage<Props> = ({ data, err }) => {
  if (err) return <Error message={err.message} code={err.code} />;
  return <Users users={data.users} />;
};

export default Page;
