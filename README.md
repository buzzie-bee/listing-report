# listing-report

Listing report api and front end.

Parses csv data of car sale listings and compiles report data for display.

API was built using Express & Typescript using my homemade barebones express-ts-template repo.

Front end was built using React, Typescript, & Tailwind CSS

The csv data used to calculate the results are stored in the /api/data folder.

## Requirements to run

This project was built using Node v14.15.1 and NPM v.6.14.7

## How to run

Clone this repo using

`git clone https://github.com/buzzie-bee/listing-report.git {FOLDER_NAME}`

Change into the folder using

`cd {FOLDER_NAME}`

Install the packages (concurrently) required to run scripts from the root directory:

`npm install`

Install all packages for both the front and backend using

`npm run install-all`

Start the api and front end using

`npm run dev` from the root directory

## Running Tests

Both the api and front end use Jest for testing.

To run both test suites simultaneously run

`npm run test` from the root directory

## Other commands

If you are working in the api directory you have the following commands available:

`npm run test` - Runs the Jest Tests

`npm run test:watch` - Runs the tests in watch mode

`npm run build` - Compiles the typescript code into js and places the output in the dist folder

`npm run start` - runs build then launches the built index.js

`npm run dev:server` - Runs the dev server in transpile-only mode

If you are working in the front directory you have the following commands available:

`npm run start` - Compiles the typescript and tailwind css and starts the dev server

`npm run build` - Compiles the typescript and tailwind css and stores the output in the build folder

`npm run test` - Runs the Jest tests

`npm run eject` - Ejects the react application (Dangerous!)

## API Endpoints

Currently implemented are the following API endpoints:

### /api/reports/average

Calculates the average sale price of cars from the different categories of dealers.

Returns a json object with the following data:
{
dealer: number, // average price of cars sold by dealers
private number, // average price of cars sold by private sellers
other number // average price of cars sold by other sellers
}

### /api/reports/distribution

Calculates the percentual distribution of each car make.

Returns a json object with the following data:
{
total: number, // total number of listings
distributionData: [
{
make: string, // car manufacturer
distribution: number // percent makeup of listings
} ...
]
}

### /api/reports/averagePopularPrice

Calculates the average sale price of cars from the top 30% most viewed listings

Returns a json object with the following data:
{
averagePrice: number // average price of most popular listings
}

### /api/reports/mostContactedListings

Finds the top 5 most contacted listings by month

Returns a json object with the following data:
{
data: [
{
month: string // ISO Year-Month string (i.e. 2020-05)
listings: [
{
ranking: number, // Ranking of listing in the given month by contact count
id: string, // ID number of listing
make: string, // Manufacturer of car in listing
price: number, // Price of the listing
mileage: number, // Mileage of the listing
contacts: number, // Number of times the listing was contacted
}, ...
]
}, ...
]
}

## Troubleshooting

This code was developed on an Ubuntu 20.10 system so it's possible that some packages are not compatible with other operating systems.

If you encounter issues whilst running `npm run install-all` - try deleting the package-lock.json files from the front and api side then run `npm run install-all` again to install the packages and correct dependencies for your system.
