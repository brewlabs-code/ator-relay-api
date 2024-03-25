type ResponseOutput = {
  data?: any;
  message: string;
  status: 200 | 400 | 401 | 500;
};

export const responseOutput = ({ message, data, status }: ResponseOutput) => {
  const allowDomain =
    import.meta.env.MODE === "development" ? "*" : "https://ator.io";

  return new Response(
    JSON.stringify({
      message,
      ...data,
    }),
    {
      status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": allowDomain,
      },
    }
  );
};
