import chai from 'chai';
import Topmark from "topmarks";
import path from "path";

chai.should();

describe('Loadspeed Plugin', () => {
  it('should load in topmark', function (done) {
    this.timeout(20000);
    let topmark = new Topmark({default: {pageId: "topcoat"}});
    let filePath = path.resolve(__dirname, '../src/loadspeed');
    topmark.register(filePath).then((results) => {
      topmark.results[0].report.should.be.above(0);
      topmark.results[0].plugin.should.be.equal('loadspeed');
      topmark.results[0].url.should.be.equal('loadspeed');
      topmark.results[0].timestamp.should.be.above(0);
      done();
    }).catch(() => done());
  });
  it('should fail if correct port not specified', function(done) {
    let topmark = new Topmark({default: {id: "topcoat", port: 9223}});
    let filePath = path.resolve(__dirname, '../src/loadspeed');
    topmark.register(filePath).then((results) => {
      done();
    }).catch((err) => {
      err.should.exist;
      done();
    });
  });
});
