const hri = require('human-readable-ids').hri;

(function () {
  const ids = [];
  for (let i = 0; i < 100; i++) {
    ids.push(hri.random())
  }

  require('fs').writeFileSync('new.json', JSON.stringify(ids));
})();
