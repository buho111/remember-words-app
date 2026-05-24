import { useState } from "react";
import type { ConfigItem } from "../../types";

export function ConfigPage() {
  const defaultData: ConfigItem[] = [];

  const [data, setData] = useState<ConfigItem[]>(() => {
    const saved = localStorage.getItem("configWordsData");
    return saved ? JSON.parse(saved) : defaultData;
  });

  const saveData = (data: ConfigItem[]) => {
    localStorage.setItem("configWordsData", JSON.stringify(data));
    setData(data);
  };

  const clearData = () => {
    localStorage.removeItem("configWordsData");
    setData(defaultData);
    // Reset file input
    (document.getElementById("json-upload") as HTMLInputElement).value = "";
  };

  const uploadJson = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          if (
            Array.isArray(json) &&
            json.every(
              (item) =>
                typeof item.no === "number" &&
                typeof item.word === "string" &&
                typeof item.meaning === "string",
            )
          ) {
            saveData(json);
            alert("データが保存されました。");
          } else {
            alert("無効なJSON形式です。");
          }
        } catch (_err) {
          alert("JSONのパースに失敗しました。");
        }
      };
      reader.readAsText(file);
    }
    // Reset input
    event.target.value = "";
  };

  const handleUploadClick = () => {
    (document.getElementById("json-upload") as HTMLInputElement)?.click();
  };

  return (
    <div style={{ padding: 20, paddingTop: 80 }}>
      <p className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
        単語一覧を登録してください
      </p>
      <div className="mb-6 flex gap-3">
        <input
          type="file"
          accept=".json"
          onChange={uploadJson}
          className="hidden"
          id="json-upload"
        />
        <button
          type="button"
          onClick={handleUploadClick}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105 font-bold border-2 border-purple-400 border-opacity-50"
        >
          JSONアップロード
        </button>
        <button
          type="button"
          onClick={clearData}
          className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105 font-bold border-2 border-red-400 border-opacity-50"
        >
          クリア
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <div
            key={item.no}
            className="bg-gradient-to-br from-blue-900 to-purple-900 bg-opacity-50 rounded-xl shadow-lg p-4 hover:shadow-xl transition border border-blue-500 border-opacity-30 backdrop-blur-sm"
          >
            <div className="flex items-center mb-3">
              <span className="font-bold text-blue-400 mr-2">#{item.no}</span>
            </div>
            <div className="mb-4">
              <input
                defaultValue={item.word}
                className="mt-2 w-full bg-slate-800 border border-blue-400 border-opacity-30 rounded px-3 py-2 text-sm text-blue-300 placeholder-blue-600 focus:outline-none focus:border-blue-300 transition"
                placeholder="単語"
              />
            </div>
            <input
              defaultValue={item.meaning}
              className="w-full bg-slate-800 border border-blue-400 border-opacity-30 rounded px-3 py-2 text-sm text-blue-300 placeholder-blue-600 focus:outline-none focus:border-blue-300 transition"
              placeholder="意味"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
