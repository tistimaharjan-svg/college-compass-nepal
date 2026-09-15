import { Link, createFileRoute } from "@tanstack/react-router";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { DemoNotice } from "@/components/DemoNotice";
import { colleges } from "@/data/colleges";
import { useSavedColleges } from "@/lib/saved";

export const Route = createFileRoute("/colleges/$collegeId")({
head: () => ({
meta: [
{ title: "College details | College Finder Nepal" },
{
name: "description",
content:
"Programs, fees, admission information, facilities and contact details for the college.",
},
{ property: "og:title", content: "College details | College Finder Nepal" },
{
property: "og:description",
content:
"Programs, fees, admission info, facilities and contacts for colleges in Nepal.",
},
],
}),
component: CollegeDetail,
});

function CollegeDetail() {
const { collegeId } = Route.useParams();
const { toggle, isSaved } = useSavedColleges();
const college = colleges.find((c) => c.id === collegeId);

if (!college) {
return ( <div className="mx-auto max-w-3xl px-4 py-20 text-center"> <h1 className="text-xl font-semibold text-foreground">
College not found </h1> <Link
       to="/colleges"
       search={{}}
       className="mt-4 inline-block text-sm font-semibold text-primary"
     >
Back to all colleges </Link> </div>
);
}

return ( <div className="mx-auto max-w-4xl px-4 py-10"> <Link
     to="/colleges"
     search={{}}
     className="text-sm text-muted-foreground hover:text-foreground"
   >
← Back to colleges </Link>

```
  <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
    <div>
      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
        {college.name}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {college.city}, {college.district} · {college.province} Province
      </p>
    </div>

    <button
      type="button"
      onClick={() => toggle(college.id)}
      className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
    >
      {isSaved(college.id) ? (
        <BookmarkCheck className="size-4" />
      ) : (
        <Bookmark className="size-4" />
      )}
      {isSaved(college.id) ? "Saved" : "Save college"}
    </button>
  </div>

  <div className="mt-6 grid gap-4 sm:grid-cols-2">
    <Info label="University" value={college.university} />
    <Info label="College type" value={college.type} />
    <Info label="Last updated" value={college.lastUpdated} />
    <Info label="Website" value={college.website} />
  </div>

  <Section title="About">
    <p className="text-sm text-muted-foreground">
      {college.description}
    </p>
  </Section>

  <Section title="Available programs">
    <div className="flex flex-wrap gap-2">
      {college.programs.map((p) => (
        <span
          key={p}
          className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground"
        >
          {p}
        </span>
      ))}
    </div>
  </Section>

  <Section title="Fee structure">
    {college.fees && Object.keys(college.fees).length > 0 ? (
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="grid grid-cols-2 border-b border-border bg-muted px-4 py-3 text-sm font-semibold">
          <span>Program</span>
          <span>Approx. fee</span>
        </div>

        {Object.entries(college.fees).map(([program, fee]) => (
          <div
            key={program}
            className="grid grid-cols-2 border-b border-border px-4 py-3 text-sm last:border-b-0"
          >
            <span className="font-medium text-card-foreground">
              {program}
            </span>
            <span className="text-muted-foreground">{fee}</span>
          </div>
        ))}
      </div>
    ) : (
      <div className="rounded-lg border border-dashed border-border bg-muted/30 p-4">
        <p className="text-sm font-medium text-foreground">
          Fee information not available yet.
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Current fee information will be added after verification with
          the college or university.
        </p>
      </div>
    )}
  </Section>

  <Section title="Admission information">
    <p className="text-sm text-muted-foreground">
      {college.admission}
    </p>
  </Section>

  <Section title="Facilities">
    <ul className="grid gap-1 text-sm text-muted-foreground sm:grid-cols-2">
      {college.facilities.map((f) => (
        <li key={f}>• {f}</li>
      ))}
    </ul>
  </Section>

  <Section title="Contact">
    <p className="text-sm text-muted-foreground">
      Phone: {college.phone}
    </p>
    <p className="text-sm text-muted-foreground">
      Email: {college.email}
    </p>
  </Section>

  <div className="mt-8">
    <DemoNotice />
  </div>
</div>
```

);
}

function Info({ label, value }: { label: string; value: string }) {
return ( <div className="rounded-lg border border-border bg-card p-4"> <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
{label} </p> <p className="mt-1 text-sm font-medium text-card-foreground">
{value} </p> </div>
);
}

function Section({
title,
children,
}: {
title: string;
children: React.ReactNode;
}) {
return ( <section className="mt-8"> <h2 className="text-lg font-semibold text-foreground">{title}</h2> <div className="mt-3">{children}</div> </section>
);
}
