// Main App Layout with Clerk Authentication
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

export const metadata = {
  title: 'FullStack Studio - AI-Powered Development Platform',
  description: 'Multi-agent development platform with GitHub, Vercel, and team collaboration',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
