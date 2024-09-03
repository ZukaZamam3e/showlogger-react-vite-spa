export const protectedResources = {
  oaprojectsApi: {
    audience: 'https://oaprojects-api.oaprojects.net',
    authEndpoint: import.meta.env.VITE_APP_API_URL + '/show-logger/auth',
    loginEndpoint: import.meta.env.VITE_APP_API_URL + '/show-logger/login',
    showEndpoint: import.meta.env.VITE_APP_API_URL + '/show-logger/show',
    statEndpoint: import.meta.env.VITE_APP_API_URL + '/show-logger/stat',
    infoEndpoint: import.meta.env.VITE_APP_API_URL + '/show-logger/info',
    watchlistEnpoint:
      import.meta.env.VITE_APP_API_URL + '/show-logger/watchlist',
    friendHistoryEnpoint:
      import.meta.env.VITE_APP_API_URL + '/show-logger/friendhistory',
    friendEndpoint: import.meta.env.VITE_APP_API_URL + '/show-logger/friend',
    transactionEnpoint:
      import.meta.env.VITE_APP_API_URL + '/show-logger/transaction',
    bookEndpoint: import.meta.env.VITE_APP_API_URL + '/show-logger/book',
    tvInfoEndpoint: import.meta.env.VITE_APP_API_URL + '/show-logger/tvinfo',
    movieInfoEndpoint:
      import.meta.env.VITE_APP_API_URL + '/show-logger/movieinfo',
    unlinkedShowsEndpoint:
      import.meta.env.VITE_APP_API_URL + '/show-logger/unlinkedshows',
    whatsNextEndpoint:
      import.meta.env.VITE_APP_API_URL + '/show-logger/whatsnext',
  },
};
