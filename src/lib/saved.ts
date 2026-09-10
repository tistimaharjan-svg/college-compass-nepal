import { useCallback, useEffect, useState } from "react";

const KEY = "cfn-saved-colleges";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function useSavedColleges() {
  const [saved, setSaved] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSaved(read());
    setReady(true);
    const sync = () => setSaved(read());
    window.addEventListener("cfn-saved-changed", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("cfn-saved-changed", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = useCallback((id: string) => {
    const current = read();
    const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
    window.localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("cfn-saved-changed"));
  }, []);

  return { saved, ready, toggle, isSaved: (id: string) => saved.includes(id) };
}
