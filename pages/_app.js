import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-bodyBg h-[full]">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
