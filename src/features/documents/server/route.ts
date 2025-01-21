import { Hono } from "hono";
import { createAdminClient } from "@/lib/appwrite";
import { Query } from "node-appwrite";
import { sessionMiddleware } from "@/lib/session-middleware";
import { DATABASE_ID, DOCUMENTS_ID } from "@/config";

const app = new Hono().get("/:id", sessionMiddleware, async (c) => {
  const { id } = c.req.param();
  const { databases } = await createAdminClient();

  // Recherchez le profil associé à l'utilisateur actuel
  const document = await databases.listDocuments(DATABASE_ID, DOCUMENTS_ID, [
    Query.equal("id", id), // Filtrez par slug
  ]);

  if (document.documents.length === 0) {
    return c.json({ error: "Document not found" }, 404);
  }

  return c.json({ data: document });
});

export default app;
