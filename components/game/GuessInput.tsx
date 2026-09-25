"use client";

interface Props {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  final?: boolean;
  error?: string | null;
  inputId?: string;
}

export function GuessInput({
  value,
  onChange,
  onSubmit,
  disabled,
  final,
  error,
  inputId = "guess",
}: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="mt-5"
    >
      <label
        htmlFor={inputId}
        className="text-xs font-black tracking-[0.22em] text-slate-300"
      >
        {final ? "FINAL TRY — MAKE IT COUNT" : "WHAT'S YOUR GUESS?"}
      </label>
      <div className={`guess-wrap mt-2 ${final ? "guess-final" : ""}`}>
        <input
          id={inputId}
          type="text"
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          maxLength={40}
          placeholder="Type your answer..."
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className="guess-input"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
        />
        <button
          type="submit"
          disabled={disabled}
          className={`btn-primary min-h-[56px] shrink-0 px-5 text-base sm:px-7 ${
            final ? "btn-final" : ""
          }`}
        >
          {final ? "FINAL GUESS →" : "GUESS →"}
        </button>
      </div>
      {error && (
        <p id={`${inputId}-error`} role="alert" className="mt-2 text-sm font-semibold text-rose-300">
          {error}
        </p>
      )}
      <p className="mt-2 text-[11px] font-medium text-slate-500">
        Press Enter ↵ · one guess per try · spelling-ish counts
      </p>
    </form>
  );
}
