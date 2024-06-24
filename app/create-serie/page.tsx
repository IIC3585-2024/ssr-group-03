import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import SubmitButton from "@/components/SubmitButton";

export default async function CreateSerie({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const createSerie = async (formData: FormData) => {
    "use server";

    const supabase = createClient();

    const { error } = await supabase
      .from('series')
      .insert([
        {
          name: formData.get("name") as string,
          streaming_service: formData.get("streaming_service") as string,
          n_seasons: formData.get("n_seasons") as string,
          n_chapter_by_season: formData.get("n_chapter_by_season") as string,
          description: formData.get("description") as string,
          category: formData.get("category") as string,
          image: formData.get("image") as string,
        },
      ])

    if (error) {
      return redirect("/create-serie?message=No se pudo crear la serie. Intenta nuevamente.");
    }

    return redirect("/");
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 my-40">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Volver
      </Link>

      <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <label className="text-md" htmlFor="name">
          Nombre
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="name"
          required
        />
        <label className="text-md" htmlFor="streaming_service">
          Servicio de Streaming
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="streaming_service"
          required
        />
        <label className="text-md" htmlFor="n_seasons">
          Cantidad de Temporadas
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="n_seasons"
          required
        />
        <label className="text-md" htmlFor="n_chapter_by_season">
          Cantidad de Capítulos por Temporada
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="n_chapter_by_season"
          required
        />
        <label className="text-md" htmlFor="description">
          Descripción
        </label>
        <textarea
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="description"
          required
        />
        <label className="text-md" htmlFor="category">
          Categoría
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="category"
          required
        />
        <label className="text-md" htmlFor="image">
          URL de la Imagen
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-16"
          name="image"
          required
        />
        <SubmitButton
          formAction={createSerie}
          className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Creando..."
        >
          Crear
        </SubmitButton>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
