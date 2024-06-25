import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import SubmitButton from "@/components/SubmitButton";
import BackButton from "@/components/BackButton";

export default async function CreateRewiew({
  searchParams,
}: {
  searchParams: { serie_id: string; message: string };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();


  if (!user) {
    return redirect("/login");
  }

  const createReview = async (formData: FormData) => {
    "use server";

    const supabase = createClient();
    const stars = parseInt(formData.get("stars") as string);
    const comment = formData.get("comment") as string;
    const serie_id = searchParams.serie_id;

    if (stars < 1 || stars > 10) {
        return redirect("/create-review?serie_id=" + serie_id + "&message=Las estrellas deben estar entre 1 y 10.");
        }

    if (comment.length < 5) {
        return redirect("/create-review?serie_id=" + serie_id + "&message=El comentario debe tener al menos 5 caracteres.");
    }
        
    const { error } = await supabase
      .from('reviews')
      .insert([
        {
          comment: formData.get("comment") as string,
          stars: stars,
          user_id: user.id,
          serie_id: searchParams.serie_id,
        },
      ])

    if (error) {
        console.log(error);
        
      return redirect("/create-review?serie_id=" + searchParams.serie_id + "&message=Error al crear la reseña.");
    }

    return redirect("/");
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 my-40">
      <BackButton />

      <form className="flex-1 flex flex-col w-full justify-start gap-2 text-foreground">
        <label className="text-md" htmlFor="comment">
          Comentario 
        </label>
        <textarea
          className="rounded-md p-10 px-4 py-2 bg-inherit border mb-6"
          name="comment"
          required
          rows={10}
          cols={50}
          minLength={5}
          maxLength={2000}
        />
        <label className="text-md" htmlFor="stars">
          Estrellas
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="stars"
          required
          min={1}
          max={10}
        />
        
        <SubmitButton
          formAction={createReview}
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
