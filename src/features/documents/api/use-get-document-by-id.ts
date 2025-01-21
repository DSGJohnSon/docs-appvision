import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetDocumentById = (documentId: string) => {
  const query = useQuery({
    queryKey: ["document", documentId],
    queryFn: async () => {
      const response = await client.api.documents[":id"]["$get"]({
        param: { id: documentId },
      });

      if (!response.ok) {
        return null;
      }

      console.log(response);

      const { data } = await response.json();

      return { data };
    },
  });

  return query;
};
