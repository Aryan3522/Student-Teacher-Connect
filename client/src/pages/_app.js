import { Toaster } from 'sonner';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Toaster richColors />
      <Component {...pageProps} />
    </>
  );
}
