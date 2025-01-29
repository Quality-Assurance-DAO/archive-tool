import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from '../context/AuthContext';
import Nav from '../components/nav'

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <AuthProvider>
      <div className="main">
        <div className="nav">
          <div>
            <Nav />
          </div>
        </div>
        <div className="component">
          <Component {...pageProps} />
        </div>
      </div>
    </AuthProvider>
  );
}

export default MyApp;
