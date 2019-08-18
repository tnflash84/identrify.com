// This file compiles the njk files into HTML

console.log('js file build');

var Metalsmith  = require('metalsmith');
var in_place    = require('metalsmith-in-place');

Metalsmith(__dirname)         // __dirname defined by node.js:
                              // name of current working directory
	.metadata({               // add any variable you want
                              // use them in layout-files
    	sitename: "boilerplate site",
    	siteurl: "http://example.com",
    	description: "",
    	generatorname: "Metalsmith",
    	generatorurl: "http://metalsmith.io/"
  	})
	.source('./src')            // source directory
	.destination('./build')     // destination directory
	.clean(true)                // clean destination before
	.use(in_place())             // wrap layouts around html
	.build(function(err) {      // build process
		if (err) throw err;     // error handling is required
	}
);
