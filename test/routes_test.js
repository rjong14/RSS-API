var request = require('supertest');
var expect = require('chai').expect;

var app = require('../server.js');
var api = request('http://localhost:8080');

describe('User', function() {
    
    it ('gets all users from /users', function (done) {
        var users = api.get('/users')
        .expect(200)
        .expect({message : "Ophalen succesvol"}, done);
    });
    
});