'use strict';

const get_licenses = (req, res) => {
  res.json(require('../mocks/licenses/get.json'));
}

module.exports = { get_licenses }
