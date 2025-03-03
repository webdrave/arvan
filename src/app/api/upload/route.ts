import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";

// Cloudinary Configuration
cloudinary.v2.config({
  cloud_name: "dk8ktsnp0",
  api_key: "147789248934291",
  api_secret: "86MlUcIX3ENeXww1mgNhYuUZQ4w",
});

export async function POST(req: NextRequest) {
  try {
    // Parse incoming form data
    const formData = await req.formData();
    const file = formData.get("file") as Blob | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert Blob to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary using a promise wrapper
    const uploadResult = await new Promise<cloudinary.UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        { resource_type: "auto", folder: "uploads", timeout: 600000 },
        (error, result) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error);
            reject(error);
          } else {
            resolve(result!);
          }
        }
      );

      uploadStream.end(buffer);
    });

    console.log("Upload Result:", uploadResult);
    return NextResponse.json({ url: uploadResult.secure_url });
  } catch (error) {
    console.error("Unexpected Upload Error:", error);
    return NextResponse.json({ error: "Upload failed, please try again." }, { status: 500 });
  }
}
