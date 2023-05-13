import classes from "./CarteDeProjet.module.css";
import { useRouter } from "next/router";
import Link from "next/link";

export default function CarteDeProjet(props) {
  const router = useRouter();
  const { titre, description, annee, slug, client } = props.projets;

  const onClickRedirect = () => {
    router.push({
      pathname: "/projets/[slug]",
      query: {
        slug: "believemy",
      },
    });
  };

  return (
    <Link href={`/projets/${slug}`} className={classes.CarteDeProjet}>
      <div onClick={onClickRedirect}>
        <h3>{titre}</h3>
        <p>
          {description}
        </p>
      </div>
    </Link>
  );
}
