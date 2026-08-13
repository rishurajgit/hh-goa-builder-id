import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No file provided." },
        { status: 400 }
      );
    }

    if (file.type !== "image/png") {
      return NextResponse.json(
        { error: "Only PNG files are allowed." },
        { status: 400 }
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File is too large." },
        { status: 400 }
      );
    }

    const id = crypto.randomUUID();

    const filename = `builder-cards/${id}.png`;

    const blob = await put(filename, file, {
      access: "public",
      addRandomSuffix: false,
    });

    return NextResponse.json({
      id,
      url: blob.url,
    });
  } catch (error) {
    console.error("Card upload error:", error);

    return NextResponse.json(
      {
        error: "Failed to upload Builder ID.",
      },
      {
        status: 500,
      }
    );
  }
}