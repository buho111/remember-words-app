export function AboutPage() {
  return (
    <div 
      className="flex items-center justify-center min-h-screen px-4"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 25%, #1e1b4b 50%, #0f172a 75%, #1e3a8a 100%)',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="bg-gradient-to-br from-blue-900 to-purple-900 bg-opacity-50 rounded-2xl shadow-2xl p-8 max-w-md text-center border border-blue-500 border-opacity-30 backdrop-blur-sm">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
          このサイトについて
        </h1>
        <p className="text-blue-300 leading-relaxed text-lg">
          このページは英単語を覚えるためのサイトです。
          <br />
          <br />
          英単語と日本語を登録して、クイズ形式で覚えることができます。
        </p>
      </div>
    </div>
  );
}
