// We can roll up all our behaviors in an App.
const App = {
  // This is just shorthand to reference the installed dependencies you have. Zapier will
  // need to know these before we can upload
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication: {
    type: 'custom',
    fields: [
      {
        key: 'user_name',
        label: 'User name',
        helpText: '{{process.env.HELP_TEXT}}',
        required: true,
        type: 'string'
      },
      { key: 'password', label: 'Password', required: true, type: 'string' }
    ],
    
    // Version A: test method returns response.content
    test: (z, bundle) => {
      return z.request({
        url: 'http://httpbin.org/get?username={{bundle.authData.user_name}}'
      }).then((response) => response.json.args);
    },
    connectionLabel: '{{username}}',
    // alternatively: connectionLabel: '{{bundle.inputData.username}}'
    
    // Version B: test method returns response
    test: (z, bundle) => {
      return z.request({
        url: 'http://httpbin.org/get?username={{bundle.authData.user_name}}'
      }).then((response) => response);
    },
    connectionLabel: '{{bundle.inputData.json.args.username}}',
    
    // Version C: test method returns custom response
    test: (z, bundle) => {
      return z.request({
        url: 'http://httpbin.org/get?username={{bundle.authData.user_name}}'
      }).then((response) => ({username: response.json.args.username}));
    },
    connectionLabel: '{{username}}',
    connectionLabel: (z, bundle) => bundle.inputData.username,
    // yet another alternative applicable to the above options:
    /* 
     * connectionLabel: (z, bundle) => {
     *   return bundle.inputData.username;
     * }, 
     */
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
