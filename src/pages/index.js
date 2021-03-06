import Head from 'next/head';
import { useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import * as AiIcons from 'react-icons/ai';
import { getAllCountries } from '../../database';
import styles from '../../styles/Home.module.css';
import Map from '../components/Map';

const DEFAULT_CENTER = [48.2082, 16.3738];

export default function Home(props) {
  console.log('Props', props);

  const [search, setSearch] = useState('');

  return (
    <div className={styles.container}>
      <Head>
        <title>National Dish Finder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className={styles.searchSection}>
        <h1 className={styles.heading1}>Find every country's national dish</h1>
        <div className={styles.searchContainer}>
          <AiIcons.AiOutlineSearch size="30px" />
          <label aria-label="Search bar">
            <input
              className={styles.searchInput}
              name="Search"
              placeholder="Search for country"
              value={search}
              onChange={(event) => {
                setSearch(event.currentTarget.value);
              }}
            />
          </label>
          <button className={styles.searchButton}>Search</button>
        </div>
      </section>
      <Map className={styles.homeMap} center={DEFAULT_CENTER} zoom={5}>
        {({ TileLayer, Marker, Popup }) => (
          <>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            {props.allCountries.map((country) => {
              return (
                <div key={country.id}>
                  <Marker position={[country.latitude, country.longitude]}>
                    <Popup>
                      <ReactCountryFlag countryCode={country.countrycode} />
                      <span>{country.country}</span>
                      <p>Capital city: {country.capital}</p>
                      <p>National dish: {country.dish}</p>
                      <button>See recipe</button>
                    </Popup>
                  </Marker>
                </div>
              );
            })}
          </>
        )}
      </Map>
    </div>
  );
}

export async function getStaticProps() {
  const allCountries = await getAllCountries();

  return {
    props: {
      allCountries,
    },
  };
}
