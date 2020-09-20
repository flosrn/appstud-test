This repo composed of two app, the spotify-api who serve the json data, and the react-native application rn-appstud-test.

Please read SUBJECT.md for test instructions.

## How works

1. Go to spotify-api, install dependencies and run `npm run start`
2. Go to rn-appstud-test, install dependencies and run `expo start`

Because the custom spotify api on heroku don't allow CORS, I made a little node.js and express server who serve static json file to the react-native application.

Consequently, for test my react-native app, you must launch first the server api and after in rn-appstud-test run `expo start` and click on "run in web browser".


