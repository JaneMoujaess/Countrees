# Countrees Project
-Fully responsive design.__
-User experience is taken into consideration when it comes to interactions such as hover-effects (pointer cursor, change in colors to let users know something is clickable).__
-Loading incorporated to make pages feel more dynamic.__
-Relevant messages displayed on login and signup in case of invalid fields (wrong username or pass, password doesn't abide by certain constraints, etc.).__
-Authentication handled with access and refresh tokens. If access token expires, refresh token fetches new access and refresh tokens and stores them in localhost. However, if refresh token is expired, then user is redirected to login page. Note: this is triggered either upon trying to navigate to a different page (handled by guard) or when executing an http request, such as filtering the countries for example (handled by interceptor).__
-If logged in, the guard forbids users to access login page until they logout.__
-404 page is displayed in case users try to access an invalid route.__
-All main functionalities implemented: search, filter, admin permission to edit details page and add photos to gallery.
