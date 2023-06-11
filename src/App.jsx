import { useEffect, useState } from "react";
import "./App.css";
const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact";

const CATS_PREFIX_URL = "https://cataas.com";

function App() {
  const [hecho, setHecho] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [error, setError] = useState();

  //este efecto es para recuperar la cita al cargar la pagina
  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then((res) => {
        if (!res.ok) {
          setError("No se ha podido recuperar la cita");
        }
        return res.json();
      })
      .then((data) => {
        const { fact } = data;
        setHecho(fact);
      });
  }, []);

  //para recuperar la imagen cada vez que tenemos una cita nueva

  useEffect(() => {
    if (!hecho) return;
    const firstWord = hecho.split(" ", 3);
    fetch(
      `https://cataas.com/cat/says/${firstWord}?size=50&
      color=red&json=true`
    )
      .then((res) => res.json())
      .then((response) => {
        const { url } = response;
        setImageUrl(url);
      });
  }, [hecho]);

  return (
    <main>
      <h1>App de Gaticos</h1>
      {hecho && <p>{hecho}</p>}
      {imageUrl && (
        <img
          src={`${CATS_PREFIX_URL}${imageUrl}`}
          alt={`Imagen extraida de ${hecho}`}
        />
      )}
    </main>
  );
}

export default App;
