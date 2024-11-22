import { SessionStateGuard } from "@/guard/session-state-guard";
import { SimpleLayout } from "@/layouts/simple";
import { CONFIG } from "@/static";

export const metadata = { title: `Home | ${CONFIG.site.name}` };

export default function Home() {
  return (
    <SessionStateGuard>
      <SimpleLayout>
        <div>Home</div>
      </SimpleLayout>
    </SessionStateGuard>
  );
}
