// This file compiles the njk files into HTML

console.log('js file build');

// ----------------
// - Dependencies -
// ----------------

var metalsmith    	= require('metalsmith');
var sitemap  		= require('metalsmith-sitemap');
const babel       	= require('metalsmith-babel');
const in_place 		= require('metalsmith-in-place');
const sass     		= require('metalsmith-sass');

// ------------------------
// - Function Definitions -
// ------------------------

function getCurrentDate() {
	var today = new Date();	

	return today.toDateString()
}

function getCurrentYear() {
	var year = new Date();	

	return year.getFullYear()
}

// --------------------
// - Global variables -
// --------------------

// Using the convention of 'g_' to indicate a global variable

var g_current_year = getCurrentYear();
var g_last_modified = getCurrentDate();

const siteurl = 'http://example.com';

const babel_options = {
  presets: ['@babel/preset-env']
};

// --------------
// - Build Step -
// --------------

metalsmith(__dirname)         // __dirname defined by node.js:
                              // name of current working directory
	.metadata({               // add any variable you want
                              // use them in layout-files
    	sitename: "boilerplate site",
    	siteurl: siteurl,
    	description: "",
    	generatorname: "Metalsmith",
    	generatorurl: "http://metalsmith.io/",
       	g_current_year: g_current_year,
    	g_last_modified: g_last_modified,
  	})
	.source('./src')            // source directory
	.destination('./build')     // destination directory
	.clean(true)                // clean destination before
	.use(babel(babel_options))   // js compilation
	.use(in_place())             // wrap layouts around html
	.use(sass())                // scss compilation
	.use(sitemap(siteurl))  	// Sitemap generation
	.build(function(err) {      // build process
		if (err) throw err;     // error handling is required
	}
);
