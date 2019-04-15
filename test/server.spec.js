const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const Mocha = require("mocha");
const mocha = new Mocha({ ui: "tdd" });
//const app = require('../server.js').app;
chai.use(chaiHttp);

const port = process.env.PORT || 3306;

// kill the process
// stop server after get request
suite('api tests', () => {

    test("GET get-gtfs-zip-file returns a success message", (done) => {

        chai.request("http://localhost:" + port)
            .get('/get-gtfs-zip-file')
            .end((err, res) => {
                assert.equal(res.status, 200);
                done();
            });
    }).timeout(0);

})


