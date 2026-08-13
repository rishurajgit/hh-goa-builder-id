"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import "./page.css";

const BUILDER_TITLES = [
  "CODE WIZARD",
  "PIXEL PIRATE",
  "SHIP CAPTAIN",
  "BUG HUNTER",
  "API ALCHEMIST",
  "STACK SORCERER",
  "PRODUCT PIRATE",
  "DEPLOYMENT DEMON",
  "CLOUD NOMAD",
  "AI ARCHITECT",
  "FRONTEND FREAK",
  "BACKEND BOSS",
  "DEBUGGING DJ",
  "CODE ALCHEMIST",
  "SHIP IT SHAMAN",
];

export default function Home() {
  const cardRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [role, setRole] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);

  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const canGenerate =
    Boolean(photo) &&
    name.trim().length > 0 &&
    title.trim().length > 0 &&
    role.trim().length > 0;

  function rollTitle() {
    const randomIndex = Math.floor(
      Math.random() * BUILDER_TITLES.length
    );

    setTitle(BUILDER_TITLES[randomIndex]);
  }

  function handlePhoto(file: File) {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setPhoto(reader.result as string);
    };

    reader.onerror = () => {
      alert("Could not read this image. Please try another one.");
    };

    reader.readAsDataURL(file);
  }

  async function generateCardImage() {
    if (!cardRef.current) {
      throw new Error("Card element not found.");
    }

    return await toPng(cardRef.current, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: "#0b4822",
    });
  }

  async function downloadCard() {
    if (!canGenerate || isDownloading) {
      return;
    }

    try {
      setIsDownloading(true);

      const dataUrl = await generateCardImage();

      const safeName =
        name
          .trim()
          .replace(/[^a-zA-Z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
          .toLowerCase() || "builder";

      const link = document.createElement("a");

      link.download = `${safeName}-hh-goa-2026.png`;
      link.href = dataUrl;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Could not generate the card. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  }

  async function uploadCard(dataUrl: string) {
    const response = await fetch(dataUrl);

    if (!response.ok) {
      throw new Error("Failed to create image blob.");
    }

    const blob = await response.blob();

    const safeName =
      name
        .trim()
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .toLowerCase() || "builder";

    const file = new File(
      [blob],
      `${safeName}-hh-goa-2026.png`,
      {
        type: "image/png",
      }
    );

    const formData = new FormData();

    formData.append("file", file);

    const uploadResponse = await fetch(
      "/api/upload-card",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!uploadResponse.ok) {
      let errorMessage = "Failed to upload card.";

      try {
        const errorData = await uploadResponse.json();

        if (errorData?.error) {
          errorMessage = errorData.error;
        }
      } catch {
        // Ignore JSON parsing errors.
      }

      throw new Error(errorMessage);
    }

    const result = await uploadResponse.json();

    if (!result.url) {
      throw new Error(
        "Upload succeeded but no public URL was returned."
      );
    }

    return result.url as string;
  }

  async function shareCard() {
    if (!canGenerate || isSharing) {
      return;
    }

    try {
      setIsSharing(true);

      const dataUrl = await generateCardImage();

      const response = await fetch(dataUrl);

      if (!response.ok) {
        throw new Error("Could not convert generated card.");
      }

      const blob = await response.blob();

      const safeName =
        name
          .trim()
          .replace(/[^a-zA-Z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
          .toLowerCase() || "builder";

      const file = new File(
        [blob],
        `${safeName}-hh-goa-2026.png`,
        {
          type: "image/png",
        }
      );

      /*
       * Mobile / supported browsers:
       * Share the actual generated image.
       */
      if (
        typeof navigator !== "undefined" &&
        navigator.share &&
        navigator.canShare &&
        navigator.canShare({
          files: [file],
        })
      ) {
        await navigator.share({
          title: "My Hacker House Goa 2026 Builder ID",
          text:
            "I built my Hacker House Goa 2026 Builder ID! #FrameInGoa",
          files: [file],
        });

        return;
      }

      /*
       * Desktop:
       * Upload the generated image to Vercel Blob.
       */
      const cardUrl = await uploadCard(dataUrl);

      /*
       * Temporary X fallback.
       */
      const tweetText = encodeURIComponent(
        `I built my Hacker House Goa 2026 Builder ID! #FrameInGoa\n\n${cardUrl}`
      );

      window.open(
        `https://x.com/intent/post?text=${tweetText}`,
        "_blank",
        "noopener,noreferrer"
      );
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        return;
      }

      console.error("Share failed:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Could not share the Builder ID."
      );
    } finally {
      setIsSharing(false);
    }
  }

  return (
    <main className="page">
      <section className="hero">
        <div className="brand">
          <div className="brand-small">
            HACKER
            <br />
            HOUSE
          </div>

          <h1>BUILDER ID</h1>
        </div>

        <p className="subtitle">
          Drop in a photo, name yourself, and walk away with a Hacker
          <br />
          House Goa 2026 badge built for the timeline.
        </p>
      </section>

      <section className="workspace">
        <div
          className="card-preview"
          ref={cardRef}
        >
          <div className="card-background">
            <div className="card-brand">
              <span>HACKER</span>
              <span>HOUSE</span>
            </div>

            <div className="location">
              GOA, INDIA
              <span>✦</span>
            </div>

            <div className="sun" />

            <div className="palm palm-one">
              🌴
            </div>

            <div className="palm palm-two">
              🌴
            </div>

            <div className="badge">
              <div className="badge-photo">
                {photo ? (
                  <img
                    src={photo}
                    alt="Uploaded profile"
                  />
                ) : (
                  <div className="photo-placeholder" />
                )}
              </div>

              <div className="badge-info">
                <div>
                  <span>NAME</span>

                  <strong>
                    {name.trim() || "YOUR NAME"}
                  </strong>
                </div>

                <div>
                  <span>BUILDER TITLE</span>

                  <strong>
                    {title.trim() || "BUILDER TITLE"}
                  </strong>
                </div>

                <div>
                  <span>ROLE</span>

                  <strong>
                    {role.trim() || "YOUR ROLE / STACK"}
                  </strong>
                </div>
              </div>

              <div className="approved">
                <span>APPROVED</span>

                <strong>GOA 2026</strong>
              </div>
            </div>

            <div className="street-signs">
              <span>BUILD</span>
              <span>SHIP</span>
              <span>LAUNCH</span>
              <span>REPEAT</span>
            </div>
          </div>
        </div>

        <div className="controls">
          <label className="upload-box">
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
              onChange={(event) => {
                const file = event.target.files?.[0];

                if (file) {
                  handlePhoto(file);
                }
              }}
            />

            <span className="upload-button">
              {photo
                ? "CHANGE YOUR PHOTO"
                : "UPLOAD YOUR PHOTO"}
            </span>

            <span className="upload-help">
              JPG, PNG, WebP or HEIC — straight off your phone is fine.
            </span>
          </label>

          <div className="details-box">
            <h2>YOUR DETAILS</h2>

            <label>
              NAME

              <input
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="Your name"
                maxLength={40}
              />
            </label>

            <label>
              BUILDER TITLE

              <div className="title-row">
                <input
                  type="text"
                  value={title}
                  onChange={(event) =>
                    setTitle(event.target.value)
                  }
                  placeholder="Your builder title"
                  maxLength={30}
                />

                <button
                  type="button"
                  onClick={rollTitle}
                >
                  ROLL
                </button>
              </div>
            </label>

            <label>
              ROLE / STACK

              <input
                type="text"
                value={role}
                onChange={(event) =>
                  setRole(event.target.value)
                }
                placeholder="Frontend / AI / Backend..."
                maxLength={40}
              />
            </label>
          </div>

          <div className="actions">
            <button
              type="button"
              className="download"
              disabled={!canGenerate || isDownloading}
              onClick={downloadCard}
            >
              {isDownloading
                ? "GENERATING..."
                : "DOWNLOAD CARD"}
            </button>

            <button
              type="button"
              className="share"
              disabled={!canGenerate || isSharing}
              onClick={shareCard}
            >
              {isSharing
                ? "PREPARING..."
                : "SHARE ON X"}
            </button>
          </div>

          <p className="unlock">
            {!photo
              ? "Add a photo and your details to unlock download and share."
              : !name.trim()
                ? "Add your name to unlock download and share."
                : !title.trim()
                  ? "Add a builder title or use ROLL."
                  : !role.trim()
                    ? "Add your role or stack to continue."
                    : "Your Builder ID is ready to download or share."}
          </p>
        </div>
      </section>
    </main>
  );
}