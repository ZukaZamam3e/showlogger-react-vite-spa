export const protectedResources = {
  oaprojectsApi: {
    audience: 'https://oaprojects-api.oaprojects.net',
    weatherEndpoint: import.meta.env.VITE_APP_API_URL + '/WeatherForecast',
    authEndpoint: import.meta.env.VITE_APP_API_URL + '/auth',
    loginEndpoint: import.meta.env.VITE_APP_API_URL + '/login',
    showEndpoint: import.meta.env.VITE_APP_API_URL + '/show',
    statEndpoint: import.meta.env.VITE_APP_API_URL + '/stat',
    infoEndpoint: import.meta.env.VITE_APP_API_URL + '/info',
    watchlistEnpoint: import.meta.env.VITE_APP_API_URL + '/watchlist',
    friendHistoryEnpoint: import.meta.env.VITE_APP_API_URL + '/friendhistory',
    friendEndpoint: import.meta.env.VITE_APP_API_URL + '/friend',
    transactionEnpoint: import.meta.env.VITE_APP_API_URL + '/transaction',
    bookEndpoint: import.meta.env.VITE_APP_API_URL + '/book',
    tvInfoEndpoint: import.meta.env.VITE_APP_API_URL + '/tvinfo',
    movieInfoEndpoint: import.meta.env.VITE_APP_API_URL + '/movieinfo',
    unlinkedShowsEndpoint: import.meta.env.VITE_APP_API_URL + '/unlinkedshows',
  },
};
