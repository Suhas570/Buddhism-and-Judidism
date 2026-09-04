import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiSend } from "../../lib/api";
import { useRole, type AuthUser } from "../../context/RoleContext";

type SignupResponse = {
  token: string;
  user: AuthUser;
};

type SignupErrors = Record<string, string[] | undefined>;

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  communityType: "buddhism" as "buddhism" | "judaism",
};

export default function UserSignUp() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<SignupErrors>({});
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setSession } = useRole();
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setErrors({});
    setGeneralError("");
    setLoading(true);

    try {
      const result = await apiSend<SignupResponse>(
        "/auth/signup",
        {
          method: "POST",
          body: JSON.stringify(form),
        },
        "user",
      );
      setSession(result.token, result.user);
      navigate("/user");
    } catch (error) {
      setGeneralError(error instanceof Error ? error.message : "Unable to create account");
      setErrors({ form: ["Please check the fields and try again."] });
    } finally {
      setLoading(false);
    }
  }

  function fieldError(name: keyof typeof initialForm) {
    return errors[name]?.[0];
  }

  return (
    <div className="min-h-screen bg-[#FAF6EF] flex items-center justify-center px-4 py-10">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white border border-[#F1E9DA] rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="mb-6">
          <h1 className="font-display font-bold text-3xl text-[#2B2420] tracking-tight">Create Account</h1>
          <p className="text-[#8A7F6E] text-sm mt-1">Choose your community and create your member login.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="First Name" error={fieldError("firstName")}>
            <input required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className="input" />
          </Field>
          <Field label="Last Name" error={fieldError("lastName")}>
            <input required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className="input" />
          </Field>
          <Field label="Email" error={fieldError("email")}>
            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" />
          </Field>
          <Field label="Phone" error={fieldError("phone")}>
            <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input" />
          </Field>
          <Field label="Password" error={fieldError("password")}>
            <input required type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="input" />
          </Field>
          <Field label="Confirm Password" error={fieldError("confirmPassword")}>
            <input required type="password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} className="input" />
          </Field>
        </div>

        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#8A7F6E] mb-2">Community</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: "buddhism", label: "Buddhism" },
              { value: "judaism", label: "Judaism" },
            ].map((option) => (
              <button
                type="button"
                key={option.value}
                onClick={() => setForm({ ...form, communityType: option.value as typeof form.communityType })}
                className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
                  form.communityType === option.value
                    ? "border-[#E8A33D] bg-[#FDF4E7] text-[#2B2420]"
                    : "border-[#F1E9DA] text-[#8A7F6E] hover:border-[#E8A33D]"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {(generalError || errors.form?.[0]) && (
          <p className="mt-4 text-sm font-medium text-[#B94A3F]">{errors.form?.[0] ?? generalError}</p>
        )}

        <button disabled={loading} type="submit" className="mt-6 w-full rounded-full bg-[#E8A33D] text-[#1C1815] font-semibold text-sm py-3 hover:bg-[#C98A28] transition-colors disabled:opacity-60">
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <p className="text-center text-sm text-[#8A7F6E] mt-5">
          Already have an account? <Link className="text-[#E8A33D] font-semibold" to="/">Sign in</Link>
        </p>
      </form>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-[#8A7F6E]">{label}</span>
      <div className="mt-1 [&_.input]:w-full [&_.input]:rounded-xl [&_.input]:border [&_.input]:border-[#F1E9DA] [&_.input]:px-3 [&_.input]:py-2 [&_.input]:text-sm [&_.input]:outline-none [&_.input]:focus:border-[#E8A33D]">
        {children}
      </div>
      {error && <span className="text-xs text-[#B94A3F] mt-1 block">{error}</span>}
    </label>
  );
}
