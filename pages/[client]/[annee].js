import { useRouter } from "next/router";
import CarteDeProjet from "@/components/CarteDeProjet/CarteDeProjet";
import FiltresDeClient from "@/components/FiltresDeClient/FiltresDeClient";
import { connectToDatabase } from "@/helpers/mongodb";

export default function ProjetDuClientFiltre(props) {
  const router = useRouter();
  const annee = router.query.annee;
  let nomDuClient = router.query.client;

  if (nomDuClient === "perso") {
    nomDuClient = `Projets personnels de ${annee}`;
  } else {
    nomDuClient = `Projets de ${nomDuClient} de ${annee}`;
  }

  return (
    <>
      <h1>{nomDuClient}</h1>

      <FiltresDeClient client={router.query.client} annees={props.annees} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          marginTop: "15px",
        }}
      >
        {props.projets.map((projet) => (
          <CarteDeProjet projets={projet} />
        ))}
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const client = await connectToDatabase();
  const db = client.db();

  const projets = await db.collection("Projet").find().toArray();

  let arrayPaths = projets.map((projet) => {
    if (projet.client == "Projet personnel") {
      return ["perso", projet.annee];
    } else {
      return [projet.client, projet.annee];
    }
  });
  arrayPaths = [...new Set(arrayPaths)];
  const dynamicPaths = arrayPaths.map((path) => ({
    params: { client: path[0], annee: path[1] },
  }));

  return {
    paths: dynamicPaths,
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  let projets;
  let annees;
  const { params } = context;
  let clientParam = params.client;
  let anneeParam = +params.annee;

  if (clientParam == "perso") {
    clientParam = "Projet personnel";
  }

  try {
    const client = await connectToDatabase();
    const db = client.db();

    projets = await db
      .collection("Projet")
      .find({ client: clientParam })
      .toArray();
    projets = JSON.parse(JSON.stringify(projets));

    annees = projets.map((projet) => projet.annee);
    annees = [...new Set(annees)];

    projets = projets.filter((projet) => projet.annee == anneeParam);
    
  } catch (error) {
    projets = [];
  }

  return {
    props: {
      projets: projets,
      annees: annees,
    },
  };
}
