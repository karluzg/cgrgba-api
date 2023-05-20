import fs from 'fs';
import zlib from 'zlib';

export class ImageConverter {
  public static convertToBase64(filePath: string): string {
    // Read the file content as a buffer
    const fileBuffer = fs.readFileSync(filePath);

    // Compress the file buffer using zlib
    const compressedBuffer = zlib.gzipSync(fileBuffer);

    // Convert the compressed buffer to a base64-encoded string
    const base64String = compressedBuffer.toString('base64');

    return base64String;
  }
}