import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function CountryDetailsPage() {
  const { countryId } = useParams();
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);

  useEffect(() => {
    axios
      .get(`https://ih-countries-api.herokuapp.com/countries/${countryId}`)
      .then((response) => {
        setCountry(response.data);
        const borderPromises = response.data.borders.map((border) =>
          axios.get(
            `https://ih-countries-api.herokuapp.com/countries/${border}`
          )
        );
        return Promise.all(borderPromises);
      })
      .then((borderResponses) => {
        const borderCountriesData = borderResponses.map(
          (response) => response.data
        );
        setBorderCountries(borderCountriesData);
      })
      .catch((error) => {
        console.error("Error fetching country details:", error);
      });
  }, [countryId]);

  if (!country) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Country Details</h1>
      <ul className="list-unstyled">
        <img
          src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
          alt={`${country.name.common} Flag`}
          style={{ maxHeight: "30px" }}
        />
        <h2>{country.name.common}</h2>
        <li style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ marginLeft: "90px" }}>Capital:</span>
          <span style={{ marginRight: "90px", paddingRight: "90px" }}>
            {country.capital}
          </span>
        </li>
        <hr></hr>
        <li style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ marginLeft: "90px" }}>Área:</span>
          <span style={{ marginRight: "90px", paddingRight: "90px" }}>
            {country.area} km²
          </span>
        </li>
      </ul>
      <hr></hr>
      <h6 style={{ textAlign: "left", marginLeft: "90px" }}>Borders:</h6>
      <ul
        className="list-unstyled"
        style={{
          paddingLeft: 0,
          textAlign: "right",
          marginRight: "98px",
          paddingRight: "98px",
        }}
      >
        {borderCountries.map((borderCountry) => (
          <li key={borderCountry.alpha3Code}>
            <Link to={`/${borderCountry.alpha3Code}`}>
              {borderCountry.alpha3Code}
            </Link>
          </li>
        ))}
      </ul>
      <hr></hr>
    </div>
  );
}

export default CountryDetailsPage;
