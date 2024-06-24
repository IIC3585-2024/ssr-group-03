import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import SerieForList from "@/components/SeriesList/SerieForList";

export default async function SeriesList() {
  const supabase = createClient();
  const { data: series, error } = await supabase.from("series").select("*");
  return (
    <div>
      <ul className="flex flex-col gap-10">
        {series.map((serie) => (
          <li key={serie.id}>
            < SerieForList serie={serie} />
          </li>
        ))}
      </ul>
    </div>
  );
}
