import Link from 'next/link';

interface CreateReviewButtonProps {
  serieId: number;
}

const CreateReviewButton: React.FC<CreateReviewButtonProps> = ({ serieId }) => {
  return (
    <Link href={`/create-review?serie_id=${serieId}`} passHref>
      <button
        className="px-4 py-2 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        Agregar reseña
      </button>
    </Link>
  );
};

export default CreateReviewButton;