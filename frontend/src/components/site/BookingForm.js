import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Check, ImagePlus, Loader2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { api, formatApiError } from "@/lib/api";
import { SERVICE_OPTIONS } from "@/data/content";

const PERKS = [
  "Firm, all-inclusive price before we schedule",
  "No estimator visit needed — send a photo and we quote",
  "Old unit removed and hauled away",
  "Clean site when we leave, every time",
];

const MAX_PHOTOS = 5;

const inputCls =
  "h-14 rounded-none border-0 border-b border-bone/25 bg-transparent px-0 text-bone placeholder:text-bone/35 focus-visible:ring-0 focus-visible:border-brass";

export const BookingForm = ({ service, setService }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    contact: "",
    address: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [uploading, setUploading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const addPhotos = async (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = "";
    if (!files.length) return;
    if (photos.length + files.length > MAX_PHOTOS) {
      toast.error(`Up to ${MAX_PHOTOS} photos, please.`);
      return;
    }
    setUploading(true);
    for (const file of files) {
      const body = new FormData();
      body.append("file", file);
      try {
        const { data } = await api.post("/uploads", body);
        setPhotos((p) => [
          ...p,
          { id: data.file_id, name: data.filename, preview: URL.createObjectURL(file) },
        ]);
      } catch (err) {
        toast.error(
          formatApiError(err.response?.data?.detail) ||
            `Could not upload ${file.name}`
        );
      }
    }
    setUploading(false);
  };

  const removePhoto = (id) =>
    setPhotos((p) => p.filter((x) => x.id !== id));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.contact.trim() || !form.address.trim()) {
      toast.error("Name, contact, and property address are required.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/leads", {
        name: form.name.trim(),
        contact: form.contact.trim(),
        address: form.address.trim(),
        service,
        notes: form.notes.trim() || null,
        photo_ids: photos.map((p) => p.id),
      });
      setDone(true);
      toast.success("Request received — we'll confirm your flat rate shortly.");
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail) || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="book"
      data-testid="booking-section"
      className="grain relative overflow-hidden bg-slate950 px-6 py-24 lg:px-12 lg:py-36"
    >
      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="overline">Book a visit</p>
          <h2 className="mt-5 font-serif text-4xl leading-[1.05] text-bone sm:text-5xl">
            Reclaim your
            <br />
            <span className="italic text-brass">Saturday.</span>
          </h2>
          <p className="mt-7 text-sm leading-relaxed text-bone/60 md:text-base">
            Two minutes to book. One visit to fix. Zero weekends lost to a
            mailbox project.
          </p>
          <ul className="mt-12 space-y-5">
            {PERKS.map((p) => (
              <li key={p} className="flex items-start gap-4">
                <Check size={15} className="mt-1 shrink-0 text-brass" />
                <span className="text-sm leading-snug text-bone/70">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <div className="border border-bone/15 bg-bone/[0.04] p-8 backdrop-blur-xl lg:p-12">
            {done ? (
              <div data-testid="booking-success" className="py-10">
                <Check size={32} className="text-brass" />
                <h3 className="mt-6 font-serif text-3xl text-bone">
                  Request received.
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-bone/65">
                  We'll reach out to confirm the details and your firm
                  all-inclusive price — usually the same day. Nothing is
                  scheduled until you approve the number.
                </p>
                <button
                  type="button"
                  data-testid="booking-reset"
                  onClick={() => {
                    setDone(false);
                    setStep(1);
                    setPhotos([]);
                    setForm({ name: "", contact: "", address: "", notes: "" });
                  }}
                  className="mt-9 border border-brass px-7 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-brass transition-colors duration-300 hover:bg-brass hover:text-slate950"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={submit} data-testid="booking-form">
                <div className="flex items-center gap-4">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brass">
                    Step {step} of 2
                  </span>
                  <div className="h-px flex-1 bg-bone/15">
                    <div
                      className="h-px bg-brass transition-all duration-500"
                      style={{ width: step === 1 ? "50%" : "100%" }}
                    />
                  </div>
                </div>

                {step === 1 ? (
                  <div className="mt-10">
                    <h3 className="font-serif text-2xl text-bone">
                      What does your curb need?
                    </h3>
                    <div className="mt-7 space-y-3">
                      {SERVICE_OPTIONS.map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          data-testid={`service-option-${opt
                            .split(" —")[0]
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          onClick={() => setService(opt)}
                          className={`flex w-full items-center justify-between border px-5 py-4 text-left text-sm transition-colors duration-300 ${
                            service === opt
                              ? "border-brass bg-brass/10 text-bone"
                              : "border-bone/15 text-bone/65 hover:border-bone/40"
                          }`}
                        >
                          {opt}
                          {service === opt && (
                            <Check size={15} className="text-brass" />
                          )}
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      data-testid="booking-next"
                      onClick={() => setStep(2)}
                      className="group mt-10 inline-flex items-center gap-3 bg-brass px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-slate950 transition-transform duration-300 hover:-translate-y-0.5"
                    >
                      Continue
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </button>
                  </div>
                ) : (
                  <div className="mt-10">
                    <h3 className="font-serif text-2xl text-bone">
                      Where are we headed?
                    </h3>
                    <p className="mt-2 text-xs uppercase tracking-[0.16em] text-brass">
                      {service}
                    </p>

                    <div className="mt-8 grid grid-cols-1 gap-7 sm:grid-cols-2">
                      <div>
                        <Label className="text-[11px] uppercase tracking-[0.18em] text-bone/50">
                          Name
                        </Label>
                        <Input
                          data-testid="booking-name"
                          value={form.name}
                          onChange={set("name")}
                          placeholder="Jane Doe"
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <Label className="text-[11px] uppercase tracking-[0.18em] text-bone/50">
                          Phone or email
                        </Label>
                        <Input
                          data-testid="booking-contact"
                          value={form.contact}
                          onChange={set("contact")}
                          placeholder="(555) 010-2233"
                          className={inputCls}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label className="text-[11px] uppercase tracking-[0.18em] text-bone/50">
                          Property address
                        </Label>
                        <Input
                          data-testid="booking-address"
                          value={form.address}
                          onChange={set("address")}
                          placeholder="1420 Aldercrest Lane"
                          className={inputCls}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label className="text-[11px] uppercase tracking-[0.18em] text-bone/50">
                          Notes (optional)
                        </Label>
                        <Textarea
                          data-testid="booking-notes"
                          value={form.notes}
                          onChange={set("notes")}
                          rows={4}
                          placeholder="Post is leaning badly, HOA requires black boxes on cedar posts…"
                          className="mt-2 resize-none rounded-none border border-bone/20 bg-transparent text-bone placeholder:text-bone/35 focus-visible:border-brass focus-visible:ring-0"
                        />
                      </div>
                    </div>

                    <div className="mt-9 border border-bone/15 p-6">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.18em] text-bone/50">
                            Photos (optional)
                          </p>
                          <p className="mt-2 max-w-sm text-xs leading-relaxed text-bone/45">
                            Snap your current mailbox and we'll quote from the
                            picture — no estimator visit. Up to {MAX_PHOTOS}{" "}
                            images, 10 MB each.
                          </p>
                        </div>
                        <label
                          data-testid="photo-upload-label"
                          className="inline-flex cursor-pointer items-center gap-3 border border-brass px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-brass transition-colors duration-300 hover:bg-brass hover:text-slate950"
                        >
                          {uploading ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <ImagePlus size={14} />
                          )}
                          {uploading ? "Uploading" : "Add photos"}
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
                            multiple
                            data-testid="photo-upload-input"
                            onChange={addPhotos}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {photos.length > 0 && (
                        <div
                          data-testid="photo-thumbs"
                          className="mt-6 flex flex-wrap gap-4"
                        >
                          {photos.map((p) => (
                            <div
                              key={p.id}
                              data-testid={`photo-thumb-${p.id}`}
                              className="group relative h-20 w-20 overflow-hidden border border-bone/20"
                            >
                              <img
                                src={p.preview}
                                alt={p.name}
                                className="h-full w-full object-cover"
                              />
                              <button
                                type="button"
                                data-testid={`photo-remove-${p.id}`}
                                onClick={() => removePhoto(p.id)}
                                aria-label={`Remove ${p.name}`}
                                className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center bg-slate950/80 text-bone opacity-0 transition-opacity group-hover:opacity-100"
                              >
                                <X size={11} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="mt-10 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        data-testid="booking-back"
                        onClick={() => setStep(1)}
                        className="inline-flex items-center gap-2 border border-bone/25 px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-bone/70 transition-colors duration-300 hover:border-brass hover:text-brass"
                      >
                        <ArrowLeft size={15} />
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        data-testid="booking-submit"
                        className="inline-flex items-center gap-3 bg-brass px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-slate950 transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60"
                      >
                        {loading && (
                          <Loader2 size={15} className="animate-spin" />
                        )}
                        Request my flat rate
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
