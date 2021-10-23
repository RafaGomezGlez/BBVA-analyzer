{"filter":false,"title":"app.js","tooltip":"/amplify-quicksight-dashboard-embedded/amplify/backend/function/getQuickSightDashboardEmbedURL/src/app.js","undoManager":{"mark":10,"position":10,"stack":[[{"start":{"row":0,"column":0},"end":{"row":92,"column":0},"action":"remove","lines":["/*","Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.","Licensed under the Apache License, Version 2.0 (the \"License\"). You may not use this file except in compliance with the License. A copy of the License is located at","    http://aws.amazon.com/apache2.0/","or in the \"license\" file accompanying this file. This file is distributed on an \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.","See the License for the specific language governing permissions and limitations under the License.","*/","","","","","var express = require('express')","var bodyParser = require('body-parser')","var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')","","// declare a new express app","var app = express()","app.use(bodyParser.json())","app.use(awsServerlessExpressMiddleware.eventContext())","","// Enable CORS for all methods","app.use(function(req, res, next) {","  res.header(\"Access-Control-Allow-Origin\", \"*\")","  res.header(\"Access-Control-Allow-Headers\", \"*\")","  next()","});","","","/**********************"," * Example get method *"," **********************/","","app.get('/item', function(req, res) {","  // Add your code here","  res.json({success: 'get call succeed!', url: req.url});","});","","app.get('/item/*', function(req, res) {","  // Add your code here","  res.json({success: 'get call succeed!', url: req.url});","});","","/****************************","* Example post method *","****************************/","","app.post('/item', function(req, res) {","  // Add your code here","  res.json({success: 'post call succeed!', url: req.url, body: req.body})","});","","app.post('/item/*', function(req, res) {","  // Add your code here","  res.json({success: 'post call succeed!', url: req.url, body: req.body})","});","","/****************************","* Example put method *","****************************/","","app.put('/item', function(req, res) {","  // Add your code here","  res.json({success: 'put call succeed!', url: req.url, body: req.body})","});","","app.put('/item/*', function(req, res) {","  // Add your code here","  res.json({success: 'put call succeed!', url: req.url, body: req.body})","});","","/****************************","* Example delete method *","****************************/","","app.delete('/item', function(req, res) {","  // Add your code here","  res.json({success: 'delete call succeed!', url: req.url});","});","","app.delete('/item/*', function(req, res) {","  // Add your code here","  res.json({success: 'delete call succeed!', url: req.url});","});","","app.listen(3000, function() {","    console.log(\"App started\")","});","","// Export the app object. When executing the application local this does nothing. However,","// to port it to AWS Lambda we will create a wrapper around that will load the app from","// this file","module.exports = app",""],"id":2},{"start":{"row":0,"column":0},"end":{"row":178,"column":0},"action":"insert","lines":["var express = require('express')","var bodyParser = require('body-parser')","var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')","","var AWS = require('aws-sdk');","var AmazonCognitoIdentity = require('amazon-cognito-identity-js');","const https = require('https');","","// declare a new express app","var app = express()","app.use(bodyParser.json())","app.use(awsServerlessExpressMiddleware.eventContext())","","// Enable CORS for all methods","app.use(function(req, res, next) {","  res.header(\"Access-Control-Allow-Origin\", \"*\")","  res.header(\"Access-Control-Allow-Headers\", \"Origin, X-Requested-With, Content-Type, Accept\")","  next()","});","","/**********************"," * getQuickSightDashboardEmbedURL get method *"," **********************/","","app.get('/getQuickSightDashboardEmbedURL', function(req, res) {","","    var roleArn = '<cognito-authenticated-role-arn>'; // your cognito authenticated role arn here","  ","    AWS.config.region = 'us-east-1';","  ","    var sessionName = req.query.payloadSub;","    var cognitoIdentity = new AWS.CognitoIdentity();","    var stsClient = new AWS.STS();","    var params = {","        IdentityPoolId: '<identity-pool-id>', // your identity pool id here","        Logins: {","            // your logins here","            'cognito-idp.us-east-1.amazonaws.com/<user-pool-id>': req.query.jwtToken","        }","    };","    ","    cognitoIdentity.getId(params, function(err, data) {","        if (err) console.log(err, err.stack);","        else {","            data.Logins = {","                // your logins here","                'cognito-idp.us-east-1.amazonaws.com/<user-pool-id>': req.query.jwtToken","            };","","            cognitoIdentity.getOpenIdToken(data, function(err, openIdToken) {","                if (err) {","                    console.log(err, err.stack);","                    //callback(err);","                    res.json({","                      err","                    })","                } else {","                    let stsParams = {","                        RoleSessionName: sessionName,","                        WebIdentityToken: openIdToken.Token,","                        RoleArn: roleArn","                    }","                    stsClient.assumeRoleWithWebIdentity(stsParams, function(err, data) {","                        if (err) {","                            console.log(err, err.stack);","                            //callback(err);","                            res.json({","                              err","                            })","                        } else {","                            AWS.config.update({","                                region: 'us-east-1',","                                credentials: {","                                    accessKeyId: data.Credentials.AccessKeyId,","                                    secretAccessKey: data.Credentials.SecretAccessKey,","                                    sessionToken: data.Credentials.SessionToken,","                                    expiration: data.Credentials.Expiration","                                }","                            });","                            var registerUserParams = {","                                // required","                                AwsAccountId: \"<account-id>\",","                                // can be passed in from api-gateway call","                                Email: req.query.email,","                                // can be passed in from api-gateway call","                                IdentityType: 'IAM',","                                // can be passed in from api-gateway call","                                Namespace: 'default',","                                // can be passed in from api-gateway call","                                UserRole: 'READER',","                                IamArn: roleArn,","                                SessionName: sessionName","                            };","                            var quicksight = new AWS.QuickSight();","                            quicksight.registerUser(registerUserParams, function(err, data) {","                                if (err) {","                                    console.log(\"3\");","                                    console.log(err, err.stack); // an error occurred","                                    if (err.code && err.code === 'ResourceExistsException') {","                                      var getDashboardParams = {","                                            // required","                                            AwsAccountId: \"<account-id>\",","                                            // required","                                            DashboardId: \"<dashboard-id>\",","                                            // required","                                            IdentityType: 'IAM',","                                            ResetDisabled: false, // can be passed in from api-gateway call","                                            SessionLifetimeInMinutes: 100, // can be passed in from api-gateway call","                                            UndoRedoDisabled: false // can be passed in from api-gateway call","                                        };","                                        var quicksightGetDashboard = new AWS.QuickSight();","                                        quicksightGetDashboard.getDashboardEmbedUrl(getDashboardParams, function(err, data) {","                                            if (err) {","                                                console.log(err, err.stack); // an error occurred","                                                  res.json({","                                                    err","                                                  })","                                            } else {","                                                console.log(data);","                                                res.json({","                                                  data","                                                })","                                            }","                                        });","                                    } else {","                                      res.json({","                                        err","                                      })","                                    }","                                } else {","                                    // successful response","                                    setTimeout(function() {","                                    var getDashboardParams = {","                                          // required","                                          AwsAccountId: \"<account-id>\",","                                          // required","                                          DashboardId: \"<dashboard-id>\",","                                          // required","                                          IdentityType: 'IAM',","                                          ResetDisabled: false, // can be passed in from api-gateway call","                                          SessionLifetimeInMinutes: 100, // can be passed in from api-gateway call","                                          UndoRedoDisabled: false // can be passed in from api-gateway call","                                      };","                                  ","                                      var quicksightGetDashboard = new AWS.QuickSight();","                                      quicksightGetDashboard.getDashboardEmbedUrl(getDashboardParams, function(err, data) {","                                          if (err) {","                                              console.log(err, err.stack); // an error occurred","                                                res.json({","                                                  err","                                                })","                                          } else {","                                              console.log(data);","                                              res.json({","                                                data","                                              })","                                          }","                                      });","                                        ","                                    }, 2000);","                                    ","                                }","                            });","                            ","                        }","                    });","                }","            });","        }","    });","","});","","app.listen(3000, function() {","    console.log(\"App started\")","});","","module.exports = app",""]}],[{"start":{"row":26,"column":19},"end":{"row":26,"column":51},"action":"remove","lines":["<cognito-authenticated-role-arn>"],"id":3},{"start":{"row":26,"column":19},"end":{"row":26,"column":98},"action":"insert","lines":["arn:aws:iam::578727406018:role/amplify-amplifyquicksightdas-dev-185647-authRole"]}],[{"start":{"row":34,"column":25},"end":{"row":34,"column":43},"action":"remove","lines":["<identity-pool-id>"],"id":4},{"start":{"row":34,"column":25},"end":{"row":34,"column":71},"action":"insert","lines":["us-east-1:fd4ead12-d68b-4c52-8c0e-6a12b7df1142"]}],[{"start":{"row":37,"column":49},"end":{"row":37,"column":63},"action":"remove","lines":["<user-pool-id>"],"id":5},{"start":{"row":37,"column":49},"end":{"row":37,"column":68},"action":"insert","lines":["us-east-1_XB5cFiDKj"]}],[{"start":{"row":81,"column":47},"end":{"row":81,"column":59},"action":"remove","lines":["<account-id>"],"id":6},{"start":{"row":81,"column":47},"end":{"row":81,"column":59},"action":"insert","lines":["578727406018"]}],[{"start":{"row":103,"column":58},"end":{"row":103,"column":72},"action":"remove","lines":["<dashboard-id>"],"id":7},{"start":{"row":103,"column":58},"end":{"row":103,"column":94},"action":"insert","lines":["a69101cf-58e4-4115-b17e-17432c1e7782"]}],[{"start":{"row":136,"column":56},"end":{"row":136,"column":70},"action":"remove","lines":["<dashboard-id>"],"id":8},{"start":{"row":136,"column":56},"end":{"row":136,"column":92},"action":"insert","lines":["a69101cf-58e4-4115-b17e-17432c1e7782"]}],[{"start":{"row":46,"column":53},"end":{"row":46,"column":67},"action":"remove","lines":["<user-pool-id>"],"id":9},{"start":{"row":46,"column":53},"end":{"row":46,"column":72},"action":"insert","lines":["us-east-1_XB5cFiDKj"]}],[{"start":{"row":134,"column":57},"end":{"row":134,"column":69},"action":"remove","lines":["<account-id>"],"id":10},{"start":{"row":134,"column":57},"end":{"row":134,"column":69},"action":"insert","lines":["578727406018"]}],[{"start":{"row":101,"column":59},"end":{"row":101,"column":71},"action":"remove","lines":["<account-id>"],"id":11},{"start":{"row":101,"column":59},"end":{"row":101,"column":71},"action":"insert","lines":["578727406018"]}],[{"start":{"row":7,"column":0},"end":{"row":8,"column":0},"action":"insert","lines":["",""],"id":12}],[{"start":{"row":8,"column":0},"end":{"row":9,"column":30},"action":"insert","lines":["import awsExports from './aws-exports';","Amplify.configure(awsExports);"],"id":13}]]},"ace":{"folds":[],"scrolltop":4,"scrollleft":0,"selection":{"start":{"row":8,"column":0},"end":{"row":8,"column":0},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1635023317413,"hash":"50103818ba3b5386b8a53b9c8cf27304835b2218"}