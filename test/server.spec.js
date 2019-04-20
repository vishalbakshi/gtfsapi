const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const Mocha = require("mocha");
const mocha = new Mocha({ ui: "tdd" });
chai.use(chaiHttp);

const port = process.env.PORT || 3306;

// TODO: Start/stop server automatically
// Currently I `npm start` and then run `npm test` from the terminal
suite('api tests', () => {
    /*
    test("GET get-gtfs-zip-file returns a success message", (done) => {
        chai.request("http://localhost:" + port)
            .get('/get-gtfs-zip-file')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, 'success')
                done();
            });
    }).timeout(0);
    */

    test("GET unzio-gtfs-file returns success message", (done) => {
        chai.request("http://localhost:" + port)
            .get('/unzip-gtfs-file')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, 'success');
                done();
            })
    }).timeout(0);
})


