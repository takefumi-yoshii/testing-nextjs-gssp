import Link from "next/link";

export const Top = () => {
  return (
    <div>
      <h1>My Blog</h1>
      <p>
        <Link href="/posts">
          <a>posts</a>
        </Link>
      </p>
    </div>
  );
};
