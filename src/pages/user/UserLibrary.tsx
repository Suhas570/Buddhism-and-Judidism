import { useState } from "react";
import { ContentCard } from "../../components/ContentCard";
import { useApiList } from "../../lib/useApiList";
import type { Teaching } from "../../lib/types";

const categories = ["All", "Sutra", "Dharma Talk", "Meditation Guide", "Course", "Article"];

export function UserLibrary() {
  const [active, setActive] = useState("All");
  const { data: teachings } = useApiList<Teaching>("/teachings?status=published", "user");
  const filtered = active === "All" ? teachings : teachings.filter((t) => t.category === active);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-3xl text-[#2B2420] tracking-tight">Dharma Library</h1>
        <p className="text-[#8A7F6E] text-sm mt-1">{teachings.length} teachings available</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`text-xs font-medium px-4 py-1.5 rounded-full transition-colors cursor-pointer ${
              active === cat
                ? "bg-[#2B2420] text-[#F5EFE3]"
                : "bg-white border border-[#F1E9DA] text-[#8A7F6E] hover:border-[#E8A33D] hover:text-[#2B2420]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((t) => (
          <ContentCard
            key={t.id}
            title={t.title}
            typeBadge={t.category}
            meta={[
              { label: "Teacher", value: t.author },
              { label: "Duration", value: t.duration },
              { label: "Center", value: t.center.split(" ")[0] },
              { label: "Views", value: t.views },
            ]}
            contributors={[t.author]}
            contributorsLabel="Teacher"
            statusBadge={{ label: t.featured ? "featured" : t.status, variant: t.featured ? "saffron" : "success" }}
          />
        ))}
      </div>
    </div>
  );
}
