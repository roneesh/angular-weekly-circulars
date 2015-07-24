# eCircular App

## versions
Angular - 1.2.27, due to requiring IE8 compatibility
ui-router - 0.2.15, as of now, unless IE8 issues require a downgrade

## app
This is the main app folder, right now it just holds routing, as that is app wide.

## weekly-ads
This pulls down the list of weekly ads for a store from the api and allows the user to view one.
controller: weekly-ads.controller.js

## circular
This is the implementation of the main circular feature
controller: inherits from weekly-ads

### first-page.html
This page is just a dummy page to mimic navigating in from a truly outside page

### server.js
This file allows the app to run from a server to avoid origin issues that happen when working locally from a file source

### styles.css
Holder page for general styles for the app that will eventually be refactored into actual production stylesheets