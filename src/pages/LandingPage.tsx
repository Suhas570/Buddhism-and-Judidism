import { useState, type FormEvent, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, User, Settings, Crown } from "lucide-react";
import { ApiError, apiSend } from "../lib/api";
import { useRole, type AuthUser, type Role } from "../context/RoleContext";

type LoginResponse = { token: string; user: AuthUser };
type SignupErrors = Record<string, string[] | undefined>;
type AuthMode = "login" | "signup" | "forgot" | "reset";

const signupInitial = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  communityType: "buddhism" as "buddhism" | "judaism",
};

function LotusIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="14" rx="4" ry="5" fill="currentColor" opacity="0.9" />
      <ellipse cx="7" cy="13" rx="3" ry="4" transform="rotate(-25 7 13)" fill="currentColor" opacity="0.7" />
      <ellipse cx="17" cy="13" rx="3" ry="4" transform="rotate(25 17 13)" fill="currentColor" opacity="0.7" />
      <line x1="12" y1="19" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="22" x2="9" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="22" x2="15" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

interface PortalCardProps {
  badge: string;
  badgeStyle: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  buttonLabel: string;
  buttonStyle: string;
  cardStyle: string;
  titleStyle: string;
  descStyle: string;
  role: Exclude<Role, null>;
  route: string;
  defaultEmail: string;
  onForgot: (email: string) => void;
}

function PortalCard({
  badge,
  badgeStyle,
  icon: Icon,
  iconBg,
  iconColor,
  title,
  description,
  buttonLabel,
  buttonStyle,
  cardStyle,
  titleStyle,
  descStyle,
  role,
  route,
  defaultEmail,
  onForgot,
}: PortalCardProps) {
  const { setSession } = useRole();
  const navigate = useNavigate();
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await apiSend<LoginResponse>(
        "/auth/login",
        { method: "POST", body: JSON.stringify({ email, password }) },
        role,
      );

      if (result.user.role !== role) {
        setError("This account does not have access to this portal.");
        return;
      }

      setSession(result.token, result.user);
      navigate(route);
    } catch {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`relative rounded-3xl p-8 flex flex-col gap-5 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 ${cardStyle}`}>
      <div className="flex items-start justify-between">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${iconBg}`}>
          <Icon size={22} className={iconColor} />
        </div>
        <span className={`inline-flex items-center rounded-full text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 border ${badgeStyle}`}>{badge}</span>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className={`font-display font-bold text-xl tracking-tight ${titleStyle}`}>{title}</h2>
        <p className={`text-sm leading-relaxed ${descStyle}`}>{description}</p>
      </div>
      <div className="space-y-3">
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-xl border border-[#E5DAC8] bg-white px-3 py-2 text-sm text-[#2B2420] focus:outline-none focus:border-[#E8A33D]" placeholder="Email" required />
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-xl border border-[#E5DAC8] bg-white px-3 py-2 text-sm text-[#2B2420] focus:outline-none focus:border-[#E8A33D]" placeholder="Password" required />
        {error && <p className="text-xs font-medium text-[#B94A3F]">{error}</p>}
      </div>
      <button type="submit" disabled={loading} className={`mt-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:gap-3 cursor-pointer disabled:opacity-60 ${buttonStyle}`}>
        {loading ? "Signing in..." : buttonLabel}
        <ArrowRight size={15} />
      </button>
      <button type="button" onClick={() => onForgot(email)} className="text-xs font-semibold text-[#8A7F6E] hover:text-[#E8A33D]">
        Forgot password?
      </button>
    </form>
  );
}

function SignupPanel({ onDone }: { onDone: () => void }) {
  const { setSession } = useRole();
  const navigate = useNavigate();
  const [form, setForm] = useState(signupInitial);
  const [errors, setErrors] = useState<SignupErrors>({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setErrors({});
    setLoading(true);
    try {
      const result = await apiSend<LoginResponse>(
        "/auth/signup",
        { method: "POST", body: JSON.stringify(form) },
        "user",
      );
      setSession(result.token, result.user);
      navigate("/user");
      onDone();
    } catch (error) {
      if (error instanceof ApiError) {
        setErrors(error.details ?? { form: [error.message] });
      } else {
        setErrors({ form: ["Unable to create account."] });
      }
    } finally {
      setLoading(false);
    }
  }

  function fieldError(name: keyof typeof signupInitial) {
    return errors[name]?.[0];
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-white border border-[#F1E9DA] rounded-3xl p-6 md:p-8 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="First Name" error={fieldError("firstName")}><input required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className="input" /></Field>
        <Field label="Last Name" error={fieldError("lastName")}><input required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className="input" /></Field>
        <Field label="Email" error={fieldError("email")}><input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" /></Field>
        <Field label="Phone" error={fieldError("phone")}><input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input" /></Field>
        <Field label="Password" error={fieldError("password")}><input required type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="input" /></Field>
        <Field label="Confirm Password" error={fieldError("confirmPassword")}><input required type="password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} className="input" /></Field>
      </div>
      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#8A7F6E] mb-2">Community</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: "buddhism", label: "Buddhism" },
            { value: "judaism", label: "Judaism" },
          ].map((option) => (
            <button type="button" key={option.value} onClick={() => setForm({ ...form, communityType: option.value as typeof form.communityType })} className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${form.communityType === option.value ? "border-[#E8A33D] bg-[#FDF4E7] text-[#2B2420]" : "border-[#F1E9DA] text-[#8A7F6E] hover:border-[#E8A33D]"}`}>
              {option.label}
            </button>
          ))}
        </div>
      </div>
      {errors.form?.[0] && <p className="mt-4 text-sm font-medium text-[#B94A3F]">{errors.form[0]}</p>}
      <button disabled={loading} type="submit" className="mt-6 w-full rounded-full bg-[#E8A33D] text-[#1C1815] font-semibold text-sm py-3 hover:bg-[#C98A28] transition-colors disabled:opacity-60">
        {loading ? "Creating account..." : "Create Account"}
      </button>
    </form>
  );
}

