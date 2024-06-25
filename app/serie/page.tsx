import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import BackButton from "@/components/BackButton";
import CreateReviewButton from "@/components/CreateReviewButton";
import Review from "@/types/Review";

export default async function SeriePage({
    searchParams,
}: {
    searchParams: { id: number };
}) {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    const { data: serie, error } = await supabase
        .from('series')
        .select('*')
        .eq('id', searchParams.id)
        .single();

    const { data: profiles } = await supabase
        .from('profiles')
        .select(`
            *,
            reviews ( * )
        `)
        .eq('reviews.serie_id', searchParams.id);

    let reviews = [];
    if (profiles) {
        reviews = profiles.flatMap(profile => 
        profile.reviews.map((review: Review) => ({
            ...review,
            email: profile.email,
        }))
        );
    }

    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <BackButton />
            <p></p>
            <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
            <main className="flex-1 flex flex-col gap-6">
                <h2 className="font-bold text-4xl mb-4">{serie.name}</h2>
                <img
                    src={serie.image}
                    alt={`Poster de ${serie.name}`}
                    className="w-full bg-white object-contain"
                />
                <p>
                    <span className="text-yellow-500 text-xl">★ </span> 
                    <span>{serie.stars} </span> 
                    <span className="text-gray-500">({serie.n_reviews})</span>
                </p>
                <p>{serie.description}</p>
                <p>Servicio de Streaming: {serie.streaming_service}</p>
                <p>Cantidad de Temporadas: {serie.n_seasons}</p>
                <p>Cantidad de Capítulos por Temporada: {serie.n_chapter_by_season}</p>
                <p>Categorias: {serie.category}</p>
                <div className="flex justify-center items-center">
                    <CreateReviewButton serieId={serie.id} />
                </div>
                <h2 className="font-bold text-4xl mt-10">Reseñas</h2>
                <div className="flex flex-col gap-8">
                    {
                        reviews.length === 0 ? (
                            <p>No hay reseñas para esta serie</p>
                        ) : (
                            reviews.map(review => (
                                <div key={review.id} className="flex flex-col gap-2">
                                    <p>{review.email}</p>
                                    <p>
                                        <span className="text-yellow-500 text-xl">★ </span>
                                        <span>{review.stars}</span>
                                    </p>
                                    <p>{review.comment}</p>
                                </div>
                            ))
                        )
                    }
                </div>
            </main>
            </div>
            <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs"></footer>
        </div>
    );
};
