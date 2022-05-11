import { createPost } from "@/fetcher/posts/create";
import "@/mock";
import type { NextApiHandler } from "next";

const postHandler: NextApiHandler = async (req, res) => {
  const { data, err } = await createPost(req.body);
  if (err) {
    return res.status(err.status).json({ message: err.message });
  }
  res.status(201).json(data);
};

const handler: NextApiHandler = async (req, res) => {
  try {
    switch (req.method) {
      case "POST":
        return postHandler(req, res);
      default:
        res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch {
    res.status(500).json({ name: "Internal Server Error" });
  }
};

export default handler;