function PasswordPanel({ mode, initialEmail, onMode }: { mode: "forgot" | "reset"; initialEmail: string; onMode: (mode: AuthMode) => void }) {
  const [email, setEmail] = useState(initialEmail);
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<SignupErrors>({});

  async function requestReset(event: FormEvent) {
    event.preventDefault();
    setErrors({});
    const result = await apiSend<{ message: string; resetToken?: string }>("/auth/forgot-password", { method: "POST", body: JSON.stringify({ email }) }, "user");
    setMessage(result.resetToken ? `Reset token: ${result.resetToken}` : result.message);
    if (result.resetToken) setToken(result.resetToken);
    onMode("reset");
  }

  async function resetPassword(event: FormEvent) {
    event.preventDefault();
    setErrors({});
    try {
      const result = await apiSend<{ message: string }>("/auth/reset-password", { method: "POST", body: JSON.stringify({ email, token, password, confirmPassword }) }, "user");
      setMessage(result.message);
    } catch (error) {
      if (error instanceof ApiError) setErrors(error.details ?? { form: [error.message] });
    }
  }

  return (
    <form onSubmit={mode === "forgot" ? requestReset : resetPassword} className="w-full max-w-xl bg-white border border-[#F1E9DA] rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
      <Field label="Email" error={errors.email?.[0]}><input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" /></Field>
      {mode === "reset" && (
        <>
          <Field label="Reset Token" error={errors.token?.[0]}><input required value={token} onChange={(e) => setToken(e.target.value)} className="input" /></Field>
          <Field label="New Password" error={errors.password?.[0]}><input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" /></Field>
          <Field label="Confirm Password" error={errors.confirmPassword?.[0]}><input required type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="input" /></Field>
        </>
      )}
      {errors.form?.[0] && <p className="text-sm font-medium text-[#B94A3F]">{errors.form[0]}</p>}
      {message && <p className="text-sm font-medium text-[#6B8E5A] break-all">{message}</p>}
      <button type="submit" className="w-full rounded-full bg-[#2B2420] text-[#F5EFE3] font-semibold text-sm py-3 hover:bg-[#1C1815] transition-colors">
        {mode === "forgot" ? "Get Reset Token" : "Reset Password"}
      </button>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-[#8A7F6E]">{label}</span>
      <div className="mt-1 [&_.input]:w-full [&_.input]:rounded-xl [&_.input]:border [&_.input]:border-[#F1E9DA] [&_.input]:px-3 [&_.input]:py-2 [&_.input]:text-sm [&_.input]:outline-none [&_.input]:focus:border-[#E8A33D]">{children}</div>
      {error && <span className="text-xs text-[#B94A3F] mt-1 block">{error}</span>}
    </label>
  );
}

export function LandingPage() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [resetEmail, setResetEmail] = useState("");
  const isLogin = mode === "login";

  return (
    <div className="min-h-screen bg-[#FAF6EF] flex flex-col">
      <div className="flex items-center justify-center pt-10 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#1C1815] flex items-center justify-center text-[#E8A33D]"><LotusIcon size={20} /></div>
          <span className="font-display font-bold text-2xl text-[#2B2420]">Community<span className="text-[#C9A227]">Connect</span></span>
        </div>
      </div>

      <div className="flex flex-col items-center text-center px-6 pt-10 pb-8">
        <h1 className="font-display font-bold text-4xl md:text-6xl text-[#2B2420] tracking-tight leading-tight max-w-2xl">
          {isLogin ? "Sign in" : mode === "signup" ? "Create member account" : mode === "forgot" ? "Forgot password" : "Reset password"}
        </h1>
        <p className="mt-4 text-[#8A7F6E] text-lg max-w-xl leading-relaxed">
          One platform for Buddhism and Judaism communities.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <button onClick={() => setMode("login")} className={`px-4 py-2 rounded-full text-sm font-semibold ${mode === "login" ? "bg-[#2B2420] text-white" : "bg-white text-[#8A7F6E] border border-[#F1E9DA]"}`}>Sign in</button>
          <button onClick={() => setMode("signup")} className={`px-4 py-2 rounded-full text-sm font-semibold ${mode === "signup" ? "bg-[#E8A33D] text-[#1C1815]" : "bg-white text-[#8A7F6E] border border-[#F1E9DA]"}`}>Create account</button>
          <button onClick={() => setMode("forgot")} className={`px-4 py-2 rounded-full text-sm font-semibold ${mode === "forgot" || mode === "reset" ? "bg-[#FDF4E7] text-[#2B2420] border border-[#E8A33D]" : "bg-white text-[#8A7F6E] border border-[#F1E9DA]"}`}>Password help</button>
        </div>
      </div>

      <div className="flex-1 flex items-start justify-center px-6 pb-16">
        {mode === "signup" && <SignupPanel onDone={() => setMode("login")} />}
        {(mode === "forgot" || mode === "reset") && <PasswordPanel mode={mode} initialEmail={resetEmail} onMode={setMode} />}
        {mode === "login" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
            <PortalCard badge="User Portal" badgeStyle="border-[#E8A33D] text-[#E8A33D] bg-transparent" icon={User} iconBg="bg-[#FDF4E7]" iconColor="text-[#E8A33D]" title="Community Member" description="Access teachings, courses, events, and your community." buttonLabel="Open Dashboard" buttonStyle="bg-[#2B2420] text-[#F5EFE3] hover:bg-[#1C1815]" cardStyle="bg-white border border-[#F1E9DA]" titleStyle="text-[#2B2420]" descStyle="text-[#8A7F6E]" role="user" route="/user" defaultEmail="" onForgot={(email) => { setResetEmail(email); setMode("forgot"); }} />
            <PortalCard badge="Admin Panel" badgeStyle="border-transparent bg-[#E8A33D] text-[#2B2420]" icon={Settings} iconBg="bg-[#FEF3DC]" iconColor="text-[#C98A28]" title="Community Admin" description="Manage members, teachings, events, and announcements." buttonLabel="Open Panel" buttonStyle="bg-[#E8A33D] text-[#2B2420] hover:bg-[#C98A28]" cardStyle="bg-[#FDF4E7] border border-[#F1E0B8]" titleStyle="text-[#2B2420]" descStyle="text-[#7A6A50]" role="admin" route="/admin" defaultEmail="" onForgot={(email) => { setResetEmail(email); setMode("forgot"); }} />
            <PortalCard badge="Super Admin" badgeStyle="border-[#C9A227] text-[#C9A227] bg-transparent" icon={Crown} iconBg="bg-[#2A2018]" iconColor="text-[#C9A227]" title="Platform Admin" description="Oversee all communities and platform operations." buttonLabel="Open Control Center" buttonStyle="bg-[#C9A227] text-[#1C1815] hover:bg-[#B08C1E]" cardStyle="bg-[#1C1815] border border-[#3A3028]" titleStyle="text-[#F5EFE3]" descStyle="text-[#8A7F6E]" role="super-admin" route="/super-admin" defaultEmail="" onForgot={(email) => { setResetEmail(email); setMode("forgot"); }} />
          </div>
        )}
      </div>

      <footer className="text-center pb-8 text-[#B8A98C] text-xs">2024 CommunityConnect - Built for multi-community management</footer>
    </div>
  );
}
