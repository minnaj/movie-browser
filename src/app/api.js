import axios from 'axios';

const KEY = process.env.REACT_APP_API_KEY;

export async function searchMovies(title, year, getFullPlot) {
  const titleParam = title ? `&s=${title}` : '';
  const yearParam = year ? `&y=${year}` : '';
  const plotParam = getFullPlot ? '&plot=full' : '';

  return axios({
    url: `https://www.omdbapi.com/?${KEY}${titleParam}${yearParam}${plotParam}`,
    method: 'GET',
  })
    .then(function (res) {
      return res.data;
    })
    .catch(function (err) {
      return err;
    });
}
