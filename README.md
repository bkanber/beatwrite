# beatwrite

BEAT WRITE


website at: http://www.beatwrite.com


Beat Write is a website I built to make it easier to write song lyrics and listen to music instrumentals at the same time.
Embed a youtube or soundcloud URL or an uploaded audio file right above a textarea which as you type it will store it in a database.


THERE ARE TWO SEPARATE PACKAGE JSONS!!!

The client is a separate folder which has its own npm modules, scripts, and package.json.

.env layout:

DATABASE_HOST = localhost
DATABASE_USERNAME = root
DATABASE_PASSWORD = password
ENV = development
AWS_ACCESS_KEY = ''
AWS_SECRET_KEY = ''
AWS_S3_BUCKET = ''
SECRET_AUTH_KEY = secrey_key


To build the server from src -
cd into the app folder
npm install
npm run build

To build the client -
cd into app/client folder
npm install
npm run builddev

if you want to run the app from the client folder run the command
npm run bandev (this will build the client and then switch into the app/dist folder to run node server.js)

or you want to run the app from the main folder you need to go to the folder app/dist
then
node server.js

