import { useContext, useCallback } from 'react';
import imageCompression from 'browser-image-compression';
import { useS3Upload } from 'next-s3-upload';
import { AppContext } from '@Pages/_app';

interface CompressionOptions {
    maxSizeMB?: number;
    maxWidthOrHeight?: number;
    onProgress?: (progress: number) => void;
    useWebWorker?: boolean;
    libURL?: string;
    preserveExif?: boolean;
    signal?: AbortSignal;
    maxIteration?: number;
    exifOrientation?: number;
    fileType?: string;
    initialQuality?: number;
    alwaysKeepResolution?: boolean;
}

export const useImageCompressAndUpload = (dependency: any[] = []) => {
    const { uploadToS3 } = useS3Upload();
    const { myDatabaseId } = useContext(AppContext);
    const compressAndUploadToS3 = useCallback(
        async (
            sort: string,
            file: File,
            compressionOptions: CompressionOptions,
        ) => {
            let resizedImageFile = file;

            const fileType =
                file.type || file.name.split('.').pop()?.toLowerCase();
            if (
                fileType !== 'image/gif' &&
                fileType !== 'image/tiff' &&
                fileType !== 'heic' &&
                fileType !== 'heif'
            ) {
                const resizedImageBlob = await imageCompression(
                    file,
                    compressionOptions,
                );
                resizedImageFile = new File([resizedImageBlob], file.name, {
                    type: file.type,
                });
            }
            const { url } = await uploadToS3(
                resizedImageFile.size < file.size ? resizedImageFile : file,
                {
                    endpoint: {
                        request: {
                            headers: {},
                            body: {
                                type: 'user-images',
                                myDatabaseId,
                                sort,
                            },
                        },
                    },
                },
            );
            return url;
        },
        [...dependency, myDatabaseId],
    );

    const compressAndUploadToS3Multiple = useCallback(
        // 미완성
        async (
            sort: string,
            files: File[],
            compressionOptions: CompressionOptions,
        ) => {
            const urls: string[] = await Promise.all(
                files.map((file, index) =>
                    compressAndUploadToS3(sort, file, compressionOptions),
                ),
            );

            return urls;
        },
        [...dependency, myDatabaseId],
    );

    return { compressAndUploadToS3, compressAndUploadToS3Multiple };
};
