import { LoginForm } from "@/sections/auth/login-form";
import { CONFIG } from "@/static";

export const metadata = { title: `Sign in | ${CONFIG.site.name}` };

export default function Page() {
  const email = process.env.EMAIL ? process.env.EMAIL : "";
  const password = process.env.PASSWORD ? process.env.PASSWORD : "";
  return (
    <div className="w-80 max-w-[500]px">
      <LoginForm email={email} password={password} />
    </div>
  );
}
