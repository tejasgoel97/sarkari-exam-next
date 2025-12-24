import { NextResponse } from "next/server";
import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

function getMonthFolder() {
  const d = new Date();
  return (
    d.toLocaleString("en-US", { month: "short" }).toLowerCase() +
    "-" +
    d.getFullYear()
  );
}

/* ---------- UPLOAD IMAGE ---------- */
export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const slug = formData.get("slug") as string | null;

  if (!file || !slug) {
    return NextResponse.json(
      { error: "Image file and slug are required" },
      { status: 400 }
    );
  }

  const ext = file.name.split(".").pop();
  const folder = getMonthFolder();
  const key = `${folder}/${slug}.${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    })
  );

  const url = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

  return NextResponse.json({ url, key });
}

/* ---------- LIST ALL IMAGES ---------- */
export async function GET() {
  const data = await s3.send(
    new ListObjectsV2Command({
      Bucket: process.env.AWS_S3_BUCKET!,
      MaxKeys: 1000,
    })
  );

  const images =
    data.Contents?.filter((o) => o.Key && !o.Key.endsWith("/")).map((o) => {
      const [folder, filename] = o.Key!.split("/");
      return {
        folder,
        filename,
        key: o.Key,
        url: `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${o.Key}`,
      };
    }) || [];

  return NextResponse.json(images);
}
