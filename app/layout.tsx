import { Toaster } from 'sonner';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Provider from '@/utils/Providers';
import '@/assets/styles/globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Todo List APP',
  description:
    'Create, manage, and track your tasks with the Todo List App. Add, delete tasks, and enjoy seamless, fast interactions with optimized updates.',
  keywords: 'todo list, create tasks, task management',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Provider>{children}</Provider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2000,
          }}
        />
      </body>
    </html>
  );
}
