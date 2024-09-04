import ClientComp from "./components/ClientComp";
import Navbar from "./components/Navbar/Navbar";

export const ENDPOINT_URL = "https://pokeapi.co/api/v2/pokemon";

export default function Home() {
  return (
    <>
      <Navbar />
      <ClientComp />
    </>
  );
}
