import { createClient } from "@supabase/supabase-js";
import groupBy from "lodash/groupBy";

export default async function AdminPanel() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { data: jobs } = await supabase
    .from("jobs")
    .select("id, title, status, technician")
    .neq("status", "complete");

  const byTech = groupBy(jobs ?? [], "technician");

  return (
    <section className="mt-12 rounded border border-amber-300 bg-amber-50 p-4">
      <h2 className="text-lg font-medium">Open jobs by technician</h2>
      {Object.entries(byTech).map(([tech, list]) => (
        <div key={tech} className="mt-3">
          <h3 className="font-medium">{tech || "Unassigned"}</h3>
          <ul className="ml-4 list-disc text-sm">
            {list.map((job) => (
              <li key={job.id}>
                {job.title} — {job.status}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
