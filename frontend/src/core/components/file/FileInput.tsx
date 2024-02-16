import { useEffect, useState } from "react";
import {
  FieldTitle,
  FileField as RaFileField,
  FileInput as RaFileInput,
  FileInputProps as RaFileInputProps,
  Validator,
} from "react-admin";
import { useFormContext } from "react-hook-form";
import { privateFileSourcePrefix } from "../../../dataProvider/filterFilesFromData";
import { DownloadUrlQueryType, useDownloadFile } from "./useDownloadFile";
import { UploadUrlQueryType, useUploadFile } from "./useUploadFile";

interface TransformedFile {
  rawFile: File;
  src: string;
  title: string;
}
const transformFile = (file: File): TransformedFile => {
  const preview: string = URL.createObjectURL(file);
  const transformedFile: TransformedFile = {
    rawFile: file,
    src: preview,
    title: file.name,
  };
  return transformedFile;
};

// 50_000_000 equals to 50MB
const MAX_FILE_SIZE_IN_BYTES: number = 50_000_000;

export interface FileInputProps<
  UQT extends UploadUrlQueryType = any,
  DQT extends DownloadUrlQueryType = any,
> extends Omit<RaFileInputProps, "source"> {
  fileIdSource: string;
  fileNameSource?: string;
  uploadUrlQuery: UQT;
  downloadUrlQuery?: DQT;
}

export function FileInput({
  fileIdSource,
  fileNameSource,
  uploadUrlQuery,
  downloadUrlQuery,
  validate,
  ...props
}: FileInputProps) {
  const { setValue, watch } = useFormContext();
  const [file, setFile] = useState<TransformedFile>();
  const [loading, setLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<Error>();

  // privateFileSource contains private file data that will be filtered by dataProvider
  // record can have more than one file it means that privateFileSource should be uniq.
  // To make privateFileSource uniq we create it based on fileIdSource
  const privateFileSource: string = `${privateFileSourcePrefix}#${fileIdSource}`;

  const fileTitleValue = watch(`${privateFileSource}.title`);

  const uploadFile = useUploadFile({
    uploadUrlQuery,
    setServerError,
  });

  const downloadFile = useDownloadFile({
    fileNameSource: fileNameSource ?? fileIdSource,
    downloadUrlQuery,
    setServerError,
  });

  useEffect(() => {
    downloadFile().then((downloadedFile: File | null): void => {
      if (downloadedFile) {
        setFile(transformFile(downloadedFile));
      }
    });
  }, [downloadFile, setValue]);

  // if server return error we need to trigger validation to show it inside component
  useEffect(() => {
    if (serverError != null) {
      setValue(privateFileSource, undefined, {
        shouldTouch: true,
        shouldValidate: true,
      });
    }
  }, [serverError, privateFileSource, setValue]);

  const fileInputValidate: Validator[] = [
    () => serverError?.message,
    ...(Array.isArray(validate) ? validate : validate != null ? [validate] : []),
  ];

  const onDrop = async (acceptedFiles: File[]): Promise<void> => {
    const file: File = acceptedFiles[0];

    setLoading(true);
    const uploadFileResult: { fileId: number } | undefined = await uploadFile(file);
    if (uploadFileResult != null) {
      setValue(fileIdSource, uploadFileResult.fileId);
      if (fileNameSource != null) {
        setValue(fileNameSource, file.name);
      } else {
        setValue(privateFileSource, {
          ...transformFile(file),
          title: uploadFileResult.fileId,
        });
      }
    }
    setLoading(false);
  };

  const onRemove = () => {
    setValue(fileIdSource, undefined);
    if (fileNameSource != null) {
      setValue(fileNameSource, undefined);
    }
  };

  return (
    <RaFileInput
      label={
        <FieldTitle
          label={props.label}
          source={fileNameSource ?? fileIdSource}
          resource={props.resource}
          isRequired={props.isRequired}
        />
      }
      defaultValue={file}
      validate={fileInputValidate}
      // set max file size (in bytes)
      maxSize={MAX_FILE_SIZE_IN_BYTES}
      multiple={false}
      onRemove={onRemove}
      // FileInput works with private source inside
      source={privateFileSource}
      {...props}
      options={{
        onDrop,
        ...props.options,
      }}
    >
      {loading ? <>...</> : <RaFileField source="src" title="title" download={fileTitleValue} />}
    </RaFileInput>
  );
}
