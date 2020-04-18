const MONTHS_ENUM = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export const convertUnixToFriendlyTime = gameMonth => {
  let year = 5000;
  while (gameMonth >= 12) {
    year++;
    gameMonth -= 12;
  }
  return `${MONTHS_ENUM[gameMonth]} ${year}`
}