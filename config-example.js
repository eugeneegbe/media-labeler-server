const env = process.env;

const config = {
    listPerPage: env.LIST_PER_PAGE || 10,
    consumer_key: "",
    consumer_secret: ""
  }

module.exports = config;
