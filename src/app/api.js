import axios from 'axios';

const KEY = process.env.REACT_APP_API_KEY;

/**
 * Fetch movies from API.
 * @param {*} title - Movie title to search for
 * @param {*} year - Year of release
 * @param {*} type - Type of result to return (movie, series or episode)
 * @param {*} page - Page number to return
 */
export async function searchMovies(title, year, type, page) {
  const titleParam = title ? `&s=${title}` : '';
  const yearParam = year ? `&y=${year}` : '';
  const typeParam = type ? `&type=${type}` : '';
  const pageParam = page ? `&page=${page}` : '';

  return axios({
    url: `https://www.omdbapi.com/?${KEY}${titleParam}${yearParam}${typeParam}${pageParam}`,
    method: 'GET',
  })
    .then(function (res) {
      return res.data;
    })
    .catch(function (err) {
      throw err;
    });
}
