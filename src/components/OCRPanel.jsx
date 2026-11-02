export default function OCRPanel({ text, setText }) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
      <h2 className="mb-4 text-2xl font-semibold">
        📄 OCR Result
      </h2>

      <textarea
        rows={20}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full rounded-xl border border-slate-600 bg-slate-900 p-4 text-slate-100"
      />
    </div>
  );
}