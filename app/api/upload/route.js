import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
    try {
        const data = await req.formData();
        const file = data.get("file");

        if (!file) return Response.json({ error: "No file uploaded" }, { status: 400 });

        // Convert to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to Cloudinary
        const uploadRes = await new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream({ folder: "hangouthub" }, (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                })
                .end(buffer);
        });

        return Response.json({ url: uploadRes.secure_url });
    } catch (err) {
        console.log("Upload Error:", err);
        return Response.json({ error: "Upload failed" }, { status: 500 });
    }
}
