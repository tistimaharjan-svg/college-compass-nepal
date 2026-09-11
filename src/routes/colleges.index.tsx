import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CollegeCard } from "@/components/CollegeCard";
import { FilterSelect } from "@/components/FilterSelect";
import { DemoNotice } from "@/components/DemoNotice";
import {
  allPrograms,
  collegeTypes,
  colleges,
  districts,
  provinces,
  universities,
} from "@/data/colleges";
import { useSavedColleges } from "@/lib/saved";

type CollegeSearch = { q?: string; province?: string; program?: string };

export const Route = createFileRoute("/colleges/")({
  validateSearch: (search: Record<string, unknown>): CollegeSearch => ({
    q: typeof search.q === "string" && search.q ? search.q : undefined,
    province:
      typeof search.province === "string" && search.province ? search.province : undefined,
    program: typeof search.program === "string" && search.program ? search.program : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Search Colleges in Nepal | College Finder Nepal" },
      {
        name: "description",
        content:
          "Search and filter colleges across Nepal by province, district, program, college type and university.",
      },
      { property: "og:title", content: "Search Colleges in Nepal" },
      {
        property: "og:description",
        content: "Filter Nepali colleges by location, program, type and university.",
      },
    ],
  }),
  component: CollegesPage,
});

function CollegesPage() {
  const { toggle, isSaved } = useSavedColleges();
  const [query, setQuery] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [program, setProgram] = useState("");
  const [type, setType] = useState("");
  const [university, setUniversity] = useState("");
  const [sort, setSort] = useState("name-asc");

  const results = useMemo(() => {
    const list = colleges.filter((c) => {
      if (query && !c.name.toLowerCase().includes(query.toLowerCase())) return false;
      if (province && c.province !== province) return false;
      if (district && c.district !== district) return false;
      if (program && !c.programs.includes(program)) return false;
      if (type && c.type !== type) return false;
      if (university && c.university !== university) return false;
      return true;
    });
    return [...list].sort((a, b) => {
      if (sort === "name-desc") return b.name.localeCompare(a.name);
      if (sort === "updated") return b.lastUpdated.localeCompare(a.lastUpdated);
      return a.name.localeCompare(b.name);
    });
  }, [query, province, district, program, type, university, sort]);

  const clear = () => {
    setQuery("");
    setProvince("");
    setDistrict("");
    setProgram("");
    setType("");
    setUniversity("");
    setSort("name-asc");
  };

  const districtOptions = province
    ? [...new Set(colleges.filter((c) => c.province === province).map((c) => c.district))].sort()
    : districts;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Find a college</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {results.length} college{results.length === 1 ? "" : "s"} matching your filters.
      </p>

      <div className="mt-6 rounded-xl border border-border bg-card p-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by college name…"
          className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <FilterSelect
            label="Province"
            value={province}
            options={provinces}
            onChange={(v) => {
              setProvince(v);
              setDistrict("");
            }}
          />
          <FilterSelect
            label="District"
            value={district}
            options={districtOptions}
            onChange={setDistrict}
          />
          <FilterSelect label="Program" value={program} options={allPrograms} onChange={setProgram} />
          <FilterSelect label="College type" value={type} options={collegeTypes} onChange={setType} />
          <FilterSelect
            label="University"
            value={university}
            options={universities}
            onChange={setUniversity}
          />
          <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
            Sort by
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="name-asc">Name (A–Z)</option>
              <option value="name-desc">Name (Z–A)</option>
              <option value="updated">Recently updated</option>
            </select>
          </label>
        </div>
        <button
          type="button"
          onClick={clear}
          className="mt-4 rounded-md border border-input px-3 py-2 text-sm font-medium text-foreground transition hover:bg-accent"
        >
          Clear filters
        </button>
      </div>

      <div className="mt-6">
        <DemoNotice />
      </div>

      {results.length === 0 ? (
        <p className="mt-10 rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          No colleges match these filters. Try clearing some of them.
        </p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((c) => (
            <CollegeCard key={c.id} college={c} saved={isSaved(c.id)} onToggleSave={toggle} />
          ))}
        </div>
      )}
    </div>
  );
}
