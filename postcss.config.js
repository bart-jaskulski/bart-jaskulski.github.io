const postcssImport = require( 'postcss-import' )
const postcssNormalize = require( 'postcss-normalize' )
const postcssPresetEnv = require( 'postcss-preset-env' )
const postcssCombineMediaQuery = require( 'postcss-combine-media-query' )
const postcssExtractMediaQuery = require( 'postcss-extract-media-query' )
const postcssPxToRem = require( 'postcss-pxtorem' )
const cssnano = require( 'cssnano' );

const paths = require( './paths' );

module.exports = ctx => (
	{
		map: ctx.options.map,
		plugins: [
			postcssImport(
				postcssNormalize().postcssImport( {
					path: [ paths.css.src ]
				} )
			),
			postcssPresetEnv( {
				// importFrom: `${paths.css.src}/_custom-media.css`,
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
			postcssCombineMediaQuery(),
			postcssPxToRem( {
				rootValue: 16,
				mediaQuery: true,
				propList: [ "*", "!border*" ],
				unitPrecision: 1,
				minPixelValue: 10,
			} ),
			// postcssExtractMediaQuery({
			// 	output: {
			// 		path: paths.css.dest,
			// 		name: '[name]-[query].[ext]',
			// 	},
			// 	queries: {
			// 		'(min-width: 37.5rem)': 'desktop',
			// 		'(max-width: 37.5rem)': 'mobile',
			// 	},
			// 	extractAll: false,
			// }),
			ctx.env === 'production' ? cssnano() : null,
		]
	})
