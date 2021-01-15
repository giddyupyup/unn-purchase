const axios = require('axios');

exports.synapsApi = axios.default.create( {
  baseURL: 'https://workflow-api.synaps.io/v2'
} );