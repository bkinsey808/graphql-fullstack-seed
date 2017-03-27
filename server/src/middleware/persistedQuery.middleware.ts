declare var require: any;

import { invert } from 'lodash';


// What's the best way to import a json file without require?
// Can anybody enlighten me?
const queryMap = require('../../../extracted_queries.json');

export const persistedQueryMiddleware = (req, resp, next) => {
  const invertedMap = invert(queryMap);
  // todo remove && req.body.id on production for query whitelisting
  if (req.body && req.body.id) {
    req.body.query = invertedMap[req.body.id];
  }
  next();
}
