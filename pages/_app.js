import Header from '../components/Header';
import '../styles/globals.css';
import './../components/Thumbnail/styles.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
