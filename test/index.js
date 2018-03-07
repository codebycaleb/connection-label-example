require('should');

const zapier = require('zapier-platform-core');

// Use this to make test calls into your app:
const App = require('../index');
const appTester = zapier.createAppTester(App);

describe('My App', () => {

  it('test response should contain username and connectionLabel should be updated', (done) => {
    const bundle = {
      authData: {
        user_name: 'secret'
      }
    };
    appTester(App.authentication.test, bundle)
      .then((response) => {
        response.username.should.eql('secret');
        done();
      })
      .catch((e) => console.log(e));
    appTester(App.authentication.connectionLabel, bundle)
      .then((label) => {
        label.should.eql('secret');
        done();
      })
      .catch((e) => console.log(e));
  });
});
