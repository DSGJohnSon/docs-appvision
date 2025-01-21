"use server";

import { DATABASE_ID, DOCUMENTS_ID } from "@/config";
import { Client, Databases } from "node-appwrite";

export const getDocumentBySlug = async (slug: string) => {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    const databases = new Databases(client);
    const documents = await databases.listDocuments(
      DATABASE_ID,
      DOCUMENTS_ID,
      []
    );

    // const document = await databases.listDocuments(DATABASE_ID, DOCUMENTS_ID, [
    //   Query.equal("slug", slug),
    // ]);

    console.log(documents);

    return documents;
  } catch {
    return null;
  }
};
