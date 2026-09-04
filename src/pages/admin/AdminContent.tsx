import { useState, type FormEvent } from "react";
import { ContentCard } from "../../components/ContentCard";
import { Button } from "../../components/Button";
import { apiSend } from "../../lib/api";
import { useApiList } from "../../lib/useApiList";
import type { Teaching } from "../../lib/types";

const emptyTeaching = {
  title: "",
  category: "Dharma Talk",
  author: "",
  duration: "45 min",
  date: new Date().toISOString().slice(0, 10),
};

export function AdminContent() {
  const { data: teachings, setData: setTeachings } = useApiList<Teaching>("/teachings?center=Bodhi Grove Sangha", "admin");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyTeaching);
  const centerTeachings = teachings.filter((t) => t.center === "Bodhi Grove Sangha");

  async function submitTeaching(event: FormEvent) {
    event.preventDefault();
    const teaching = await apiSend<Teaching>(
      "/teachings",
      {
        method: "POST",
        body: JSON.stringify({
          ...form,
          center: "Bodhi Grove Sangha",
          status: "published",
          views: 0,
          featured: false,
        }),
      },
      "admin",
    );
    setTeachings((items) => [teaching, ...items]);
    setForm(emptyTeaching);
    setShowForm(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-3xl text-[#2B2420] tracking-tight">Content Library</h1>
          <p className="text-[#8A7F6E] text-sm mt-1">Bodhi Grove Sangha - {centerTeachings.length} teachings</p>
        </div>
        <Button variant="saffron" onClick={() => setShowForm((value) => !value)}>Add Teaching</Button>
      </div>

      {showForm && (
        <form onSubmit={submitTeaching} className="bg-white border border-[#F1E9DA] rounded-2xl p-5 grid grid-cols-1 md:grid-cols-5 gap-3">
          <input required placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="md:col-span-2 px-3 py-2 border border-[#F1E9DA] rounded-xl text-sm" />
          <input required placeholder="Teacher" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="px-3 py-2 border border-[#F1E9DA] rounded-xl text-sm" />
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="px-3 py-2 border border-[#F1E9DA] rounded-xl text-sm">
            <option>Dharma Talk</option>
            <option>Sutra</option>
            <option>Meditation Guide</option>
            <option>Course</option>
            <option>Article</option>
          </select>
          <Button variant="dark" type="submit">Save Teaching</Button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {centerTeachings.map((t) => (
          <ContentCard
            key={t.id}
            title={t.title}
            typeBadge={t.category}
            meta={[
              { label: "Author", value: t.author },
              { label: "Duration", value: t.duration },
              { label: "Views", value: t.views },
              { label: "Date", value: t.date },
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
