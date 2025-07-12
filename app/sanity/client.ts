import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "qnk7j4vv",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});