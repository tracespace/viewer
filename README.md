# tracespace viewer (beta)

[![GitHub stars](https://img.shields.io/github/stars/tracespace/viewer.svg?style=flat-square&label=%E2%AD%90&maxAge=2592000)](https://github.com/tracespace/viewer)
[![GitHub issues](https://img.shields.io/github/issues/tracespace/viewer.svg?style=flat-square&maxAge=2592000)](https://github.com/tracespace/viewer/issues)
[![Travis](https://img.shields.io/travis/tracespace/viewer/master.svg?style=flat-square)](https://travis-ci.org/tracespace/viewer)
[![Coveralls](https://img.shields.io/coveralls/tracespace/viewer/master.svg?style=flat-square)](https://coveralls.io/github/tracespace/viewer)
[![David](https://img.shields.io/david/tracespace/viewer.svg?style=flat-square)](https://david-dm.org/tracespace/viewer)
[![David devDependences](https://img.shields.io/david/dev/tracespace/viewer.svg?style=flat-square)](https://david-dm.org/tracespace/viewer#info=devDependencies)

Probably the best printed circuit board viewer on the internet

<http://viewer.tracespace.io>

## about

This particular PCB viewer takes your Gerber and drill files and gives you individual layer renders as well as very fancy renders of what your completed boards are going to look like.

The tracespace viewer accomplishes all this locally (nothing gets sent to any server!) by converting your files to SVGs. Thanks to the "Scalable" and "Vector" in "SVG", the renders are easy to examine and quite accurate.

## motivation

Because you should always check your design files for problems! Existing Gerber viewers are good, but tend not to give you a full picture of what your board will look like, meaning you can miss important details (shout out to [OSH Park](https://oshpark.com) for super cool renders by default). Gerber files (i.e. your PCB manufacturing files) are vector image files, so it makes sense to convert them into a scalable, web-friendly vector format.

## issues

See something that doesn't look right? [Open an issue!](https://github.com/tracespace/viewer/issues) Screenshots and Gerber files help if you're able to. If you're not comfortable publicly posting your designs, you can also email <viewer@tracespace.io> with your issue.

If you're technically inclined, PR's are always welcome!

## contributing

This site is written in [ES2040](https://github.com/ahdinosaur/es2040) and uses [babel](https://babeljs.io/) and [webpack](http://webpack.github.io/) to build for the browser. The state layer is build using [redux](http://rackt.github.io/redux/) and the view layer is built with [deku](https://github.com/anthonyshort/deku). Rendering is accomplished with [web workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API), [gerber-to-svg](https://github.com/mcous/gerber-to-svg), and the [tracespace pcb stackup builder](https://github.com/tracespace/pcb-stackup-core).

Tests are run with [ava](https://github.com/avajs/ava) and code is linted with [eslint](http://eslint.org/). Please make sure any PRs are accompanied by unit tests. We use [travis](https://travis-ci.org/) as our CI server.

This app is hosted on [GitHub Pages](https://pages.github.com/).

### build scripts

Nothing fancy here, just npm scripts. See [package.json](https://github.com/tracespace/viewer/blob/master/package.json) for the full list. These are the important ones:

* `$ npm start` - starts an HMR dev server at [localhost:8080](http://localhost:8080)
* `$ npm test` - run tests
* `$ npm run test:watch` - run tests on code changes

### deploying

The site is deployed automatically by Travis if the commit is tagged (and tests pass). To deploy:

1. `$ npm version ...` - Use the npm version command to bump the version and tag the commit
2. `$ git push --tags` - Push the tag to trigger a build
