const path = require( 'path' );

const rootPath = process.cwd();

module.exports = {
  css: {
    src: `${rootPath}/_css`,
    dest: `${rootPath}/_includes`,
  },
}
