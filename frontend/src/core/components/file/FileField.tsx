import { Link, LinkBaseProps } from "@mui/material";
import { MouseEventHandler, useCallback } from "react";
import { RaRecord, useNotify, useRecordContext } from "react-admin";
import { DownloadUrlQueryType, useDownloadFile } from "./useDownloadFile";

export interface FileFieldProps<DQT extends DownloadUrlQueryType = any> extends LinkBaseProps {
  source: string;
  downloadUrlQuery: DQT;
}

export const FileField = (props: FileFieldProps) => {
  const { downloadUrlQuery, source, ...rest } = props;
  const record: RaRecord = useRecordContext();
  const notify = useNotify();

  const filename: string = record[source];

  const downloadFile = useDownloadFile({
    downloadUrlQuery,
    fileNameSource: source,
  });

  const handleDownload = useCallback<MouseEventHandler<HTMLAnchorElement>>(
    async (e): Promise<void> => {
      e.stopPropagation();

      const file: File | null = await downloadFile();

      if (file != null) {
        const anchor: HTMLAnchorElement = document.createElement("a");
        anchor.href = window.URL.createObjectURL(file);
        anchor.download = filename;
        anchor.click();
      } else {
        notify("Error while downloading file", { type: "error" });
      }
    },
    [downloadFile, filename, notify]
  );

  return (
    <Link style={{ cursor: "pointer" }} onClick={handleDownload} {...rest}>
      {filename}
    </Link>
  );
};
