import Link from "next/link";
import Serie from "@/types/Serie";

export default function SerieForList({ serie }: { serie: Serie }) {
    return (
        <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 flex flex-col gap-4 md:order-2">
                <h1 className="text-2xl">{serie.name}</h1>
                <p>{serie.description}</p>
                <p>
                    <span className="text-yellow-500">★ </span> 
                    <span>{serie.stars} </span> 
                    <span className="text-gray-500">({serie.n_reviews})</span>
                </p>
            </div>
            <img
                src={serie.image}
                alt={`Poster de ${serie.name}`}
                className="w-64 bg-white object-contain md:order-1"
            />
        </div>
    );
}