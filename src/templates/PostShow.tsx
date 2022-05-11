export const PostShow = ({ title, body }: { title: string; body: string }) => {
  return (
    <div>
      <h1>Post: {title}</h1>
      <p dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  );
};
