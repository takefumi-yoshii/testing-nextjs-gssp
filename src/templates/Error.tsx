export const Error = ({
  message = "Internal Server Error",
  status = 500,
}: {
  message?: string;
  status?: number;
}) => {
  return (
    <div>
      <h1>{status}</h1>
      <p>{message}</p>
    </div>
  );
};
