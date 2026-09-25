export function AIThinking() {
  return (
    <div
      role="status"
      aria-label="AI is thinking"
      className="ai-panel ai-panel-processing mt-5 overflow-hidden"
    >
      <div className="ai-scan" aria-hidden="true" />
      <div className="ai-data" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="relative flex items-center gap-4">
        <span className="ai-core-wrap" aria-hidden="true">
          <span className="ai-ring" />
          <span className="ai-ring ai-ring-2" />
          <span className="ai-orb ai-orb-lg">
            <span className="ai-orb-core" />
          </span>
        </span>
        <div>
          <p className="text-xs font-black tracking-[0.22em] text-cyan-200">
            AI IS THINKING...
          </p>
          <p className="mt-0.5 text-sm font-semibold text-slate-300">
            ANALYZING YOUR GUESS
            <span className="dots" aria-hidden="true">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </span>
          </p>
        </div>
      </div>
      <div className="relative mt-4 flex gap-1.5" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className="think-bar" style={{ animationDelay: `${i * 120}ms` }} />
        ))}
      </div>
    </div>
  );
}
