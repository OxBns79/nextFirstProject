export default function Index(props) {
  return (
    <main>
      <h1>Bienvenue</h1>
      <p>{props.prixBitcoin}</p>
    </main>
  );
}

export async function getStaticProps() {
  let bitcoin;
  await fetch("https://blockchain.info/ticker")
    .then((response) => response.json())
    .then((data) => (bitcoin = data.EUR.last));

  return {
    props: { prixBitcoin: bitcoin },
  };
}
