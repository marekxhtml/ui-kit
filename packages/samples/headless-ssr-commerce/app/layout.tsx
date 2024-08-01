export const metadata = {
  title: 'Headless SSR examples',
  description:
    'Examples of using framework agnostic @coveo/headless/ssr-commerce',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
