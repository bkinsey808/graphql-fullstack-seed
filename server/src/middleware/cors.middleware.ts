import * as cors from 'cors';


// We currently have to whitelist because when in dev mode, 
// dev server and dev client run in different ports. 
// I do not know how to run them in the same port in dev mode. 
// Can anybody pls help me?
// TODO: either run dev client and server with same port or switch
// whitelist on only for dev mode.
const corsWhitelist = [
  'http://localhost:4200',
];
const corsOptions = {
  origin: (origin, callback) => {
    const originIsWhitelisted = corsWhitelist.includes(origin);
    callback(null, originIsWhitelisted);
  },
  credentials: true,
};

export const corsMiddleware = cors(corsOptions);
