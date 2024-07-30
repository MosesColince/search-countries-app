import axios from 'axios';
import App from './App';

const API_URL = 'https://restcountries.com/v3.1';

const getAllCountries = () => {
  return axios.get(`${API_URL}/all`);
};

const getCountriesByRegion = (region) => {
  return axios.get(`${API_URL}/region/${region}`);
};

const getCountry = (countryName) =>{
    return axios.get(`${API_URL}/name/${countryName}`)
}

export default {
  getAllCountries,
  getCountriesByRegion,
  getCountry,
};