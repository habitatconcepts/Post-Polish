import { useCallback, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { LogOut, RefreshCw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api, formatApiError } from "@/lib/api";

const STATUSES = ["new", "contacted", "scheduled", "completed", "lost"];

const STATUS_STYLE = {
  new: "bg-brass/15 text-brass border-brass/40",
  contacted: "bg-slate950/5 text-slate950/70 border-slate950/20",
  scheduled: "bg-moss/10 text-moss border-moss/30",
  completed: "bg-moss/20 text-moss border-moss/40",
  lost: "bg-clay/10 text-clay border-clay/30",
};

export default function AdminDashboard() {
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState(null);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [l, s] = await Promise.all([
        api.get("/leads", { params: filter === "all" ? {} : { status: filter } }),
        api.get("/leads/stats"),
      ]);
      setLeads(l.data);
      setStats(s.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("pp_token");
        navigate("/admin/login");
        return;
      }
      toast.error(formatApiError(err.response?.data?.detail) || err.message);
    } finally {
      setLoading(false);
    }
  }, [filter, navigate]);

  useEffect(() => {
    load();
  }, [load]);

  const changeStatus = async (id, status) => {
    try {
      await api.patch(`/leads/${id}`, { status });
      setLeads((prev) =>
        filter === "all"
          ? prev.map((l) => (l.id === id ? { ...l, status } : l))
          : prev.filter((l) => l.id !== id)
      );
      const s = await api.get("/leads/stats");
      setStats(s.data);
      toast.success(`Marked ${status}`);
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail) || err.message);
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (e) {
      /* ignore */
    }
    localStorage.removeItem("pp_token");
    navigate("/admin/login");
  };

  return (
    <div data-testid="admin-dashboard" className="min-h-screen bg-white">
      <header className="border-b border-stone px-6 py-5 lg:px-10">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between">
          <Link to="/" className="flex items-baseline gap-2">
            <span className="font-serif text-xl text-slate950">Post</span>
            <span className="font-serif text-xl italic text-brass">&amp;</span>
            <span className="font-serif text-xl text-slate950">Polish</span>
            <span className="ml-4 text-[11px] uppercase tracking-[0.2em] text-slate950/40">
              Leads
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={load}
              data-testid="admin-refresh"
              className="inline-flex items-center gap-2 border border-stone px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-slate950/70 transition-colors hover:border-brass hover:text-brass"
            >
              <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
            <button
              onClick={logout}
              data-testid="admin-logout"
              className="inline-flex items-center gap-2 bg-slate950 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-bone transition-colors hover:bg-slate950/85"
            >
              <LogOut size={13} />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] px-6 py-10 lg:px-10">
        <div className="grid grid-cols-2 gap-px border border-stone bg-stone lg:grid-cols-4">
          {[
            { label: "Total leads", value: stats?.total ?? "—" },
            { label: "Last 7 days", value: stats?.this_week ?? "—" },
            { label: "New / unworked", value: stats?.by_status?.new ?? "—" },
            { label: "Completed jobs", value: stats?.by_status?.completed ?? "—" },
          ].map((c) => (
            <div
              key={c.label}
              data-testid={`stat-${c.label.split(" ")[0].toLowerCase()}`}
              className="bg-white p-7"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate950/40">
                {c.label}
              </p>
              <p className="mt-3 font-serif text-4xl text-slate950">{c.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-2">
          {["all", ...STATUSES].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              data-testid={`filter-${s}`}
              className={`px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] transition-colors ${
                filter === s
                  ? "bg-slate950 text-bone"
                  : "border border-stone text-slate950/55 hover:border-brass hover:text-brass"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="mt-6 border border-stone">
          <div className="hidden grid-cols-12 gap-4 border-b border-stone bg-stone/40 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-slate950/45 lg:grid">
            <span className="col-span-2">Customer</span>
            <span className="col-span-2">Contact</span>
            <span className="col-span-3">Address</span>
            <span className="col-span-2">Service</span>
            <span className="col-span-1">Received</span>
            <span className="col-span-2">Status</span>
          </div>

          {leads.length === 0 && !loading && (
            <p
              data-testid="admin-empty-state"
              className="px-6 py-16 text-center text-sm text-slate950/45"
            >
              No leads yet. Requests from the booking form land here.
            </p>
          )}

          {leads.map((l) => (
            <div
              key={l.id}
              data-testid={`lead-row-${l.id}`}
              className="grid grid-cols-1 gap-4 border-b border-stone px-6 py-5 last:border-0 hover:bg-bone/60 lg:grid-cols-12 lg:items-center"
            >
              <div className="lg:col-span-2">
                <p className="font-serif text-lg text-slate950">{l.name}</p>
                {l.notes && (
                  <p className="mt-1 text-xs leading-snug text-slate950/50">
                    {l.notes}
                  </p>
                )}
              </div>
              <p className="text-sm text-slate950/70 lg:col-span-2">{l.contact}</p>
              <p className="text-sm text-slate950/70 lg:col-span-3">{l.address}</p>
              <p className="text-xs uppercase tracking-[0.1em] text-slate950/55 lg:col-span-2">
                {l.service}
              </p>
              <p className="text-xs text-slate950/45 lg:col-span-1">
                {new Date(l.created_at).toLocaleDateString()}
              </p>
              <div className="lg:col-span-2">
                <Select
                  value={l.status}
                  onValueChange={(v) => changeStatus(l.id, v)}
                >
                  <SelectTrigger
                    data-testid={`lead-status-${l.id}`}
                    className={`h-10 rounded-none border text-[11px] font-bold uppercase tracking-[0.14em] ${
                      STATUS_STYLE[l.status]
                    }`}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    {STATUSES.map((s) => (
                      <SelectItem
                        key={s}
                        value={s}
                        data-testid={`status-option-${s}`}
                        className="text-xs uppercase tracking-[0.14em]"
                      >
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
