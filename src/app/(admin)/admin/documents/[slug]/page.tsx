import React from "react";
import Editor from "./editor";
import { getDocumentBySlug } from "@/features/documents/actions";

interface DocumentIdPageProps {
  params: Promise<{ slug: string }>;
}

async function Page({ params }: DocumentIdPageProps) {
  const { slug } = await params;
  const document = await getDocumentBySlug(slug);

  console.log(document);

  return (
    <div>
      page {slug}
      <Editor />
    </div>
  );
}

export default Page;
