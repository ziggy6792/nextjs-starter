import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import Link from 'next/link';
import { isAuthenticated } from '../../utils/requireAuthentication';

const countries = [
  {
    label: 'us',
    name: 'United States',
  },
  {
    label: 'br',
    name: 'Brazil',
  },
];

const Header = () => {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState(router.query.country);

  const handleChange = (e) => {
    setSelectedCountry(e.target.value);
    // /country
    router.push(`/[country]`, `/${e.target.value}`);
  };

  useEffect(() => {
    if (selectedCountry) {
      nookies.set(null, 'defaultCountry', selectedCountry, { maxAge: 30 * 24 * 60 * 60, path: '/' });
    }
  }, [selectedCountry]);

  const [isAuth, setIsAuth] = useState(false);

  const renderCountries = () => {
    return countries.map((country) => {
      return (
        <option key={country.label} value={country.label}>
          {country.name}
        </option>
      );
    });
  };

  return (
    <div className='header'>
      <select value={selectedCountry} onChange={handleChange}>
        {renderCountries()}
      </select>

      {isAuthenticated() && (
        <Link href='/[country]' as={`/${selectedCountry}`}>
          <a
            onClick={() => {
              console.log('sign out!');
              nookies.destroy(null, 'token');
            }}>
            sign out
          </a>
        </Link>
      )}

      <style jsx>{`
        .header {
          padding: 20px;
          background-color: #333;
          color: #fff;
          text-align: center;
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
        }

        .header > :global(a) {
          color: #fff;
        }
      `}</style>
    </div>
  );
};

export default Header;
