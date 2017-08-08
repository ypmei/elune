var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function() {

  describe('get_licenses', function() {

    describe('GET /ai/v5/licenses', function() {

      it('should return a default object', function(done) {

        request(server)
          .get('/ai/v5/licenses')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            done();
          });
      });

    });

  });

});
