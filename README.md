# Holiday Destination Search

This is a single page web application that allows users to search for their next holiday destination. The users can select destination city and country, find tourist attractions, find accommodation, find bars and restaurants.
User types in search box his/her destination and map will centre itself on selected destination, now the user has the option to select one of the points of interest types that will are available in selections menu.
The map and POI are handled by google map API Javascript code.
https://edgar183.github.io/interactive-frontend-project/

 
## UX
The user is greeted with a simple one-page application that loads full-screen google map. On the screen, there are some controls that give the user control over the application. 
This web app is for users that are looking for a simple map-based point of interest location search with simple controls. The user that will be visiting this page are looking for a location that they are in current or planning to visit, and point of interest in these locations: bars, restaurants, hotels. 
My website is allowing the user to search for a location and select on of poi on the map to be displayed. 
- As a user that wants to search next holiday destination, I can type it in the search bar on the map, so I can see it on the map. 
- As a user that is looking for a hotel in his/her location, can select it from the list and, so be presented with hotel markers on the map. 
- As a user that has questions about how to use the app can click on question mark button to be presented with instructions
- As a user that is looking to contact developer can click on the envelope button to be presented with contact form window.
1. [Page diagram for desktop with contact form](https://drive.google.com/file/d/1JXIxv_3XZnUhJalH98xmYdrWT7AXXtd7/view?usp=sharing)
1. [Page diagram for a mobile screen](https://drive.google.com/file/d/1s-sJAWFJ-aJIVUzhd_uWK8dNJ9txexeU/view?usp=sharing)
1. [Page diagram for a mobile screen with info window](https://drive.google.com/file/d/1FDAlIl7U5pFOgEJ8Ssd9Dm8q3iDfgjUx/view?usp=sharing)

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
- [HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5) 
- [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
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

- Browser
    - The page was tested using Chrome and Firefox browsers. The goal of this test was to make sure the same fonts are loaded on both of the browsers and the map is loaded and rendered as intended.
    - The version of the chrome is - 70.0.3538.77 official Build
    - The version of Firefox is - 65.0 Firefox Quantum
    - The HTML and CSS code was validated by [W3C]( http://validator.w3.org/)
    - The website was tested for responsive on different screen sizes. By resizing the browser window to a specific breakpoint. The expected result was tested, dialogue boxes width is changed at 425px width of the screen to 99%.
    - Javascript code was tested manually, by entering a value in the search box and selecting the radio button from the type list. The result was as expected. The other testing method of javascript was used to see if the correct information is passed where it's needed. The **console.log()** code with references to objects were printed out to console tab in the browser for this.  
- User Stories
1. Web applications infobox:
    1. From nav bar select "question mark" icon and click it.
    2. The dialogue box will open with description and instructions on how to use application.
    3. Try click any ware on the screen to close the dialogue box.

1. Use the search box:
    1. Try to type in any city name in the box and select the correct one from suggested.
    2. By selecting one from the list the map will change the current location of the map to the one that was selected and will drop location marker on the map.
1. Select poi type from the list:
    1. Try to click **show** button without selecting one of the poi, by default **Accommodation** is selected.
    2. Try to select a different type of poi and verify that previous markers were cleared from the map. 
1. Web applications contact form:
    1. Try to click **envelop icon** in the nav bar and verify that the contact from dialogue box opens.
    2. Try to enter all details and click **send** button and verify the email was received from website to js email server. 

### Bugs
- A contact form is not showing the required form field error if the field left empty and form is sent. 

## Deployment
Creating a repository on a local git in Cloud9 and one external in the GitHub. 
1. By using the terminal in cloud9 IDE and command 'git init' local repository was created.
2. A new repository was created on the GitHub website and local repository push to the GitHub with the command 'git push'.
3. In GitHub, I created a GitHub Pages to host my project page from a GitHub repository.

### Media
- ![alt text](assets/icons/camera.png "Camera Icon") made by [Freepik](https://www.flaticon.com/authors/freepik) from www.flaticon.com 
- ![alt text](assets/icons/hotel.png "Hotel Icon") made by [Freepik](https://www.flaticon.com/authors/freepik) from www.flaticon.com 
- ![alt text](assets/icons/bar.png "Bar Icon") made by [Freepik](https://www.flaticon.com/authors/freepik) from www.flaticon.com 
- ![alt text](assets/icons/restaurant.png "Restaurant Icon") made by [Freepik](https://www.flaticon.com/authors/freepik) from www.flaticon.com 
- ![alt text](assets/icons/location.png "Place location Icon") made by [Freepik](https://www.flaticon.com/authors/freepik) from www.flaticon.com 
- [Page loading animation](https://gifer.com/en/WHda) 
