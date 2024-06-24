import AuthButton from "../components/Navbar/AuthButton";
import { createClient } from "@/utils/supabase/server";
import Navbar from "@/components/Navbar/Navbar";
import SignUpUserLink from "@/components/LandingPage/SignUpUserLink";
import SeriesList from "@/components/SeriesList/SeriesList";

export default async function Index() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <Navbar />

        <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
          <main className="flex-1 flex flex-col gap-6">
            <h2 className="font-bold text-4xl mb-4">Recomendaciones de Series</h2>
            {<SignUpUserLink />}
          </main>
        </div>
      </div>    
    )
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <Navbar />

      <div className="flex-1 flex flex-col gap-4 max-w-4xl px-3">
          <h2 className="font-bold text-4xl mb-4">Recomendaciones de Series</h2>
          <SeriesList />
      </div>
    </div>
  );
}
