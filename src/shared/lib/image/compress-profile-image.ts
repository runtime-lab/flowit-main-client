import { isAllowedProfileImageFile } from './profile-image-validation';
import { FLOWIT_PROFILE_IMAGE_MAX_SIZE } from './profile-image.constants';
import { ProfileImageSizeError, ProfileImageTypeError } from './profile-image.errors';

const MIN_QUALITY = 0.4;
const QUALITY_STEP = 0.1;
const DIMENSION_SCALE_STEP = 0.85;
const MAX_COMPRESSION_ATTEMPTS = 24;

function loadImageFromFile(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const objectUrl = URL.createObjectURL(file);
        const image = new Image();

        image.onload = () => {
            URL.revokeObjectURL(objectUrl);
            resolve(image);
        };

        image.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject(new Error('Failed to load image'));
        };

        image.src = objectUrl;
    });
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob | null> {
    return new Promise(resolve => {
        canvas.toBlob(blob => resolve(blob), type, quality);
    });
}

async function resizeImageToBlob(
    image: HTMLImageElement,
    mimeType: string,
    maxDimension: number,
    quality?: number,
): Promise<Blob | null> {
    const scale = Math.min(1, maxDimension / image.width, maxDimension / image.height);
    const width = Math.max(1, Math.round(image.width * scale));
    const height = Math.max(1, Math.round(image.height * scale));

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');

    if (!context) {
        return null;
    }

    context.drawImage(image, 0, 0, width, height);

    return canvasToBlob(canvas, mimeType, quality);
}

function replaceExtension(fileName: string, extension: string) {
    const baseName = fileName.replace(/\.[^.]+$/, '') || 'profile-image';

    return `${baseName}${extension}`;
}

async function compressRasterProfileImage(file: File, maxSize: number): Promise<File> {
    const image = await loadImageFromFile(file);
    const outputType = file.type;
    const extension = outputType === 'image/png' ? '.png' : '.jpg';
    let quality = 0.92;
    let maxDimension = Math.max(image.width, image.height);

    for (let attempt = 0; attempt < MAX_COMPRESSION_ATTEMPTS; attempt += 1) {
        const blob = await resizeImageToBlob(
            image,
            outputType,
            maxDimension,
            outputType === 'image/jpeg' ? quality : undefined,
        );

        if (blob && blob.size <= maxSize) {
            return new File([blob], replaceExtension(file.name, extension), {
                type: outputType,
                lastModified: Date.now(),
            });
        }

        if (outputType === 'image/jpeg' && quality > MIN_QUALITY) {
            quality = Math.max(MIN_QUALITY, quality - QUALITY_STEP);
            continue;
        }

        maxDimension = Math.floor(maxDimension * DIMENSION_SCALE_STEP);

        if (maxDimension < 32) {
            break;
        }
    }

    throw new ProfileImageSizeError();
}

export async function compressProfileImage(file: File, maxSize = FLOWIT_PROFILE_IMAGE_MAX_SIZE): Promise<File> {
    if (!isAllowedProfileImageFile(file)) {
        throw new ProfileImageTypeError();
    }

    if (file.size <= maxSize) {
        return file;
    }

    if (file.type === 'image/gif') {
        throw new ProfileImageSizeError();
    }

    return compressRasterProfileImage(file, maxSize);
}
