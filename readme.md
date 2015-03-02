# Coventry Telegraph Business Awards 2015
[http://ctbusinessawards.co.uk/2015/](http://www.ctbusinessawards.co.uk/2015/)

## Description
Website built upon Jekyll to support the 2015 Coventry Telegraph Business Awards

## Dependencies

- NodeJS
  - Grunt
  - LESS CSS
  - Bower
- Ruby
  - Jekyll

## Instructions

These instructions expect that you have Ruby and NodeJS already installed.

### Setup Development Area

```
bundle install
npm install
bower install
```

### Run Development Server

```
grunt
```

Visit the url [localhost:3000](http://localhost:3000/) to view the site.

### Deploy Build

#### Staging

For testing and proofing we deploy to a staging server before deploying to production.

```
grunt stage
```

This deploys to the staging server [http://www.ctbusinessawards.co.uk/beta/](http://www.ctbusinessawards.co.uk/beta/).

#### Production

All commits and merges to the master branch that pass our CI tests will be automatically deployed to our production server.

## Documentation

During the Alpha/Beta stages, due to constant changes, documentation will be mainly written in-line. With a dedicated section being created at the first major release.

### File Structure

```
|- _scripts              –  contains useful scripts to help with
|                           development of this project
|- _site                 –  compiled development files (not committed)
|- web
|  |- _awards            –  markdown content for each award
|  |- _data              –  content to be used across the site
|  |- _includes          –  partial snippets of code to be used
|  |                        in layouts
|  |- _layouts           –  page layouts
|  |- _partners          –  markdown content for each partner
|  |- _posts             -  markdown files of news posts
|  |- media              -
|  |- static             -
|  |- {**/*.txt,html,md} -  content for website pages
|- _config.yml           -  Jekyll config file
|- gruntfile.js
|- package.json
|- readme.md
```

## Report Issues

If you spot any issues please create a ticket via GitHub's Issue Tracker. If the issue is security related please use the contact information below.

## Contribute

In lieu of a formal style guide, take care to maintain the existing coding style.

## Contact

[tmcreative@trinitymirror.com](mailto:tmcreative@trinitymirror.com)

## License

The source is opened for educational purposes. No rights are assigned to any downloads or forks.

## Copyright

Unless otherwise stated all code and content remain copyright &copy; Trinity Mirror. All rights reserved.
