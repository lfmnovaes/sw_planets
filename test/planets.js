process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Planet = require('../api/models/planet');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Planets', () => {
    beforeEach((done) => { //Before each test we empty the database
        Planet.remove({}, (err) => { 
           done();           
        });        
    });
/*
  * Test the /GET route
  */
  describe('/GET planets', () => {
      it('it should GET all the planets', (done) => {
        chai.request(server)
            .get('/planets')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
  });

});