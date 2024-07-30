
import './App.css';
import countryService from './countryService';
import { useEffect,useState } from 'react';


function App() {
 
  const [countries, setCountries] = useState([]);
const [region, setRegion] = useState('All');
const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    countryService.getAllCountries()
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error('Error fetching the countries:', error);
      });
  }, []);
  
  useEffect(() => {
    if (searchTerm) {
    countryService.getCountry(searchTerm)
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error('Error fetching the countries by name:', error);
        setCountries([]); // Reset countries if search fails
      });
  }else if(region === 'All') {
    countryService.getAllCountries()
      .then(response => {
        console.log(response);
        setCountries(response.data);
      })
      .catch(error => {
        console.error('Error fetching the countries:', error);
      });
  } else {
    countryService.getCountriesByRegion(region)
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error('Error fetching the countries:', error);
      });
  }
}, [region,searchTerm]);


  return (
    <div className="App">
    <label>
        Filter by Region:
        <select value={region} onChange={(e) => setRegion(e.target.value)}>
          <option value="All">All</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </label>
      <ul>
        {countries.map((country, index) => (
          <li key={index}>
            <img src={country.flags.png} alt={country.name.common} style={{width: '50px'}} />
            <p>{country.name.common}</p>
            <p>{country.region}</p>
          </li>
        ))}
      </ul>
      <label>
        Search by Name:
        <input 
          type="text" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          placeholder="Enter country name" 
        />
      </label>

    </div>
  );
}

export default App;
