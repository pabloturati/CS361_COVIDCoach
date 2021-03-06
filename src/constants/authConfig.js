const baseURL = `http://localhost:${process.env.PORT}`
module.exports = {
  // The secret for the encryption of the jsonwebtoken
  JWTsecret: process.env.JWT_SECRET,
  baseURL: baseURL,
  port: process.env.PORT,
  // The credentials and information for OAuth2
  oauth2Credentials: {
    client_id: process.env.GOOGLE_CLIENT_ID,
    project_id: 'covidcoach',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uris: [`${baseURL}/auth_callback`],
    scopes: ['profile', 'email'],
  },
}
