# Star_Wars_Planet_Directory
 creation of a web application that showcases planets from the Star Wars universe using the Star Wars API (SWAPI). This directory will not only feature information about each planet but also list its notable residents. 


## Technologies Used 
- HTML 5
- CSS 3
- JavaScript
- Bootstrap 5

## Functionalities
 ### Planets Directory:
- Fetching planets data from SWAPI and showing them in individual cards. 

### Residents Display:
- In each card there is a collapsable component which shows residents details.

- On click of `Residents Details` button it will show a list of residents.

- On click of each resident a modal will appear and it will fetch the resident data from SWAPI and the resident details will be shown on the modal.

- If some planet doesn't have resident then the `Residents Details` button will be disabled.

### Pagination Mechanism:

- Pagination is shown on the bottom part of the page, it has previous next and each page numbers.

 - On click of a page it will fetch the data from SWAPI and will populate on the page.