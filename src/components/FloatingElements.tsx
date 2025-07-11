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
    </div>
  );
};

export default FloatingElements;
