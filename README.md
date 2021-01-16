# Webpack + ReactJS
Webpack for react projects

Just type `npm i` to install all the stuff you need.
Then you type: `npm start` once `npm i` part is done. This will start server and go into Developer mode 

Once you are done with the project, use `npm build` to get the "production/staging" page.

Once an error is resolved.. you need to manually reload the page.

What the webpack contains
***
* SCSS/Sass Support
* JSX support (now you dont need .jsx)
* JS support (Same as above)
* Image/Favicon and Font support


Minor warning:
***
If you get `'cross-env' is not recognized as an internal or external command,
operable program or batch file.` then use these commands to "fix" it.
`rm -rf node_modules && rm package-lock.json && npm cache clear --force`

then use `npm i && npm start`
