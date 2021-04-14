const postcss = require('postcss');
const postcssrc = require('postcss-load-config')

async function postcssShortcode(code) {
    return await postcssrc().then( ({ plugins, options }) => {
        return postcss(plugins)
            .process(code, options)
            .then((result) => result.css)
    })
}

module.exports = postcssShortcode