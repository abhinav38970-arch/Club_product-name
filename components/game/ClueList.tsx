interface Props {
  clues: [string, string, string];
  revealed: boolean;
}

export function ClueList({ clues, revealed }: Props) {
  return (
    <ol className="space-y-2.5" aria-live="polite" aria-label="Clues">
      {clues.map((clue, i) => (
        <li
          key={i}
          className={`clue-card ${revealed ? "clue-in" : "clue-hidden"}`}
          style={{ animationDelay: `${i * 160}ms` }}
        >
          <div className="flex items-start gap-3">
            <span className="clue-num" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-black tracking-[0.22em] text-cyan-300">
                CLUE {i + 1}
              </p>
              <p className="mt-0.5 text-[15px] font-semibold leading-snug text-white">
                {clue}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
