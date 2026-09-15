import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DemoNotice } from "@/components/DemoNotice";
import { colleges } from "@/data/colleges";
import { courses } from "@/data/courses";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Compare Colleges | College Finder Nepal" },
      {
        name: "description",
        content:
          "Select up to 3 colleges and compare location, university, type, programs and admission info.",
      },
      { property: "og:title", content: "Compare Colleges | College Finder Nepal" },
      {
        property: "og:description",
        content: "Side-by-side comparison of Nepali colleges on the details that matter.",
      },
    ],
  }),
  component: ComparePage,
});

function durationFor(programs: string[]) {
  const match = courses.find((c) => programs.includes(c.code));
  return match ? match.duration : "—";
}

function ComparePage() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length >= 3 ? prev : [...prev, id],
    );
  };

  const picked = colleges.filter((c) => selected.includes(c.id));
  const rows: { label: string; value: (c: (typeof colleges)[number]) => string }[] = [
  { label: "Location", value: (c) => `${c.city}, ${c.province}` },
  { label: "University", value: (c) => c.university },
  { label: "College type", value: (c) => c.type },
  { label: "Programs", value: (c) => c.programs.join(", ") },
  { label: "Typical duration", value: (c) => durationFor(c.programs) },
  { label: "Admission", value: (c) => c.admission },
];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Compare colleges</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Pick up to 3 colleges ({selected.length}/3 selected).
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {colleges.map((c) => {
          const on = selected.includes(c.id);
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => toggle(c.id)}
              disabled={!on && selected.length >= 3}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition disabled:opacity-40 ${
                on
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-input bg-background text-foreground hover:bg-accent"
              }`}
            >
              {c.name}
            </button>
          );
        })}
      </div>

      {picked.length === 0 ? (
        <p className="mt-10 rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          Select colleges above to see them side by side.
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[600px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-secondary">
                <th className="p-3 font-semibold text-secondary-foreground">Detail</th>
                {picked.map((c) => (
                  <th key={c.id} className="p-3 font-semibold text-secondary-foreground">
                    {c.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-t border-border align-top">
                  <td className="p-3 font-medium text-foreground">{row.label}</td>
                  {picked.map((c) => (
                    <td key={c.id} className="p-3 text-muted-foreground">
                      {row.value(c)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-8">
        <DemoNotice />
      </div>
    </div>
  );
}
