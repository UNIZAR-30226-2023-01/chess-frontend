// recibe un objeto players con 2 URIs
// {
//   lightPlayer: https://api.gracehopper.xyz/v1/users/644d0a8bd193a3c9043abb95 | null
//   darkPlayer: https://api.gracehopper.xyz/v1/users/644d0a8bd193a3c9043abb96 | null
// }
//  me (id) del usuario que esta logueado
export const whoami = (players, me) => {
  const { lightPlayer, darkPlayer } = players;

  if (lightPlayer && lightPlayer.split('/')[5] === me) return 'LIGHT';
  if (darkPlayer && darkPlayer.split('/')[5] === me) return 'DARK';
  return 'SPECTATOR';
};
