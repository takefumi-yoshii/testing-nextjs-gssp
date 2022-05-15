import { showPost } from "@/fetcher/posts/show";
import { badRequestProps } from "@/lib/next";
import { Error } from "@/templates/Error";
import { Post } from "@/templates/Post";
import type { GetServerSideProps, NextPage } from "next";

type Props = Awaited<ReturnType<typeof showPost>>;

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  if (typeof query.id !== "string") return badRequestProps();
  return { props: await showPost(query.id) };
};

export const Page: NextPage<Props> = ({ data, err }) => {
  if (err) return <Error message={err.message} status={err.status} />;
  return <Post title={data.title} body={data.body} />;
};

export default Page;
