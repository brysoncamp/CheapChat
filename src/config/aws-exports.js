const awsconfig = {
  Auth: {
    Cognito: { 
      region: 'us-east-1',
      userPoolId: 'us-east-1_3PiwziyJv',
      userPoolClientId: '5rqa79e62rjnkbmko7791tusoi',
      mandatorySignIn: true,
      loginWith: {
        oauth: {
          domain: 'auth.cheap.chat', 
          scopes: ['email openid'],
          redirectSignIn: ['http://localhost:3000/', 'https://cheap.chat/'],
          redirectSignOut: ['http://localhost:3000/', 'https://cheap.chat/'],
          responseType: 'code',
        },
        email: true,
        phone_number: false,
        username: false
      }
    }
  }
};

export default awsconfig;