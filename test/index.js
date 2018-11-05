require('should');

const zapier = require('zapier-platform-core');

// Use this to make test calls into your app:
const App = require('../index');
const appTester = zapier.createAppTester(App);

describe('My App', () => {

  it('should have env variables', () => {
    zapier.tools.env.inject();
    console.log(process.env.BATMAN);
  });

  it('should contain username and connectionLabel should be updated', async () => {
    const bundle = {
      authData: {
        user_name: 'secret'
      }
    };
    await appTester(App.authentication.test, bundle)
      .then((response) => {
        response.username.should.eql('secret');
        Object.assign(bundle.inputData, response);
      })
      .catch((e) => console.log(e));
    await appTester(App.authentication.connectionLabel, bundle)
      .then((label) => {
        console.log(label)
        label.should.eql('secret');
      })
      .catch((e) => console.log(e));
  });
});
