const env = process.env;

const config = {
    listPerPage: env.LIST_PER_PAGE || 10,
    consumer_key: "c6187ce7aa889e039abea5ef117eef14",
    consumer_secret: "9ec33ef872a00413354e0dfbeaee4c967dba3a11"
  }

module.exports = config;
