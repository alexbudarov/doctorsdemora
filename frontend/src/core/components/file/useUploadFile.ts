import { TypedDocumentNode } from "@apollo/client";
import { useCallback } from "react";
import { getSelectionSetName } from "../../../dataProvider/graphqlDataProvider";
import { apolloClient } from "../../apollo/client";

export type UploadUrlQueryType = TypedDocumentNode<
  Record<string, { fileId: number; uploadUrl: string }>,
  Record<string, unknown>
>;

export interface UseUploadFileParams {
  setServerError: (error?: Error) => void;
  uploadUrlQuery: UploadUrlQueryType;
}
export const useUploadFile = ({ uploadUrlQuery, setServerError }: UseUploadFileParams) => {
  const uploadFile = useCallback(
    async (file: File): Promise<{ fileId: number } | undefined> => {
      try {
        setServerError(undefined);
        const { data } = await apolloClient.query({
          query: uploadUrlQuery,
          variables: {
            originalFilename: file.name,
          },
        });
        const selectionSetName: string = getSelectionSetName(uploadUrlQuery);

        const { fileId, uploadUrl } = data[selectionSetName];

        // TODO strings in code could be refactored, may be extract method `putFile`
        await fetch(uploadUrl, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type,
          },
        });

        return { fileId };
      } catch (e) {
        setServerError(new Error("Error while file uploading"));
      }
    },
    [setServerError, uploadUrlQuery]
  );

  return uploadFile;
};
