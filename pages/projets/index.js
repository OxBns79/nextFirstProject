import CarteDeProjet from "@/components/CarteDeProjet/CarteDeProjet";
import { connectToDatabase } from "@/helpers/mongodb";

export default function Projet(props) {
  return (
    <>
      <div>Projets</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
        }}
      >
        {props.projets.map((projet) => (
          <CarteDeProjet projets={projet} />
        ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  let projets;
  let client;

  try {
    const client = await connectToDatabase();

    const db = client.db();

    projets = await db
      .collection("Projet")
      .find()
      .sort({ annee: "desc" })
      .toArray();
  } catch (error) {
    projets = [];
  }

  return {
    props: {
      projets: JSON.parse(JSON.stringify(projets)),
    },
  };
}
