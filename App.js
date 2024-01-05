import { MovieProvider } from "./src/context/MovieContext";
import Homepage from "./src/pages/Homepage/Homepage";

export default function App() {

  return (
    <MovieProvider>
      <Homepage />
    </MovieProvider>
  );
}