import Link from "next/link";

export default function SignUpUserLink() {
  return (
    <ol className="flex flex-col gap-6">
      <p>
        {" "}
        <Link
          href="/login"
          className="font-bold hover:underline text-foreground/80"
        >
          Regístrate o inicia sesión
        </Link>{" "}
        para disfrutar de las recomendaciones de películas
      </p>
    </ol>
  );
}
