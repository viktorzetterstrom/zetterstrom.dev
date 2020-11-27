const apiUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4001"
    : "https://shl.zetterstrom.dev/api";

const shl = {
  standings: () => fetch(`${apiUrl}/standings`).then((res) => res.json()),
  games: () => fetch(`${apiUrl}/games`).then((res) => res.json()),
  goalies: () => fetch(`${apiUrl}/goalkeepers`).then((res) => res.json()),
  skaters: () => fetch(`${apiUrl}/skaters`).then((res) => res.json()),
  winstreaks: () => fetch(`${apiUrl}/winstreaks`).then((res) => res.json()),
};

export default shl;
