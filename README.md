# Holiday Destination Search

This is a single page web application that allows users to search for their next holiday destination. The users can select destination city and country, find tourist attractions, find accommodation, find bars and restaurants.
User types in search box his/her destination and map will centre itself on selected destination, now the user has the option to select one of the points of interest types that will are available in selections menu.
The map and POI are handled by google map API Javascript code.

 
## UX
The user is greeted with a simple one-page application that loads full-screen google map. On the screen, there are some controls that give the user control over the application. 
This web app is for users that are looking for a simple map-based point of interest location search with simple controls. The user that will be visiting this page are looking for a location that they are in current or planning to visit, and point of interest in these locations: bars, restaurants, hotels. 
My website is allowing the user to search for a location and select on of poi on the map to be displayed. 
- As a user that wants to search next holiday destination, I can type it in the search bar on the map, so I can see it on the map. 
- As a user that is looking for a hotel in his/her location, can select it from the list and, so be presented with hotel markers on the map. 
- As a user that has questions about how to use the app can click on question mark button to be presented with instructions
- As a user that is looking to contact developer can click on the envelope button to be presented with contact form window.
1.[Page diagram for desktop with contact form](https://drive.google.com/file/d/1JXIxv_3XZnUhJalH98xmYdrWT7AXXtd7/view?usp=sharing)
1.[Page diagram for a mobile screen](https://drive.google.com/file/d/1s-sJAWFJ-aJIVUzhd_uWK8dNJ9txexeU/view?usp=sharing)
1.[Page diagram for a mobile screen with info window](https://drive.google.com/file/d/1FDAlIl7U5pFOgEJ8Ssd9Dm8q3iDfgjUx/view?usp=sharing)

## Features
- The navigation bar has 3 buttons, 2 of them open alert windows with additional information.
- The user can search for a destination using Google map API code.
- The map can display different marker icons that are relevant to the selected type of interest from the menu.  

### Existing Features
- Question mark button in navigation bar allows a user to read more about the application and how to use it.
- The envelop button in navigation bar allows a user to contact the developer, by filling in form and clicking send button which is connected to an email server via javascript code. The code can be viewed in /assets/js/sendEmail.js
- The user can type in only the first 3 letters of the location and predictive text will show matching location names.
- The poi selection menu - allows a user to select poi, by clicking one of the radio button and button 'show' to see all close by places. 

### Features Left to Implement
- Get directions from the current position to selected poi location. The user can add the current location manually or allow a browser to pinpoint his current location and by selecting 'direction to' option on the marker the map will show a walking direction to the poi.  

## Technologies Used

In this section, you should mention all of the languages, frameworks, libraries, and any other tools that you have used to construct this project. For each, provide its name, a link to its official site and a short sentence of why it was used.
- HTML, 
- CSS,
- [Javascript](https://www.javascript.com/)
    - The project uses **Javascript** to execute different parts of Google map API code.
- [Google map API](https://cloud.google.com/maps-platform/)
    - The project uses Google map API to display a map on screen and manipulate the locations, markers on the map.
- [Bootstrap](http://getbootstrap.com/docs/3.3/)
    - The bootstrap was used to display the navigation bar and elements in it.
- [Cloud9 IDE](https://aws.amazon.com/cloud9/)
    - Was used to develop the project.
- [EmailJS.com](https://www.emailjs.com/)
    - The project uses **EmailJS** service to send emails from javascript to server. 
- [GitHub](https://github.com)
    - The project uses a GitHub to host website and for version control. 
    
## Testing