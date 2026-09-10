import { Link } from "@tanstack/react-router";
import { Bookmark, BookmarkCheck, MapPin } from "lucide-react";
import type { College } from "@/data/colleges";

type Props = {
  college: College;
  saved: boolean;
  onToggleSave: (id: string) => void;
};

export function CollegeCard({ college, saved, onToggleSave }: Props) {
  return (
    <article className="flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold leading-snug text-card-foreground">
            <Link to="/colleges/$collegeId" params={{ collegeId: college.id }}>
              {college.name}
            </Link>
          </h3>
          <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="size-3.5" /> {college.city}, {college.province}
          </p>
        </div>
        <button
          type="button"
          aria-label={saved ? "Remove from saved" : "Save college"}
          onClick={() => onToggleSave(college.id)}
          className="rounded-md p-2 text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
        >
          {saved ? <BookmarkCheck className="size-4 text-primary" /> : <Bookmark className="size-4" />}
        </button>
      </div>

      <p className="mt-3 text-sm text-muted-foreground">{college.university}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
          {college.type}
        </span>
        {college.programs.map((p) => (
          <span
            key={p}
            className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground"
          >
            {p}
          </span>
        ))}
      </div>

      <Link
        to="/colleges/$collegeId"
        params={{ collegeId: college.id }}
        className="mt-4 text-sm font-semibold text-primary hover:underline"
      >
        View details →
      </Link>
    </article>
  );
}
