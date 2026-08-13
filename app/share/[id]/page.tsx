import type { Metadata } from "next";

interface SharePageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: SharePageProps): Promise<Metadata> {
  const { id } = await params;

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000";

  const imageUrl =
    `${appUrl}/api/share-image/${id}`;

  return {
    title: "My Hacker House Goa 2026 Builder ID",

    description:
      "I built my Hacker House Goa 2026 Builder ID! #FrameInGoa",

    openGraph: {
      title: "My Hacker House Goa 2026 Builder ID",

      description:
        "I built my Hacker House Goa 2026 Builder ID! #FrameInGoa",

      type: "website",

      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 1600,
          alt: "Hacker House Goa 2026 Builder ID",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title: "My Hacker House Goa 2026 Builder ID",

      description:
        "I built my Hacker House Goa 2026 Builder ID! #FrameInGoa",

      images: [imageUrl],
    },
  };
}

export default function SharePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0b4822",
        color: "#f5e21d",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        HACKER HOUSE
      </h1>

      <p
        style={{
          color: "#f0efd0",
          textAlign: "center",
          maxWidth: "500px",
        }}
      >
        Hacker House Goa 2026 Builder ID
      </p>
    </main>
  );
}