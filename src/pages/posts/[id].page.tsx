import { fetchPostShow } from "@/fetcher/posts/show";
import { badRequestProps } from "@/lib/next";
import { Error } from "@/templates/Error";
import { PostShow } from "@/templates/PostShow";
import type { GetServerSideProps, NextPage } from "next";

type Props = Awaited<ReturnType<typeof fetchPostShow>>;

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  if (typeof query.id !== "string") return badRequestProps();
  return { props: await fetchPostShow(query.id) };
};

export const Page: NextPage<Props> = ({ data, err }) => {
  if (err) return <Error message={err.message} status={err.status} />;
  return <PostShow title={data.title} body={data.body} />;
};

export default Page;
