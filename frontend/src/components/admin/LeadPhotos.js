import { useEffect, useState } from "react";
import { api } from "@/lib/api";

// Admin-only images can't be loaded via <img src> (no auth header) — fetch as blobs.
export const LeadPhotos = ({ ids = [] }) => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    if (!ids.length) return;
    let revoked = [];
    let active = true;

    (async () => {
      const out = [];
      for (const id of ids) {
        try {
          const res = await api.get(`/files/${id}`, { responseType: "blob" });
          const url = URL.createObjectURL(res.data);
          revoked.push(url);
          out.push({ id, url });
        } catch (e) {
          /* skip unreadable photo */
        }
      }
      if (active) setUrls(out);
    })();

    return () => {
      active = false;
      revoked.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [ids]);

  if (!ids.length) return null;

  return (
    <div data-testid="lead-photos" className="mt-3 flex flex-wrap gap-2">
      {urls.map((p) => (
        <a
          key={p.id}
          href={p.url}
          target="_blank"
          rel="noreferrer"
          data-testid={`lead-photo-${p.id}`}
          className="block h-14 w-14 overflow-hidden border border-stone transition-transform duration-300 hover:scale-[1.06]"
        >
          <img src={p.url} alt="Customer submitted mailbox" className="h-full w-full object-cover" />
        </a>
      ))}
      {urls.length === 0 && (
        <span className="text-[10px] uppercase tracking-[0.16em] text-slate950/40">
          Loading {ids.length} photo{ids.length > 1 ? "s" : ""}…
        </span>
      )}
    </div>
  );
};
