import { useEffect, useState } from "react";
import type { ConfigItem } from "../../types";

export function FourChoice() {
  const [data, setData] = useState<ConfigItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<ConfigItem | null>(null);
  const [options, setOptions] = useState<ConfigItem[]>([]);
  const [selectedName, setSelectedName] = useState<string>("");
  const [result, setResult] = useState<string>("");
  // 答え
  const [answer, setAnswer] = useState<string>("");

  const selectRandom = (items: ConfigItem[]) => {
    if (items.length === 0) return;

    // ランダムに1つ選んで画像と名前
    const randomIndex = Math.floor(Math.random() * items.length);
    const item = items[randomIndex];
    setSelectedItem(item);

    // 最大4つの名前オプション（正解を含む）
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    const selectedOptions = shuffled.slice(0, Math.min(4, items.length));
    // 正解が含まれていない場合、追加
    if (!selectedOptions.some((opt) => opt.word === item.word)) {
      selectedOptions[Math.floor(Math.random() * selectedOptions.length)] =
        item;
    }
    setOptions(
      selectedOptions
        .sort(() => Math.random() - 0.5),
    ); // 順序ランダム
    setSelectedName("");
    setResult("");
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const saved = localStorage.getItem("configWordsData");
    if (saved) {
      let parsedData: ConfigItem[] = JSON.parse(saved);
      
      // Check if range settings exist
      const rangeStart = localStorage.getItem("configWordsDataRangeStart");
      const rangeEnd = localStorage.getItem("configWordsDataRangeEnd");
      
      // Filter data by range if range settings exist
      if (rangeStart && rangeEnd) {
        const start = parseInt(rangeStart, 10);
        const end = parseInt(rangeEnd, 10);
        parsedData = parsedData.filter(
          (item) => item.no >= start && item.no <= end
        );
      }
      
      setData(parsedData);
      selectRandom(parsedData);
    }
  }, []);

  const handleSelectAndAnswer = (word: string) => {
    setSelectedName(word);
    if (selectedItem && word === selectedItem.word) {
      setResult("正解！");
      setAnswer("");
    } else {
      setResult("間違い");
      setAnswer(`答え: ${selectedItem?.word}`);
    }
  };

  const handleNext = () => {
    selectRandom(data);
  };

  return (
    <div 
      className="px-8 py-4 max-w-4xl mx-auto pt-20"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 25%, #1e1b4b 50%, #0f172a 75%, #1e3a8a 100%)',
        backgroundAttachment: 'fixed',
      }}
    >
      {!selectedItem ? "データがありません" : (
        <div className="flex flex-col items-center">
          <div className="bg-gradient-to-br from-blue-900 to-purple-900 bg-opacity-50 rounded-2xl p-6 mb-8 border border-blue-500 border-opacity-30 backdrop-blur-sm shadow-2xl">
            <div
              style={{
                width: 300,
                height: 200,
                overflow: "hidden",
                borderRadius: "12px",
                background: "rgba(15, 23, 42, 0.8)",
                border: "2px solid rgba(96, 165, 250, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem",
              }}
            >
                <p className="text-blue-300 font-semibold text-center">{selectedItem.meaning}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {options.map((nameInfo) => (
              <button
                type="button"
                key={nameInfo.word}
                onClick={() => handleSelectAndAnswer(nameInfo.word)}
                className={`px-6 py-3 rounded-xl transition-all leading-tight font-bold shadow-lg transform hover:scale-105 ${
                  selectedName === nameInfo.word
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-2 border-purple-300 shadow-2xl"
                    : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-2 border-blue-400 hover:shadow-xl"
                }`}
              >
                {nameInfo.word}
              </button>
            ))}
          </div>
          <div className="flex gap-6">
            <button
              type="button"
              onClick={handleNext}
              className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105 font-bold border-2 border-green-400 border-opacity-50"
            >
              次へ
            </button>
          </div>
          {result && (
            <p
              className={`mt-6 text-2xl font-bold ${result === "正解！" ? "text-green-400 drop-shadow-lg" : "text-red-400 drop-shadow-lg"}`}
            >
              {result}
            </p>
          )}
          {answer && (
            <p
              className={`mt-4 text-lg font-bold text-purple-400 drop-shadow-md`}
            >
              {answer}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
