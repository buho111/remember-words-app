import { useState, useEffect } from "react";
import type { ConfigItem } from "../../types";

export function ConfigPage() {
  const defaultData: ConfigItem[] = [];
  const [rangeStart, setRangeStart] = useState<string>("1");
  const [rangeEnd, setRangeEnd] = useState<string>("");
  const [placeholderStart, setPlaceholderStart] = useState<string>("1");
  const [placeholderEnd, setPlaceholderEnd] = useState<string>("");

  const [data, setData] = useState<ConfigItem[]>(() => {
    const saved = localStorage.getItem("configWordsData");
    return saved ? JSON.parse(saved) : defaultData;
  });

  useEffect(() => {
    const savedStart = localStorage.getItem("configWordsDataRangeStart");
    const savedEnd = localStorage.getItem("configWordsDataRangeEnd");
    
    if (savedStart) {
      setPlaceholderStart(savedStart);
      setRangeStart(savedStart);
    } else {
      setPlaceholderStart("1");
      setRangeStart("1");
    }
    
    if (savedEnd) {
      setPlaceholderEnd(savedEnd);
      setRangeEnd(savedEnd);
    } else {
      setPlaceholderEnd(data.length.toString());
      setRangeEnd(data.length.toString());
    }
  }, [data.length]);

  const saveData = (data: ConfigItem[]) => {
    localStorage.setItem("configWordsData", JSON.stringify(data));
    setData(data);
    // Initialize range end when data is loaded
    if (data.length > 0) {
      setRangeEnd(data.length.toString());
    }
  };

  const clearData = () => {
    localStorage.removeItem("configWordsData");
    localStorage.removeItem("configWordsDataRangeStart");
    localStorage.removeItem("configWordsDataRangeEnd");
    setData(defaultData);
    setRangeStart("1");
    setRangeEnd("");
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

  const handleRangeStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers
    if (value === "" || /^\d+$/.test(value)) {
      setRangeStart(value);
    }
  };

  const handleRangeEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers
    if (value === "" || /^\d+$/.test(value)) {
      setRangeEnd(value);
    }
  };

  const handleRangeSetting = () => {
    // Validation
    if (rangeStart === "" || rangeEnd === "") {
      alert("開始と終了の値を入力してください。");
      setRangeStart(placeholderStart);
      setRangeEnd(placeholderEnd);
      return;
    }

    const start = parseInt(rangeStart, 10);
    const end = parseInt(rangeEnd, 10);

    // Check valid ranges
    if (start < 1 || start > data.length) {
      alert(`開始は1から${data.length}の範囲で入力してください。`);
      setRangeStart(placeholderStart);
      setRangeEnd(placeholderEnd);
      return;
    }

    if (end < 1 || end > data.length) {
      alert(`終了は1から${data.length}の範囲で入力してください。`);
      setRangeStart(placeholderStart);
      setRangeEnd(placeholderEnd);
      return;
    }

    if (start > end) {
      alert("開始は終了以下である必要があります。");
      setRangeStart(placeholderStart);
      setRangeEnd(placeholderEnd);
      return;
    }

    // All validation passed
    localStorage.setItem("configWordsDataRangeStart", rangeStart);
    localStorage.setItem("configWordsDataRangeEnd", rangeEnd);
    alert(`出題範囲を設定しました: ${rangeStart}~${rangeEnd}`);
  };

  return (
    <div 
      style={{ 
        padding: 20, 
        paddingTop: 80,
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 25%, #1e1b4b 50%, #0f172a 75%, #1e3a8a 100%)',
        backgroundAttachment: 'fixed',
      }}
    >
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
      {data.length > 0 && (
        <div className="mb-8 p-6 bg-gradient-to-br from-blue-900 to-purple-900 bg-opacity-50 rounded-xl border border-blue-500 border-opacity-30 backdrop-blur-sm shadow-lg">
          <p className="text-xl font-bold mb-4 text-blue-300">出題範囲</p>
          <div className="flex gap-4 items-center justify-between">
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-2">
                <label htmlFor="range-start" className="text-blue-300 font-semibold">開始:</label>
                <input
                  id="range-start"
                  type="text"
                  value={rangeStart}
                  onChange={handleRangeStartChange}
                  placeholder={placeholderStart}
                  className="w-20 bg-slate-800 border border-blue-400 border-opacity-30 rounded px-3 py-2 text-blue-300 placeholder-blue-600 focus:outline-none focus:border-blue-300 transition text-center font-semibold"
                />
              </div>
              <div className="text-blue-300 font-bold">~</div>
              <div className="flex items-center gap-2">
                <label htmlFor="range-end" className="text-blue-300 font-semibold">終了:</label>
                <input
                  id="range-end"
                  type="text"
                  value={rangeEnd}
                  onChange={handleRangeEndChange}
                  placeholder={placeholderEnd}
                  className="w-20 bg-slate-800 border border-blue-400 border-opacity-30 rounded px-3 py-2 text-blue-300 placeholder-blue-600 focus:outline-none focus:border-blue-300 transition text-center font-semibold"
                />
              </div>
              <span className="text-blue-400 text-sm">
                (1~{data.length}の範囲で入力)
              </span>
            </div>
            <button
              type="button"
              onClick={handleRangeSetting}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105 font-bold border-2 border-cyan-400 border-opacity-50"
            >
              設定
            </button>
          </div>
        </div>
      )}
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
