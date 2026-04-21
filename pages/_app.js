export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
          background: radial-gradient(circle at 50% 50%, #111 0%, #000 100%);
          color: white;
          font-family: Arial, sans-serif;
          overflow-x: hidden;
        }

        .glow {
          text-shadow: 0 0 10px gold, 0 0 20px gold;
        }

        .card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 215, 0, 0.2);
          border-radius: 12px;
          padding: 20px;
          margin: 10px 0;
          backdrop-filter: blur(10px);
        }

        .btn {
          padding: 12px 20px;
          background: gold;
          border: none;
          cursor: pointer;
          font-weight: bold;
          border-radius: 8px;
          transition: 0.2s;
        }

        .btn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 15px gold;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>

      <Component {...pageProps} />
    </>
  );
}
