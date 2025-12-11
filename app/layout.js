import "./globals.css";

export const metadata = {
  title: "HangoutHub",
  description: "Plan and share hangouts!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-white">
        {children}
      </body>
    </html>
  );
}
