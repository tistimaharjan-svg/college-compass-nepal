import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { CollegeCard } from "@/components/CollegeCard";
import { DemoNotice } from "@/components/DemoNotice";
import { colleges, provinces } from "@/data/colleges";
import { courses } from "@/data/courses";
import { useSavedColleges } from "@/lib/saved";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "College Finder Nepal — Find Colleges & Courses" },
      {
        name: "description",
        content:
          "Search, compare and save colleges and bachelor courses across Nepal. Find the right college, course, and future in Nepal.",
      },
      { property: "og:title", content: "College Finder Nepal" },
      {
        property: "og:description",
        content: "Find the right college, course, and future in Nepal.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { toggle, isSaved } = useSavedColleges();
  const featured = colleges.slice(0, 6);

  return (
    <div>
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            College Finder Nepal
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            Find the right college, course, and future in Nepal.
          </p>
          <form
            className="mx-auto mt-8 flex max-w-xl gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              void navigate({ to: "/colleges", search: { q: query || undefined } });
            }}
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search colleges…"
              className="flex-1 rounded-md border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              <Search className="size-4" /> Search
            </button>
          </form>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-xl font-semibold text-foreground">Popular programs</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {courses.map((c) => (
            <Link
              key={c.code}
              to="/courses"
              className="rounded-full border border-input bg-card px-4 py-2 text-sm font-medium text-card-foreground transition hover:bg-accent"
            >
              {c.code}
            </Link>
          ))}
        </div>

        <h2 className="mt-12 text-xl font-semibold text-foreground">Featured colleges</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((c) => (
            <CollegeCard key={c.id} college={c} saved={isSaved(c.id)} onToggleSave={toggle} />
          ))}
        </div>
        <Link
          to="/colleges"
          className="mt-6 inline-block text-sm font-semibold text-primary hover:underline"
        >
          See all colleges →
        </Link>

        <h2 className="mt-12 text-xl font-semibold text-foreground">Browse by location</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {provinces.map((p) => (
            <Link
              key={p}
              to="/colleges"
              className="rounded-xl border border-border bg-card p-4 transition hover:bg-accent"
            >
              <p className="text-sm font-semibold text-card-foreground">{p}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {colleges.filter((c) => c.province === p).length} colleges
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-12">
          <DemoNotice />
        </div>
      </div>
    </div>
  );
}
