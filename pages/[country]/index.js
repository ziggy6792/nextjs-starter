import axios from 'axios';
import Error from 'next/error';

const Home = ({ shows, country, statusCode }) => {
  if (statusCode) {
    return <Error statusCode={statusCode} />;
  }

  const renderShows = () => {
    return shows.map((showItem, index) => {
      const { show } = showItem;

      return <li key={index}>{show.name}</li>;
    });
  };

  return (
    <div className='home'>
      <ul className='tvshows-grid'>
        {renderShows()}

        <style jsx>{`
          .tvshows-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }
        `}</style>
      </ul>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  try {
    const country = context.query.country || defaultCountry || 'us';

    const response = await axios.get(`https://api.tvmaze.com/schedule?country=${country}&date=2014-12-01`);

    return {
      props: {
        shows: response.data,
        country,
      },
    };
  } catch (error) {
    return {
      props: {
        statusCode: error.response ? error.response.status : 500,
      },
    };
  }
};

export default Home;
