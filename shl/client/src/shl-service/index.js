const shl = {
  standings: () =>
    fetch("http://localhost:4001/standings").then((res) => res.json()),
  games: () => fetch("http://localhost:4001/games").then((res) => res.json()),
  goalies: () =>
    fetch("http://localhost:4001/goalkeepers").then((res) => res.json()),
  skaters: () =>
    fetch("http://localhost:4001/skaters").then((res) => res.json()),
  winstreaks: () =>
    fetch("http://localhost:400/winstreaks").then((res) => res.json()),
};

export default shl;
