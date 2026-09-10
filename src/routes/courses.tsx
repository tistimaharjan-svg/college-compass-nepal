import { Link, createFileRoute } from "@tanstack/react-router";
import { DemoNotice } from "@/components/DemoNotice";
import { colleges } from "@/data/colleges";
import { courses } from "@/data/courses";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Course Explorer — BCA, BSc CSIT, BBA | College Finder Nepal" },
      {
        name: "description",
        content:
          "Explore popular bachelor courses in Nepal such as BCA, BIT, BICTE, BSc CSIT, BIM, BBA, BBM and BBS.",
      },
      { property: "og:title", content: "Course Explorer | College Finder Nepal" },
      {
        property: "og:description",
        content: "Degree level, duration and colleges offering popular Nepali bachelor programs.",
      },
    ],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Course explorer</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Popular bachelor programs offered by colleges in Nepal.
      </p>

      <div className="mt-6 space-y-4">
        {courses.map((course) => {
          const offering = colleges.filter((c) => c.programs.includes(course.code));
          return (
            <article key={course.code} className="rounded-xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className="text-lg font-semibold text-card-foreground">{course.code}</h2>
                <span className="text-sm text-muted-foreground">{course.name}</span>
              </div>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {course.level} · {course.duration}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">{course.description}</p>

              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Colleges offering this course
              </p>
              {offering.length === 0 ? (
                <p className="mt-2 text-sm text-muted-foreground">
                  No demo colleges listed for this course yet.
                </p>
              ) : (
                <div className="mt-2 flex flex-wrap gap-2">
                  {offering.map((c) => (
                    <Link
                      key={c.id}
                      to="/colleges/$collegeId"
                      params={{ collegeId: c.id }}
                      className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground hover:bg-accent"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              )}
            </article>
          );
        })}
      </div>

      <div className="mt-8">
        <DemoNotice />
      </div>
    </div>
  );
}
