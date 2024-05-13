export const protectedResources = {
  oaprojectsApi: {
    audience: 'https://oaprojects-api.oaprojects.net',
    weatherEndpoint: import.meta.env.VITE_APP_API_URL + '/WeatherForecast',
    authEndpoint: import.meta.env.VITE_APP_API_URL + '/auth',
    showEndpoint: import.meta.env.VITE_APP_API_URL + '/show',
    statEndpoint: import.meta.env.VITE_APP_API_URL + '/stat',
    infoEndpoint: import.meta.env.VITE_APP_API_URL + '/info',
    watchlistEnpoint: import.meta.env.VITE_APP_API_URL + '/watchlist',
    friendHistoryEnpoint: import.meta.env.VITE_APP_API_URL + '/friendhistory',
  },
};
