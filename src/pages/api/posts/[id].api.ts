import { fetchPostDelete } from "@/fetcher/posts/delete";
import { fetchPostUpdate } from "@/fetcher/posts/update";
import "@/mock";
import type { NextApiHandler } from "next";

const putHandler: NextApiHandler = async (req, res) => {
  const id = req.query.id;
  if (typeof id !== "string") {
    return res.status(400).json({ message: "Bad Request" });
  }
  const { data, err } = await fetchPostUpdate(id, req.body);
  if (err) {
    return res.status(err.status).json({ message: err.message });
  }
  res.status(200).json(data);
};

const deleteHandler: NextApiHandler = async (req, res) => {
  const id = req.query.id;
  if (typeof id !== "string") {
    return res.status(400).json({ message: "Bad Request" });
  }
  const { data, err } = await fetchPostDelete(id);
  if (err) {
    return res.status(err.status).json({ message: err.message });
  }
  res.status(200).json(data);
};

const handler: NextApiHandler = async (req, res) => {
  try {
    switch (req.method) {
      case "PUT":
        return putHandler(req, res);
      case "DELETE":
        return deleteHandler(req, res);
      default:
        res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch {
    res.status(500).json({ name: "Internal Server Error" });
  }
};

export default handler;
