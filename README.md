# bdgt

## Description

- BDGT is a simple budgeting/financing app that allows you to easily budget your money and view it in a graph format.

- This application uses:
- Handlebars.js as a template engine
- Node.js, Express.js to create a RESTful API
- MySQL and Sequelize ORM for the database
- Full CRUD routes for handling data
- ChartJS to display information
- Materialize for the UI Framework
- Session management via server side cookies
- editorconfig for consistency in code
- bcrypt for encrypting data to store in the database

![Homepage View](/readme/HomePageView.png)

## Deployed Website
- [Link to Deployed Website](https://peaceful-hamlet-98419.herokuapp.com/)

## Installation

- `npm install`
- `npm run init:database`
- `npm run seed` (developers can use `npm run seed:develop` for creating fake data for testing)
- Create `.env` file using the `example.env` file for reference.

## Usage

### Developers

- Start a live reload server with `npm run watch`
- Run unit test with `npm run test`

### Production

- Start production server with `npm run start`

## Credits

[Amanda Pietsch's and Cream](https://github.com/apietsch4117)

[Bryan Smith](https://github.com/smitbry17)

[Justin Bong](https://github.com/justinhwbhang)

[Genesis (Oliver) Gregorio](https://github.com/theurbanspectacle)

## Tests

- Unit tests should be placed in the `__tests__` folder you can run them via `npm run test`
