import { fetchPostList } from "@/fetcher/posts/list";
import { Error } from "@/templates/Error";
import { PostList } from "@/templates/PostList";
import type { GetServerSideProps, NextPage } from "next";

type Props = Awaited<ReturnType<typeof fetchPostList>>;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return { props: await fetchPostList() };
};

export const Page: NextPage<Props> = ({ data, err }) => {
  if (err) return <Error message={err.message} status={err.status} />;
  return <PostList items={data.items} />;
};

export default Page;
