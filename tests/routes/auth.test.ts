// import express from 'express';
import request from 'supertest'
import {describe, test} from '@jest/globals'

const app = request("http://localhost:8080") //express()

describe('GET / default route responses', function() {
  test('responds with 404', function(done) {
    app
      .get('/')
      .expect(404, done);
  });
});

describe('POST api/v1/auth/register -> Attempt to register new user', function() {
  
  test('register with no data', function(done) {
    app
      .post('/api/v1/auth/register')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, done);
  });

  test('register with BAD data', function(done) {
    app
      .post('/api/v1/auth/register')
      .send({
        email:"NOThelloworldgmail.com",
        password: "1234"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, done);
  });

  test('register with GOOD data', function(done) {
    app
      .post('/api/v1/auth/register')
      .send({
        username:"hello",
        email:"helloworld@gmail.com",
        password: "helloworld"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        JSON.stringify(res.body) === JSON.stringify({error:'an account with that email already exists'})
      })
      .expect(400, done);
      
  });

});

describe('POST api/v1/auth/login -> Attempt to login', function() {
  
  test('login with no data', function(done) {
    app
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, done);
  });

  test('login with BAD data', function(done) {
    app
      .post('/api/v1/auth/login')
      .send({
        email:"NOThelloworld@gmail   m",
        password: "NOThelorld"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, done);
  });

  test('login with CORRECT data', function(done) {
    app
      .post('/api/v1/auth/login')
      .send({
        email:"helloworld@gmail.com",
        password: "helloworld"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

});
