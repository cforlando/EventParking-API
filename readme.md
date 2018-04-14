# Orlando Event API

Provides data via json endpoints about events in downtown Orlando.  Current endpoints:
* "/events/{YYYY}/{MM}" returns events in requested month
* "/events/{YYYY}/{MM}/{DD}" returns events in requested day

## Getting Started

This package is built on node.js, with numerous JavaScript libraries. It is designed to deploy to Heroku with environment
variables preset (see deployment), a postgresql database, and scheduler to keep that database up to date.

### Prerequisites

This package requires node and npm to be installed on the development machine.
Having git would also be a good idea.
If you want to deploy to Heroku, having the Heroku cli tools is a must.
All other prerequisites can be installed once the project is on a machine with these tools.


### Installing

For development, the best practice would be to fork the project into your personal repository and then git clone the project to your development machine.
Once those dependencies are met and the project has been cloned to your machine, running "npm install --dev" will install the remaining dependencies.
Running npm start will start a server on your localhost for testing.

## Running the tests

Tests can be run via "npm test" in the project root directory

## Deployment

In the application root on your development machine

* Start a Heroku dyno == heroku create
* Start a Heroku Postgresql instance == heroku addons:create heroku-postgresql:hobby-dev (hobby-dev == free)
* Set Heroku environmental variables
  * heroku config:set PGDATABASE=[Database Name]
  * heroku config:set PGHOST=[Database Host]
  * heroku config:set PGPORT=[Database Port]
  * heroku config:set PGUSER=[Database User Name]
  * heroku config:set PGPASSWORD=[Database Password]
* Commit changes if any == git commit -a
* Push changes to heroku == git push heroku master

## Built With

* [Git](https://git-scm.com/downloads)
* [heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)
* [npm](https://www.npmjs.com/get-npm)
* [express](https://expressjs.com/)
* [express-promise-router](https://www.npmjs.com/package/express-promise-router)
* [heroku-logger](https://www.npmjs.com/package/heroku-logger)
* [pg](https://node-postgres.com/)
* [mocha](https://mochajs.org/)
* [rewire](https://github.com/jhnns/rewire)

## Contributing

Please read [Contribuiting to Code for Orlando projects](http://www.codefororlando.com/) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Travis Konarik** - *Api/code clean up* - [travis-konarik](https://github.com/travis-konarik)

See also the list of [brigadeers](http://www.codefororlando.com/) who participate with Code for Orlando.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

