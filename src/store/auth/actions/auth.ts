export const setGeolocation = (coordinates: number[]) =>
  <const>{
    type: 'SET_COORDINATES',
    coordinates,
  };

export const restoreToken = (token: string | null) =>
  <const>{
    type: 'RESTORE_TOKEN',
    token,
  };
