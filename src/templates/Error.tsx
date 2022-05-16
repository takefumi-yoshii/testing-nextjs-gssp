export const Error = ({
  message = "Internal Server Error",
  status,
  code,
}: {
  message?: string;
  status?: number;
  code?: string;
}) => {
  return (
    <div>
      <h1>{status || code}</h1>
      <p>{message}</p>
    </div>
  );
};
