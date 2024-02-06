import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://ih-countries-api.herokuapp.com/countries")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h1>WikiCountries: Your Guide to the World</h1>
      <ul className="list-unstyled">
        {countries
          .sort((a, b) => a.name.common.localeCompare(b.name.common))
          .map((country) => (
            <li className="border p-2 hover-div" key={country.alpha3Code}>
              <img
                src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
                alt={`${country.name.common} Flag`}
                style={{ marginRight: "10px", maxHeight: "30px" }}
              />
              <Link
                to={`/${country.alpha3Code}`}
                className="text-decoration-none text-dark"
              >
                {country.name.common}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default HomePage;
