const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-flexitype-blue/10 to-flexitype-blue/5 rounded-full blur-xl animate-pulse"></div>
      <div
        className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-flexitype-blue/15 to-flexitype-blue/8 rounded-full blur-lg animate-bounce"
        style={{ animationDuration: "3s" }}
      ></div>
      <div
        className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-flexitype-blue/8 to-flexitype-blue/3 rounded-full blur-2xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-flexitype-blue/12 to-flexitype-blue/6 rounded-full blur-xl animate-bounce"
        style={{ animationDuration: "4s", animationDelay: "2s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 w-20 h-20 bg-gradient-to-br from-flexitype-blue/20 to-flexitype-blue/10 rounded-full blur-lg animate-pulse"
        style={{ animationDelay: "0.5s" }}
      ></div>

      <div
        className="absolute top-10 right-10 w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-cyan-400/5 rounded-full blur-md animate-pulse"
        style={{ animationDelay: "3s" }}
      ></div>
      <div
        className="absolute bottom-10 left-10 w-36 h-36 bg-gradient-to-br from-flexitype-blue/6 to-flexitype-blue/2 rounded-full blur-2xl animate-bounce"
        style={{ animationDuration: "5s" }}
      ></div>
      <div
        className="absolute top-1/3 right-1/4 w-12 h-12 bg-gradient-to-br from-cyan-400/25 to-cyan-400/10 rounded-full blur-sm animate-pulse"
        style={{ animationDelay: "1.5s" }}
      ></div>
      <div
        className="absolute bottom-1/3 left-1/3 w-22 h-22 bg-gradient-to-br from-flexitype-blue/18 to-flexitype-blue/8 rounded-full blur-lg animate-bounce"
        style={{ animationDuration: "6s", animationDelay: "0.5s" }}
      ></div>
    </div>
  );
};

export default FloatingElements;
