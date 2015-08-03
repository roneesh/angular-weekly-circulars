# eCircular App

## versions
Angular - 1.2.27, due to requiring IE8 compatibility
ui-router - 0.2.15, as of now, unless IE8 issues require a downgrade

## app
This is the main app folder, right now it just holds routing, as that is app wide. The routing in this app is simple, the store controller builds the first part of the url, then the weekly-ad builds the second part, and the circular is the last part...

http://www.sears.com/:store/weekly-ads/circular/:id?pgNo:int

## weekly-ads
This pulls down the list of weekly ads for a store from the api and allows the user to view one.

controller: weekly-ads.controller.js

factories for controller: weekly-ads.factory.js and circular.factory.js

## circular
This is the implementation of the main circular feature

## store
This is the functionality to set the store who's circular we see and to allow the user to switch to a different store

controller: inherits from weekly-ads
direcitves: create-circular-paging.js -> scrolls the circular the page number stored in the controller's view model

## other pages and folders

### first-page.html
This page is just a dummy page to mimic navigating in from a truly outside page

### server.js
This file allows the app to run from a server to avoid origin issues that happen when working locally from a file source

### styles.css
Holder page for general styles for the app that will eventually be refactored into actual production stylesheets

### dependencies
This folder holds html5 and maybe soon modernizr and the versionf of angular and ui-router required so we don't have to call the CDN.