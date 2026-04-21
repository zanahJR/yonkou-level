export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
          background: radial-gradient(circle at center, #111, #000);
          color: white;
          font-family: Arial, sans-serif;
          overflow-x: hidden;
        }

        /* 🌊 Fondo animado */
        body::before {
          content: "";
          position: fixed;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,215,0,0.1), transparent 60%);
          animation: moveBg 10s linear infinite;
          z-index: -1;
        }

        @keyframes moveBg {
          0% { transform: translate(0,0); }
          50% { transform: translate(-50px, -50px); }
          100% { transform: translate(0,0); }
        }

        /* ✨ Partículas */
        body::after {
          content: "";
          position: fixed;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(white 1px, transparent 1px);
          background-size: 40px 40px;
          opacity: 0.05;
          animation: moveParticles 20s linear infinite;
          z-index: -1;
        }

        @keyframes moveParticles {
          0% { transform: translateY(0); }
          100% { transform: translateY(-100px); }
        }

        .glow {
          text-shadow: 0 0 10px gold, 0 0 20px gold;
        }

        /* 🎮 Cards */
        .card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,215,0,0.2);
          border-radius: 12px;
          padding: 20px;
          margin: 10px 0;
          backdrop-filter: blur(10px);
          transition: 0.3s;
        }

        .card:hover {
          transform: scale(1.03);
          box-shadow: 0 0 20px rgba(255,215,0,0.3);
        }

        /* 🔥 Botones */
        .btn {
          padding: 14px 24px;
          background: linear-gradient(135deg, gold, orange);
          border: none;
          cursor: pointer;
          font-weight: bold;
          border-radius: 10px;
          transition: 0.2s;
          box-shadow: 0 0 10px rgba(255,215,0,0.5);
        }

        .btn:hover {
          transform: scale(1.1);
          box-shadow: 0 0 25px gold;
        }
      `}</style>

      <Component {...pageProps} />
    </>
  );
}
