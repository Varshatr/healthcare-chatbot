import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatbotWidget from '@/components/ChatbotWidget';
import hospitalData from '@/data/hospitalData.json';

export const metadata: Metadata = {
  title: `${hospitalData.hospitalInfo.name} | Compassionate Healthcare & Enquiry`,
  description: `${hospitalData.hospitalInfo.tagline}. Multi-specialty hospital with 24/7 Emergency, Cardiology, Neurology, Orthopedics, Pediatrics and online appointment booking.`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-sky-200 selection:text-sky-900">
        {/* Skip to Main Content Link for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:p-3 focus:bg-sky-700 focus:text-white focus:rounded-lg focus:font-bold focus:shadow-xl"
        >
          Skip to main content
        </a>

        {/* Global Header */}
        <Header />

        {/* Main Content Area */}
        <main id="main-content" className="flex-1">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Floating Chatbot Widget on Every Page */}
        <ChatbotWidget />
      </body>
    </html>
  );
}
