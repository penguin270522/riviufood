const LoadingScreen = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-[999999] overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-blue-600 loader"></div>
    </div>
  );
};

export default LoadingScreen;
