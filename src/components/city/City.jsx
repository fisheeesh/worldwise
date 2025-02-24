import { useParams, useSearchParams } from "react-router-dom";
import styles from "./City.module.css";

function City() {
  const { id } = useParams()
  const [searchParams, setSearchParms] = useSearchParams()

  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')

  return (
    <div>
      <h1>City - {id}</h1>
      <p>Position: {lat}, {lng}</p>
    </div>
  );
}

export default City;
