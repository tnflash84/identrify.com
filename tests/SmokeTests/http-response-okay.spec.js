// ----------------
// - Dependencies -
// ----------------

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = require('chai').expect;

// --------------------
// - Global Constants -
// --------------------

const hostname = '127.0.0.1:3000';

// ---------
// - Tests -
// ---------

describe('Has a 200 response', function() {
	it('is /', function() {
		chai.request(hostname)
			.get('/')
			.end(function(err, res) {
				expect(res).to.have.status(200);
			}
		);
	});

	it('is /sitemap.xml', function() {
		chai.request(hostname)
			.get('/sitemap.xml')
			.end(function(err, res) {
				expect(res).to.have.status(200);
			}
		);
	});

	it('is /second-page', function() {
		chai.request(hostname)
			.get('/second-page')
			.end(function(err, res) {
				expect(res).to.have.status(200);
			}
		);
	});

	it('is /subdirectory-example/nested', function() {
		chai.request(hostname)
			.get('/subdirectory-example/nested')
			.end(function(err, res) {
				expect(res).to.have.status(200);
			}
		);
	});
});

describe('Has a 404 response', function() {
	it('is /i-wonder-if-url-exists', function() {
		chai.request(hostname)
			.get('/i-wonder-if-url-exists')
			.end(function(err, res) {
				expect(res).to.have.status(404);
			}
		);
	});
});
