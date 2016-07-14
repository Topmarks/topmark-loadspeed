import chai from 'chai';
import Topmark from "topmarks";
import path from "path";

chai.should();

describe('Loadspeed Plugin', () => {
  it('should load in topmark', function (done) {
    this.timeout(20000);
    let topmark = new Topmark({id: "topcoat"});
    let filePath = path.resolve(__dirname, '../src/loadspeed');
    topmark.register(filePath).then((results) => {
      results[0].report.should.be.above(0);
      done();
    }).catch((err) => {
      console.log(err);
    });
  });
});
