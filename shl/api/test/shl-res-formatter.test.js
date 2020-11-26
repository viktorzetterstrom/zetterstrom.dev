const formatter = require('../src/response-formatter/shl-res-formatter');

describe('standings formatter', () => {
  it('appends the team name to the correct teams', () => {
    const teams = [
      { team: { id: 'LHF' } },
      { team: { id: 'FBK' } },
      { team: { id: 'LHC' } },
    ];
    const expected = [
      { team: { id: 'LHF', name: 'Luleå' } },
      { team: { id: 'FBK', name: 'Färjestad' } },
      { team: { id: 'LHC', name: 'Linköping' } },
    ];
    expect(formatter.standings(teams)).toStrictEqual(expected);
  });
});
