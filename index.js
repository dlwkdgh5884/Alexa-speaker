var http = require('http');
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);
        
        if (event.session.application.applicationId !== "amzn1.ask.skill.d8ad69ed-f363-4b8f-9de2-529d93ddcfab") {
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
                var speechOutput = "The Seoul is the " + wt.current.pollution.aqius;
            
                this.cb({}, buildSpeechletResponse(cardTitle, speechOutput, speechOutput, shouldEndSession));
            }.bind(this));
            break;
            
        case "Jejudo":
            var jjcity = intentRequest.intent.slots.jj.value;
            api(jjcity, 'Jeju-do', function(wt) {
                
                var cardTitle = 'Weather Condition';
                var shouldEndSession = true;
                var speechOutput = "The " + jjcity + "is " + wt.current.pollution.aqius;
            
                this.cb({}, buildSpeechletResponse(cardTitle, speechOutput, speechOutput, shouldEndSession));
            }.bind(this));
            break;
            
        case "Chungcheongbukdo":
            var cbcity = intentRequest.intent.slots.cb.value;
            api(cbcity, 'Chungcheongbuk-do', function(wt) {
                
                var cardTitle = 'Weather Condition';
                var shouldEndSession = true;
                var speechOutput = "The " + cbcity  + " is " + wt.current.pollution.aqius;
            
                this.cb({}, buildSpeechletResponse(cardTitle, speechOutput, speechOutput, shouldEndSession));
            }.bind(this));
            break;
            
        case "Chungcheongnamdo":
            var cncity = intentRequest.intent.slots.cn.value;
            api(cncity, 'Chungcheongnam-do', function(wt) {
                
                var cardTitle = 'Weather Condition';
                var shouldEndSession = true;
                var speechOutput = "The " + cncity  + " is " + wt.current.pollution.aqius;
            
                this.cb({}, buildSpeechletResponse(cardTitle, speechOutput, speechOutput, shouldEndSession));
            }.bind(this));
            break;
        
        case "Gangwondo":
            var gwcity = intentRequest.intent.slots.gw.value;
            api(gwcity, 'Gangwon-do', function(wt) {
                
                var cardTitle = 'Weather Condition';
                var shouldEndSession = true;
                var speechOutput = "The " + gwcity  + " is " + wt.current.pollution.aqius;
            
                this.cb({}, buildSpeechletResponse(cardTitle, speechOutput, speechOutput, shouldEndSession));
            }.bind(this));
            break;
            
        case "Gyeonggido":
            var ggcity = intentRequest.intent.slots.gg.value;
            api(ggcity, 'Gyeonggi-do', function(wt) {
                
                var cardTitle = 'Weather Condition';
                var shouldEndSession = true;
                var speechOutput = "The " + ggcity  + " is " + wt.current.pollution.aqius;
            
                this.cb({}, buildSpeechletResponse(cardTitle, speechOutput, speechOutput, shouldEndSession));
            }.bind(this));
            break;
        
        case "Gyeongsangbukdo":
            var gbcity = intentRequest.intent.slots.gb.value;
            api(gbcity, 'Gyeongsangbuk-do', function(wt) {
                
                var cardTitle = 'Weather Condition';
                var shouldEndSession = true;
                var speechOutput = "The " + gbcity  + " is " + wt.current.pollution.aqius;
            
                this.cb({}, buildSpeechletResponse(cardTitle, speechOutput, speechOutput, shouldEndSession));
            }.bind(this));
            break;
            
        case "Gyeongsangnamdo":
            var gncity = intentRequest.intent.slots.gn.value;
            api(gncity, 'Gyeongsangnam-do', function(wt) {
                
                var cardTitle = 'Weather Condition';
                var shouldEndSession = true;
                var speechOutput = "The " + gncity  + " is " + wt.current.pollution.aqius;
            
                this.cb({}, buildSpeechletResponse(cardTitle, speechOutput, speechOutput, shouldEndSession));
            }.bind(this));
            break;
            
        case "Jeollabukdo":
            var jbcity = intentRequest.intent.slots.jb.value;
            api(jbcity, 'Jeollabuk-do', function(wt) {
                
                var cardTitle = 'Weather Condition';
                var shouldEndSession = true;
                var speechOutput = "The " + jbcity  + " is " + wt.current.pollution.aqius;
            
                this.cb({}, buildSpeechletResponse(cardTitle, speechOutput, speechOutput, shouldEndSession));
            }.bind(this));
            break;
            
        case "Jeollanamdo":
            var jncity = intentRequest.intent.slots.jn.value;
            api(jncity, 'Jeollanam-do', function(wt) {
                
                var cardTitle = 'Weather Condition';
                var shouldEndSession = true;
                var speechOutput = "The " + jncity  + " is " + wt.current.pollution.aqius;
            
                this.cb({}, buildSpeechletResponse(cardTitle, speechOutput, speechOutput, shouldEndSession));
            }.bind(this));
            break;
            
        case "Sejong":
            var sjcity = intentRequest.intent.slots.sj.value;
            api(sjcity, 'Sejong', function(wt) {
                
                var cardTitle = 'Weather Condition';
                var shouldEndSession = true;
                var speechOutput = "The " + sjcity  + " is " + wt.current.pollution.aqius;
            
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
    var speechOutput = "won-ha-neun--do-si--iireum-eul-mal-hae-ju-se-yo.";
    var repromptText = "Here are some things you can say: " +
        "Seoul " +
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
