const CountryDetails = ({ country }) => {
    console.log("Maa", country)
    if (!country) {
        return null;
    }
    const languages = Object.entries(country.languages).map(([code, name]) => (
        <li key={code}>{name}</li>
      ))
    return (
        <div>
        <h1>{country.name.common}</h1>
        <li className='country'>
            Capital: {country.capital[0]}
        </li>
        <p>Official Name: {country.name.official}</p>
        <p>Area: {country.area} km^2</p>
        <h2>Languages:</h2>
        <ul>{languages}</ul>
        <img src={country.flags.png} alt={`${country.name.common} flag`} />
        </div>
    )
  }
  
  export default CountryDetails