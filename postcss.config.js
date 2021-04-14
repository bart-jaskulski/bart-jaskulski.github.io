const atImport = require( 'postcss-import' )
const postcssPresetEnv = require( 'postcss-preset-env' )
const postcssPxToRem = require( 'postcss-pxtorem' )
const cssnano = require( 'cssnano' );

// const paths = require( './paths' );
const path = require('path');

module.exports = {
		map: 'inline',
		from: path.join( __dirname, '_includes/css/style.css' ),
		plugins: [
			atImport(),
			postcssPresetEnv( {
				autoprefixer: {
					'grid': false,
				},
				features: {
					"custom-media-queries": true,
					"custom-properties": true,
					"custom-selectors": true,
					"nesting-rules": true,
				},
			} ),
			postcssPxToRem( {
				rootValue: 16,
				mediaQuery: true,
				propList: [ "*", "!border*" ],
				unitPrecision: 1,
				minPixelValue: 10,
			} ),
			cssnano()
		]
	}
