# Flatiron: Phase 1 Project

## Project Goals

The goal of completing this project is to display my learning throughout Phase 1 of my Flatiron School journey. The project is a single page application designed to use HTML/CSS/Javascript, and to communicate with a public API. The requirements include but are not limited to utilizing at least 3 distinct event listeners, iterating an array using one of the built in array methods, and returning a collection of a minimum of 5 objects with each object having a minimum of 3 attributes. 

## Description

For my project, I chose to create an application that displays characters from the television show, Rick and Morty. Upon initially visiting the application, all included characters are displayed on the page with their name, species, and origin location. The application includes two features allowing the user to filter which characters are displayed on the page. These include searching a character by name, and filtering the characters by episode.

## Features

### Search Character By Name

The search feature is designed so the user can search for a specific character name and display all characters by that given name. For example, searching "Rick" will initiate a GET request which will return and display all known Rick characters.

### Filter Characters By Episode

The filter feature is designed to allow the user to filter the displayed characters by episode. The filter feature contains a dropdown which includes all exisiting episodes. When an episode is selected by the user, a GET request is initiated and the corresponding "cast" of that episode is displayed on the page.

## License

The API is open source and uses a BSD license.