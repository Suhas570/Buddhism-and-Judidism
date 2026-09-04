import { ContentCard } from "../../components/ContentCard";
import { Button } from "../../components/Button";
import { useApiList } from "../../lib/useApiList";
import type { Teaching } from "../../lib/types";

export function SAContent() {
  const { data: teachings } = useApiList<Teaching>("/teachings", "super-admin");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-3xl text-[#2B2420] tracking-tight">Content Library</h1>
          <p className="text-[#8A7F6E] text-sm mt-1">{teachings.length} teachings across all centers</p>
        </div>
        <Button variant="saffron">Feature Teaching</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {teachings.map((t) => (
          <ContentCard
            key={t.id}
            title={t.title}
            typeBadge={t.category}
            meta={[
              { label: "Author", value: t.author },
              { label: "Center", value: t.center.split(" ")[0] },
              { label: "Duration", value: t.duration },
              { label: "Views", value: t.views },
            ]}
            contributors={[t.author]}
            contributorsLabel="Teacher"
            statusBadge={{ label: t.status, variant: t.status === "published" ? "success" : "warning" }}
          />
        ))}
      </div>
    </div>
  );
}
