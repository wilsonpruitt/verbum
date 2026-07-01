import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://verbum.wrootpress.com"),
  title: "Verbum · Wroot Press",
  description:
    "Scripture read by sound. A reader's lens that sets the Hebrew beside the English and keys the words that play against each other — surfacing the puns, name-plays, and sound-echoes the translation flattens.",
  openGraph: {
    title: "Verbum · Wroot Press",
    description:
      "Scripture read by sound. The Hebrew puns and name-plays the English can't carry, set beside the text and made visible.",
    siteName: "Verbum",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Verbum · Wroot Press",
    description: "Scripture read by sound — a Wroot Press reading lens.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, background: "#f5f0e8" }}>{children}</body>
    </html>
  );
}
