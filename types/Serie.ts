export default interface Serie {
    id: number;
    name: string;
    streaming_service: string;
    n_seasons: number;
    n_chapter_by_season: number;
    description: string;
    category: string;
    stars: number;
    n_reviews: number;
    image: string;
}