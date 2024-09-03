import ClientComp from "./components/ClientComp";

export const ENDPOINT_URL = "https://pokeapi.co/api/v2/pokemon";

export default function Home() {
  return (
    <div>
      <ClientComp />
    </div>
  );
}
