import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api, formatApiError } from "@/lib/api";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("pp_token", data.access_token);
      navigate("/admin");
    } catch (err) {
      setError(formatApiError(err.response?.data?.detail) || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      data-testid="admin-login-page"
      className="grain relative flex min-h-screen items-center justify-center bg-slate950 px-6"
    >
      <div className="relative w-full max-w-md border border-bone/15 bg-bone/[0.04] p-10 backdrop-blur-xl lg:p-12">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-serif text-2xl text-bone">Post</span>
          <span className="font-serif text-2xl italic text-brass">&amp;</span>
          <span className="font-serif text-2xl text-bone">Polish</span>
        </Link>
        <p className="overline mt-8">Team access</p>
        <h1 className="mt-4 font-serif text-3xl text-bone">Lead dashboard</h1>

        <form onSubmit={submit} className="mt-10 space-y-7" data-testid="admin-login-form">
          <div>
            <Label className="text-[11px] uppercase tracking-[0.18em] text-bone/50">
              Email
            </Label>
            <Input
              data-testid="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-13 rounded-none border-0 border-b border-bone/25 bg-transparent px-0 py-3 text-bone focus-visible:border-brass focus-visible:ring-0"
            />
          </div>
          <div>
            <Label className="text-[11px] uppercase tracking-[0.18em] text-bone/50">
              Password
            </Label>
            <Input
              data-testid="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-13 rounded-none border-0 border-b border-bone/25 bg-transparent px-0 py-3 text-bone focus-visible:border-brass focus-visible:ring-0"
            />
          </div>

          {error && (
            <p data-testid="admin-login-error" className="text-sm text-clay">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            data-testid="admin-login-submit"
            className="inline-flex w-full items-center justify-center gap-3 bg-brass px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-slate950 transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60"
          >
            {loading && <Loader2 size={15} className="animate-spin" />}
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
