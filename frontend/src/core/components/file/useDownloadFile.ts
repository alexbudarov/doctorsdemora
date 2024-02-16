import { TypedDocumentNode } from "@apollo/client";
import { useCallback } from "react";
import { RaRecord, useRecordContext } from "react-admin";
import { getSelectionSetName } from "../../../dataProvider/graphqlDataProvider";
import { apolloClient } from "../../apollo/client";

export type DownloadUrlQueryType = TypedDocumentNode<
  Record<string, RequestInfo | URL>,
  Record<string, unknown>
>;

interface UseDownloadFileParams {
  fileNameSource: string;
  downloadUrlQuery?: DownloadUrlQueryType;
  setServerError?: (error?: Error) => void;
}

export const useDownloadFile = ({
  downloadUrlQuery,
  fileNameSource,
  setServerError,
}: UseDownloadFileParams) => {
  const record: RaRecord = useRecordContext();

  const downloadFile = useCallback(async (): Promise<File | null> => {
    if (downloadUrlQuery != null && record[fileNameSource] != null) {
      try {
        if (setServerError != null) {
          setServerError(undefined);
        }
        const selectionSetName: string = getSelectionSetName(downloadUrlQuery);
        const { data } = await apolloClient.query({
          query: downloadUrlQuery,
          variables: {
            id: record["id"],
          },
        });
        const downloadUrl: RequestInfo | URL = data?.[selectionSetName];

        const blob: Blob = await fetch(downloadUrl).then((res: Response) => res.blob());

        const file: File = new File([blob], record[fileNameSource]);
        return file;
      } catch (error) {
        if (setServerError != null) {
          setServerError(new Error("Error while file downloading"));
        }
      }
    }

    return null;
  }, [downloadUrlQuery, setServerError, record, fileNameSource]);

  return downloadFile;
};
