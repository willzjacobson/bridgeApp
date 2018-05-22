'use strict';

const rp = require('request-promise');
const decode = require('jwt-decode');

const {
  auth0: { DOMAIN, CLIENT_ID, CLIENT_SECRET },
} = require('../config');

class Auth0API {
  constructor({ domain, client_id, client_secret }) {
    this.token = undefined;
    this.domain = domain;
    this.client_id = client_id;
    this.client_secret = client_secret;

    this.init();
  }

  async init() {
    const { access_token } = await this.getToken();
    this.access_token = access_token;
  }

  getToken() {
    this.access_token = undefined;

    return rp({
      method: 'POST',
      uri: `${this.domain}/oauth/token`,
      headers: { 'content-type': 'application/json' },
      body: {
        grant_type: 'client_credentials',
        client_id: this.client_id,
        client_secret: this.client_secret,
        audience: `${this.domain}/api/v2/`,
      },
      json: true,
    });
  }

  needNewToken() {
    const decoded = decode(this.access_token);
    if (!decoded.exp) {
      return true;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);

    return date < new Date();
  }

  async getUsers() {
    if (this.needNewToken()) {
      await this.getToken();
    }

    return rp({
      uri: `${this.domain}/api/v2/users`,
      headers: {
        authorization: `Bearer ${this.access_token}`,
        'content-type': 'application/json',
      },
      json: true,
    });
  }
}

module.exports = new Auth0API({
  domain: DOMAIN,
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
});
