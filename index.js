// We can roll up all our behaviors in an App.
const App = {
  // This is just shorthand to reference the installed dependencies you have. Zapier will
  // need to know these before we can upload
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication: {
    type: 'custom',
//    An alternative way:
//    connectionLabel: (z, bundle) => {
//      return bundle.inputData.username;
//    },
    connectionLabel: '{{username}}',
    test: (z, bundle) => {
      return z.request({
        url: 'http://httpbin.org/get?username={{bundle.authData.user_name}}'
      }).then((response) => {return response.json.args});
    },
    fields: [
      {
        key: 'user_name',
        label: 'User name',
        required: true,
        type: 'string'
      }
    ]
  },

  // beforeRequest & afterResponse are optional hooks into the provided HTTP client
  beforeRequest: [
  ],

  afterResponse: [
  ],

  // If you want to define optional resources to simplify creation of triggers, searches, creates - do that here!
  resources: {
  },

  // If you want your trigger to show up, you better include it here!
  triggers: {
  },

  // If you want your searches to show up, you better include it here!
  searches: {
  },

  // If you want your creates to show up, you better include it here!
  creates: {
  }
};

// Finally, export the app.
module.exports = App;
