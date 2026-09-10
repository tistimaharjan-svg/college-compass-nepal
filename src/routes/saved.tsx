import { Link, createFileRoute } from "@tanstack/react-router";
import { CollegeCard } from "@/components/CollegeCard";
import { colleges } from "@/data/colleges";
import { useSavedColleges } from "@/lib/saved";

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "Saved Colleges | College Finder Nepal" },
      {
        name: "description",
        content: "Your shortlisted colleges, stored privately in this browser. No login needed.",
      },
      { property: "og:title", content: "Saved Colleges | College Finder Nepal" },
      {
        property: "og:description",
        content: "Shortlist colleges in Nepal and revisit them any time on this device.",
      },
    ],
  }),
  component: SavedPage,
});

function SavedPage() {
  const { saved, ready, toggle, isSaved } = useSavedColleges();
  const list = colleges.filter((c) => saved.includes(c.id));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Saved colleges</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Saved on this device only — no account needed.
      </p>

      {!ready ? (
        <p className="mt-10 text-center text-sm text-muted-foreground">Loading…</p>
      ) : list.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-border p-10 text-center">
          <p className="text-sm text-muted-foreground">You haven't saved any colleges yet.</p>
          <Link
            to="/colleges"
            className="mt-4 inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Browse colleges
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <CollegeCard key={c.id} college={c} saved={isSaved(c.id)} onToggleSave={toggle} />
          ))}
        </div>
      )}
    </div>
  );
}
