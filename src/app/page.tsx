export default function Home() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <a
        className="px-3 py-2 bg-green-500 rounded text-white font-medium flex items-center"
        href="/login"
      >
        <span className="text-lg">Login</span>
      </a>
    </div>
  );
}
