import "./App.css";
import { Humberger } from "./components/atoms/Humberger";

type Props = { children: React.ReactNode };

export function App({ children }: Props) {
  return (
    <div 
      className="min-h-screen w-full h-fit text-gray-800 overflow-x-hidden"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 25%, #1e1b4b 50%, #0f172a 75%, #1e3a8a 100%)',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="fixed top-2 sm:top-4 right-2 sm:right-4 z-10">
        <Humberger />
      </div>
      {children}
    </div>
  );
}
