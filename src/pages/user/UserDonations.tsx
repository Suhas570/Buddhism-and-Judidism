import { useState, type FormEvent } from "react";
import { Heart } from "lucide-react";
import { apiSend } from "../../lib/api";
import { useApiList } from "../../lib/useApiList";
import type { Donation } from "../../lib/types";

const presets = [25, 50, 100, 250];

export function UserDonations() {
  const [amount, setAmount] = useState<number | "">("");
  const [selected, setSelected] = useState<number | null>(null);
  const [purpose, setPurpose] = useState("General Fund");
  const { data: donations, setData: setDonations } = useApiList<Donation>("/donations", "user");

  function selectPreset(v: number) {
    setSelected(v);
    setAmount(v);
  }

  async function submitDonation(event: FormEvent) {
    event.preventDefault();
    if (!amount) return;

    const donation = await apiSend<Donation>(
      "/donations",
      {
        method: "POST",
        body: JSON.stringify({
          donor: "Ananda Dev",
          amount,
          center: "Bodhi Grove Sangha",
          date: new Date().toISOString().slice(0, 10),
          method: "Card",
          purpose,
        }),
      },
      "user",
    );
    setDonations((items) => [donation, ...items]);
    setAmount("");
    setSelected(null);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-3xl text-[#2B2420] tracking-tight">Donations</h1>
        <p className="text-[#8A7F6E] text-sm mt-1">Support the Dharma and your sangha</p>
      </div>

      <form onSubmit={submitDonation} className="bg-[#1C1815] border border-[#3A3028] rounded-2xl p-8 max-w-lg">
        <div className="flex items-center gap-2 mb-6">
          <Heart size={20} className="text-[#E8A33D]" />
          <h2 className="font-display font-semibold text-[#F5EFE3] text-lg">Make a Donation</h2>
        </div>

        <p className="text-sm text-[#8A7F6E] mb-4">Select amount</p>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {presets.map((p) => (
            <button
              type="button"
              key={p}
              onClick={() => selectPreset(p)}
              className={`py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                selected === p
                  ? "bg-[#E8A33D] text-[#1C1815]"
                  : "bg-[#2A2018] text-[#8A7F6E] hover:text-[#F5EFE3]"
              }`}
            >
              ${p}
            </button>
          ))}
        </div>

        <div className="mb-4">
          <input
            type="number"
            placeholder="Or enter custom amount..."
            value={amount}
            onChange={(e) => { setSelected(null); setAmount(Number(e.target.value) || ""); }}
            className="w-full px-4 py-2.5 bg-[#2A2018] border border-[#3A3028] rounded-xl text-sm text-[#F5EFE3] placeholder-[#5A4F42] focus:outline-none focus:border-[#E8A33D] transition-colors"
          />
        </div>

        <div className="mb-6">
          <select value={purpose} onChange={(e) => setPurpose(e.target.value)} className="w-full px-4 py-2.5 bg-[#2A2018] border border-[#3A3028] rounded-xl text-sm text-[#F5EFE3] focus:outline-none focus:border-[#E8A33D] transition-colors cursor-pointer">
            <option>General Fund</option>
            <option>Building Fund</option>
            <option>Retreat Scholarship</option>
            <option>Teaching Fund</option>
          </select>
        </div>

        <button type="submit" className="w-full py-3 rounded-full bg-[#E8A33D] text-[#1C1815] font-semibold text-sm hover:bg-[#C98A28] transition-colors cursor-pointer">
          Donate {amount ? `$${amount}` : ""} with Love
        </button>
      </form>

      <div>
        <h2 className="font-display font-semibold text-sm text-[#8A7F6E] uppercase tracking-wider mb-4">Donation History</h2>
        <div className="bg-white border border-[#F1E9DA] rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#F1E9DA]">
                {["Amount", "Purpose", "Center", "Method", "Date"].map((h) => (
                  <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider text-[#8A7F6E] px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {donations.slice(0, 6).map((d) => (
                <tr key={d.id} className="border-b border-[#F9F5EE] last:border-0">
                  <td className="px-5 py-3 font-semibold text-[#6B8E5A]">${d.amount}</td>
                  <td className="px-5 py-3 text-[#2B2420]">{d.purpose}</td>
                  <td className="px-5 py-3 text-[#8A7F6E]">{d.center.split(" ")[0]}</td>
                  <td className="px-5 py-3 text-[#8A7F6E]">{d.method}</td>
                  <td className="px-5 py-3 text-[#8A7F6E]">{d.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
