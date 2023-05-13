import classes from "./Header.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <header className={classes.Header}>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ margin: 0 }}>Bienvenue sur mon portefolio</h1>
        <nav>
          <ul
            style={{
              display: "flex",
              listStyleType: "none",
              margin: 0,
              padding: 0,
              gap: "15px",
            }}
          >
            <li>
              <Link href="/">Accueil</Link>
            </li>
            <li>
              <Link href="/projets">Projets</Link>
            </li>
            <li>
              <Link href="/aPropos">A propos</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
