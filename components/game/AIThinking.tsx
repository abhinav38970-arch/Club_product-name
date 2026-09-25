export function AIThinking() {
  return (
    <div
      role="status"
      aria-label="AI is thinking"
      className="ai-panel mt-5 overflow-hidden"
    >
      <div className="ai-scan" aria-hidden="true" />
      <div className="flex items-center gap-3">
        <span className="ai-orb ai-orb-lg" aria-hidden="true">
          <span className="ai-orb-core" />
        </span>
        <div>
          <p className="text-xs font-black tracking-[0.22em] text-cyan-200">
            AI IS THINKING...
          </p>
          <p className="mt-0.5 text-sm font-semibold text-slate-300">
            Reading your guess<span className="dots" aria-hidden="true"><span>.</span><span>.</span><span>.</span></span>
          </p>
        </div>
      </div>
      <div className="mt-4 flex gap-1.5" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className="think-bar" style={{ animationDelay: `${i * 120}ms` }} />
        ))}
      </div>
    </div>
  );
}
