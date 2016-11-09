module.exports = [
	require("./make-webpack-config")({
		// commonsChunk: true,
		longTermCaching: true,
		// separateStylesheet: true,
		minimize: true,
    	buildPath: 'build/prod'
		// devtool: "source-map"
	}),
	//require("./make-webpack-config")({
	//	prerender: false,
	//	minimize: true
	//})
];
