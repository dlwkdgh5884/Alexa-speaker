var http = require('http');
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);
        
        if (event.session.application.applicationId !== "amzn1.ask.skill.42098a7c-5545-472d-92da-2033495ff91d") {
             context.fail("Invalid Application ID");
        }
        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }
        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};
function api(city, state, cb) {
    return http.get({
        host: 'api.airvisual.com',
        path: '/v2/city?city=' + city + '&state=' + state + '&country=South%20Korea&key=4H9r9tDCdJDAZv726'
    }, function(res) {
        res.setEncoding('utf8');
        var body = '';
        res.on('data', function(d) {
            body += d;
        });
        res.on('end', function() {
            try {
                console.log(body);
                var parsed = JSON.parse(body);
                cb(parsed.data);
            } catch (err) {
                console.error('Unable to parse response as JSON', err);
                throw(err);
            }
        });
    }).on('error', function(err) {
        console.error('Error with the request:', err.message);
        throw(err);
    });
}function onSessionStarted(sessionStartedRequest, session) {
    console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId +
        ", sessionId=" + session.sessionId);
}function onLaunch(launchRequest, session, callback) {
    console.log("onLaunch requestId=" + launchRequest.requestId +
        ", sessionId=" + session.sessionId);
    getWelcomeResponse(callback);
}function onIntent(intentRequest, session, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId +
        ", sessionId=" + session.sessionId);
    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name;
    
    this.cb = callback;
    switch(intentName) {
        case "Seoul":
            api('Seoul', 'Seoul', function(wt) {
                
                var cardTitle = 'Weather Condition';
                var shouldEndSession = true;
                
                var status;
                if (wt.current.pollution.aqius < 50)
                    status = "Good";
                else if(wt.current.pollution.aqius < 100)
                    status = "bo-tong"
                else    
                    status = "bad"
                
                var speechOutput = "Seoul---on-doh--" + wt.current.weather.tp + "---gu-rigo---mise-meon-ji--" + wt.current.pollution.aqius + "-- " + status;
                this.cb({}, buildSpeechletResponse(cardTitle, speechOutput, speechOutput, shouldEndSession));
            }.bind(this));
            break;
            
        case "Jejudo":
            var jjcity = intentRequest.intent.slots.jjcities.value;
            api(jjcity, 'Jeju-do', function(wt) {
                
                var cardTitle = 'Weather Condition';
                var shouldEndSession = true;
                
                var status;
                if (wt.current.pollution.aqius < 50)
                    status = "Good";
                else if(wt.current.pollution.aqius < 100)
                    status = "bo-tong"
                else    
                    status = "bad"
                
               var speechOutput = jjcity + "---on-doh--" + wt.current.weather.tp + "---gu-rigo---mise-meon-ji--" + wt.current.pollution.aqius + "-- " + status;
            
                this.cb({}, buildSpeechletResponse(cardTitle, speechOutput, speechOutput, shouldEndSession));
            }.bind(this));
            break;
            
        case "Chungcheongbukdo":
            var cbcity = intentRequest.intent.slots.cbcities.value;
            api(cbcity, 'Chungcheongbuk-do', function(wt) {
                
                var cardTitle = 'Weather Condition';
                var shouldEndSession = true;
                
                var status;
                if (wt.current.pollution.aqius < 50)
                    status = "Good";
                else if(wt.current.pollution.aqius < 100)
                    status = "bo-tong"
                else    
                    status = "bad"
                
               var speechOutput = cbcity + "---on-doh--" + wt.current.weather.tp + "---gu-rigo---mise-meon-ji--" + wt.current.pollution.aqius + "-- " + status;
            
                this.cb({}, buildSpeechletResponse(cardTitle, speechOutput, speechOutput, shouldEndSession));
            }.bind(this));
            break;
            
        case "Chungcheongnamdo":
            var cncity = intentRequest.intent.slots.cncities.value;
            api(cncity, 'Chungcheongnam-do', function(wt) {
                
                var cardTitle = 'Weather Condition';
                var shouldEndSession = true;
                
                var status;
                if (wt.current.pollution.aqius < 50)
                    status = "Good";
                else if(wt.current.pollution.aqius < 100)
                    status = "bo-tong"
                else    
                    status = "bad"
                
               var speechOutput = cncity + "---on-doh--" + wt.current.weather.tp + "---gu-rigo---mise-meon-ji--" + wt.current.pollution.aqius + "-- " + status;
            
                this.cb({}, buildSpeechletResponse(cardTitle, speechOutput, speechOutput, shouldEndSession));
            }.bind(this));
            break;
        
        case "Gangwondo":
            var gwcity = intentRequest.intent.slots.gwcities.value;
            api(gwcity, 'Gangwon-do', function(wt) {
                
                var cardTitle = 'Weather Condition';
                var shouldEndSession = true;
                
                var status;
                if (wt.current.pollution.aqius < 50)
                    status = "Good";
                else if(wt.current.pollution.aqius < 100)
                    status = "bo-tong"
                else    
                    status = "bad"
                
               var speechOutput = gwcity + "---on-doh--" + wt.current.weather.tp + "---gu-rigo---mise-meon-ji--" + wt.current.pollution.aqius + "-- " + status;
            
                this.cb({}, buildSpeechletResponse(cardTitle, speechOutput, speechOutput, shouldEndSession));
            }.bind(this));
            break;
            
        case "Gyeonggido":
            var ggcity = intentRequest.intent.slots.ggcities.value;
            api(ggcity, 'Gyeonggi-do', function(wt) {
                
                var cardTitle = 'Weather Condition';
                var shouldEndSession = true;
                
                var status;
                if (wt.current.pollution.aqius < 50)
                    status = "Good";
                else if(wt.current.pollution.aqius < 100)
                    status = "bo-tong"
                else    
                    status = "bad"
                
               var speechOutput = ggcity + "---on-doh--" + wt.current.weather.tp + "---gu-rigo---mise-meon-ji--" + wt.current.pollution.aqius + "-- " + status;
            
            
                this.cb({}, buildSpeechletResponse(cardTitle, speechOutput, speechOutput, shouldEndSession));
            }.bind(this));
            break;
        
        case "Gyeongsangbukdo":
            var gbcity = intentRequest.intent.slots.gbcities.value;
            api(gbcity, 'Gyeongsangbuk-do', function(wt) {
                
                var cardTitle = 'Weather Condition';
                var shouldEndSession = true;
                var status;
                if (wt.current.pollution.aqius < 50)
                    status = "Good";
                else if(wt.current.pollution.aqius < 100)
                    status = "bo-tong"
                else    
                    status = "bad"
                
               var speechOutput = gbcity + "---on-doh--" + wt.current.weather.tp + "---gu-rigo---mise-meon-ji--" + wt.current.pollution.aqius + "-- " + status;
            
                this.cb({}, buildSpeechletResponse(cardTitle, speechOutput, speechOutput, shouldEndSession));
            }.bind(this));
            break;
            
        case "Gyeongsangnamdo":
            var gncity = intentRequest.intent.slots.gncities.value;
            api(gncity, 'Gyeongsangnam-do', function(wt) {
                
                var cardTitle = 'Weather Condition';
                var shouldEndSession = true;
                
                 var status;
                if (wt.current.pollution.aqius < 50)
                    status = "Good";
                else if(wt.current.pollution.aqius < 100)
                    status = "bo-tong"
                else    
                    status = "bad"
                
               var speechOutput = gncity + "---on-doh--" + wt.current.weather.tp + "---gu-rigo---mise-meon-ji--" + wt.current.pollution.aqius + "-- " + status;
            
                this.cb({}, buildSpeechletResponse(cardTitle, speechOutput, speechOutput, shouldEndSession));
            }.bind(this));
            break;
            
        case "Jeollabukdo":
            var jbcity = intentRequest.intent.slots.jbcities.value;
            api(jbcity, 'Jeollabuk-do', function(wt) {
                
                var cardTitle = 'Weather Condition';
                var shouldEndSession = true;
                
                 var status;
                if (wt.current.pollution.aqius < 50)
                    status = "Good";
                else if(wt.current.pollution.aqius < 100)
                    status = "bo-tong"
                else    
                    status = "bad"
                
               var speechOutput = jbcity + "---on-doh--" + wt.current.weather.tp + "---gu-rigo---mise-meon-ji--" + wt.current.pollution.aqius + "-- " + status;
            
                this.cb({}, buildSpeechletResponse(cardTitle, speechOutput, speechOutput, shouldEndSession));
            }.bind(this));
            break;
            
        case "Jeollanamdo":
            var jncity = intentRequest.intent.slots.jncities.value;
            api(jncity, 'Jeollanam-do', function(wt) {
                
                var cardTitle = 'Weather Condition';
                var shouldEndSession = true;
                
                var status;
                if (wt.current.pollution.aqius < 50)
                    status = "Good";
                else if(wt.current.pollution.aqius < 100)
                    status = "bo-tong"
                else    
                    status = "bad"
                
               var speechOutput = jncity + "---on-doh--" + wt.current.weather.tp + "---gu-rigo---mise-meon-ji--" + wt.current.pollution.aqius + "-- " + status;
            
                this.cb({}, buildSpeechletResponse(cardTitle, speechOutput, speechOutput, shouldEndSession));
            }.bind(this));
            break;
            
        case "Sejong":
            var sjcity = intentRequest.intent.slots.sjcities.value;
            api(sjcity, 'Sejong', function(wt) {
                
                var cardTitle = 'Weather Condition';
                var shouldEndSession = true;
                 var status;
                if (wt.current.pollution.aqius < 50)
                    status = "Good";
                else if(wt.current.pollution.aqius < 100)
                    status = "bo-tong"
                else    
                    status = "bad"
                
               var speechOutput = sjcity + "---on-doh--" + wt.current.weather.tp + "---gu-rigo---mise-meon-ji--" + wt.current.pollution.aqius + "-- " + status;
            
                this.cb({}, buildSpeechletResponse(cardTitle, speechOutput, speechOutput, shouldEndSession));
            }.bind(this));
            break;
            
        case "AMAZON.HelpIntent":
            getWelcomeResponse(callback);
            break;
        case "AMAZON.StopIntent":
        case "AMAZON.CancelIntent":
        default:
            handleSessionEndRequest(callback);
            break;
    }
}function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId + ", sessionId=" + session.sessionId);
}function getWelcomeResponse(callback) {
    var sessionAttributes = {};
    var cardTitle = "Welcome";
    var speechOutput = "won-ha-neun---do-si---e-luem--mal-hae-ju-se-yo.";
    var repromptText = "Here are some things you can say: " +
        "Seoul or" +
        "Jeju ";
    var shouldEndSession = false;
    callback(sessionAttributes, buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}function handleSessionEndRequest(callback) {
    var cardTitle = "";
    var speechOutput = "";
    var shouldEndSession = true;
    callback({}, buildSpeechletResponse(cardTitle, speechOutput, null, shouldEndSession));
}function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: title,
            content: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}
