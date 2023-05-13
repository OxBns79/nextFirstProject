import { useRouter } from "next/router";
import CarteDeProjet from "@/components/CarteDeProjet/CarteDeProjet";
import { connectToDatabase } from "@/helpers/mongodb";
import FiltresDeClient from "@/components/FiltresDeClient/FiltresDeClient";

export default function ProjetDuClient(props) {
  const router = useRouter();
  let nomDuClient = router.query.client;

  if (nomDuClient === "perso") {
    nomDuClient = "Projets personnels";
  } else {
    nomDuClient = `Projets de ${nomDuClient}`;
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
      return "perso";
    } else {
      return projet.client;
    }
  });
  arrayPaths = [...new Set(arrayPaths)];
  const dynamicPaths = arrayPaths.map((path) => ({
    params: { client: path },
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
