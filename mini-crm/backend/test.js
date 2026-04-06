try {
  require('./server.js');
} catch (e) {
  require('fs').writeFileSync('clean_err.txt', e.stack);
}
