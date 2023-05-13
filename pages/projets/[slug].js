import Link from "next/link";
import { connectToDatabase } from "@/helpers/mongodb";

export default function Projet(props) {
  const { titre, descritpion, client, annee, slug } = props.projet;
  let clientAAfficher = client;
  if (client == "Projet personnel") {
    clientAAfficher = "perso";
  }

  return (
    <>
      <h1 style={{ marginBottom: "0.5rem" }}>{titre}</h1>
      <small style={{ display: "flex", gap: "15px" }}>
        <Link
          href={`/${clientAAfficher}`}
          style={{ color: "#ee6c4d", textDecoration: "none" }}
        >
          {client}
        </Link>
        <div>Projet réalisé en {annee}</div>
      </small>
    </>
  );
}

export async function getStaticPaths() {
  let projets;

  try {
    const client = await connectToDatabase();
    const db = client.db();

    projets = await db.collection("Projet").find().toArray();
  } catch (error) {
    projets = [];
  }

  const dynamicPaths = projets.map((projet) => ({
    params: { slug: projet.slug },
  }));

  return {
    paths: dynamicPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  let projetRecup;
  let { params } = context;
  const slug = params.slug;

  try {
    const client = await connectToDatabase();

    const db = client.db();

    projetRecup = await db
      .collection("Projet")
      .find({ slug: slug })
      .sort({ annee: "desc" })
      .toArray();
  } catch (error) {
    projetRecup = [];
  }

  return {
    props: {
      projet: JSON.parse(JSON.stringify(projetRecup))[0],
    },
  };
}
