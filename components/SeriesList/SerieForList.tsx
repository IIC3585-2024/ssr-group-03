interface Serie {
    name: string;
    image: string;
    description: string;
}

export default function SerieForList({ serie }: { serie: Serie }) {
    return (
        <div className="flex items-center gap-4">
            <img
                src={serie.image}
                alt={`Poster de ${serie.name}`}
                className="w-32 h-48"
            />
            <div className="flex-1 flex flex-col gap-4">
                <h1 className="text-2xl">{serie.name}</h1>
                <p>{serie.description}</p>
                <p>
                    <span className="text-yellow-500">★ </span> 
                    <span>1.2 </span> 
                    <span className="text-gray-500">(5)</span>
                </p>
            </div>
        </div>
    );
}