import { Item } from "@/fetcher/posts/list";
import Link from "next/link";

export const Posts = ({ items }: { items: Item[] }) => {
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Link href={`/posts/${item.id}`}>
              <a>{item.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
