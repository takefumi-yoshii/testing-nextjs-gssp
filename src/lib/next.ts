export const badRequestProps = () => {
  return {
    props: { err: { message: "Bad Request", code: "400", status: 400 } },
  };
};
