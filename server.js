/* eslint-disable no-console */
import "@babel/polyfill"
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from './webpack.config'
import express from 'express'
import cors from 'cors';
import path from 'path'
import favicon from 'serve-favicon'
import routes from './routes'
import * as React from 'react'
import Root from './containers/Root'
import { renderToString } from 'react-dom/server'
import { match, createMemoryHistory } from 'react-router'
import configureStore from './store/configureStore'
const parseString = require("xml2js").parseString;

import rootSaga from './sagas'


const app = express()
app.use(cors());
const port = 3000


const env = process.argv[4].toLowerCase();

const credentials = {};

app.use(favicon(path.join(__dirname, 'favicon.ico')))
var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

const layout = (body, initialState) => (`
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8"/>
    <title>Portfolio Planning Platform</title>
  </head>
  <body>
    <div id="root"><div>${body}</div></div>
    <script type="text/javascript" charset="utf-8">
      window.__INITIAL_STATE__ = ${initialState};
    </script>
    <script src="/static/bundle.js"></script>
  </body>
  </html>
`)

app.use(function(req, res) {
  if( env !== 'local'){
    SSORedirect(res,env);
  }
  const store = configureStore()

  match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps && renderProps.components) {
      const rootComp = <Root store={store} routes={routes} history={createMemoryHistory()} renderProps={renderProps} type="server"/>
      store.runSaga(rootSaga).toPromise().then(() => {
        res.status(200).send(
          layout(
            renderToString(rootComp),
            JSON.stringify(store.getState())
          )
        )
      }).catch((e) => {
        console.log(e.message)
        res.status(500).send(e.message)
      })

      renderToString(rootComp)
      store.close()
    } else {
      //todo: Add custom page for 404
      res.status(404).send('Not found')
    }
  })
})

 function SSORedirect (res, env) {
   if(env === 'dev'){
    let redirect_link = 'https://pfeddev.wal-mart.com/idp/startSSO.ping?PartnerSpId=GTP3&ACSIdx=1';
    res.redirect(redirect_link)
   }else if(env === 'stg'){
    let redirect_link = 'https://pfedcert.wal-mart.com/idp/startSSO.ping?PartnerSpId=GTP3&ACSIdx=0';
    res.redirect(redirect_link)
   }else if(env === 'prod'){
    let redirect_link = 'https://pfedprod.wal-mart.com/idp/startSSO.ping?PartnerSpId=GTP3&ACSIdx=0';
    res.redirect(redirect_link)
   }

}
app.post('/api/samlCallback', (req, res) => {
  const SAMLResponse = new Buffer(req.payload.SAMLResponse, "base64");
  const options = {request_body: SAMLResponse};
  let values;
  parseString(options.request_body, function (err, result) {
    if (err !== null) {
      return response().code(500);
    }
    values = result["samlp:Response"]["saml:Assertion"][0]["saml:AttributeStatement"][0]["saml:Attribute"];
    // const validADGroup = "CN=intl-pricex,OU=Global,OU=Security,OU=Groups,DC=homeoffice,DC=Wal-Mart,DC=com";
    // const getValidADGroup = word => word.match(validADGroup);
    for (let i = 0; i < values.length; i++) {
      const attribute = values[i];
      let listOfADGroups;
      switch (attribute.$.Name) {
        case "last name":
          credentials.lastName = attribute["saml:AttributeValue"][0]["_"];
          break;
        case "first name":
          credentials.firstName = attribute["saml:AttributeValue"][0]["_"];
          break;
        case "userid":
          credentials.userid = attribute["saml:AttributeValue"][0]["_"];
          break;
        case "emailAddress":
          credentials.email = attribute["saml:AttributeValue"][0]["_"];
          break;
        case "memberOf":
          try {
            listOfADGroups = JSON.parse(attribute["saml:AttributeValue"][0]["_"]);
            credentials.adGroups = listOfADGroups.filter(getValidADGroup);
          } catch (error) {
            credentials.adGroups = validADGroup;
          }
          break;
      }
    }
  });
});
app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
