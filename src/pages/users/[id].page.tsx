import { badRequestProps } from "@/lib/next";
import { userFindUnique } from "@/prisma/dao/user";
import { Error } from "@/templates/Error";
import { User } from "@/templates/User";
import type { GetServerSideProps, NextPage } from "next";

type Props = Awaited<ReturnType<typeof userFindUnique>>;

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  if (typeof query.id !== "string") return badRequestProps();
  return { props: await userFindUnique({ where: { id: +query.id } }) };
};

export const Page: NextPage<Props> = ({ data, err }) => {
  if (err) return <Error message={err.message} code={err.code} />;
  if (!data.user) return <Error message="Not Found" status={400} />;
  return <User user={data.user} />;
};

export default Page;
