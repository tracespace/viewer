# tracespace pcb viewer

[![Travis](https://img.shields.io/travis/tracespace/viewer.svg?style=flat-square)](https://travis-ci.org/tracespace/viewer)
[![Coveralls](https://img.shields.io/coveralls/tracespace/viewer.svg?style=flat-square)](https://coveralls.io/github/tracespace/viewer)
[![David](https://img.shields.io/david/tracespace/viewer.svg?style=flat-square)](https://david-dm.org/tracespace/viewer)
[![David](https://img.shields.io/david/dev/tracespace/viewer.svg?style=flat-square)](https://david-dm.org/tracespace/viewer#info=devDependencies)

[http://viewer.tracespace.io](viewer.tracespace.io)

Probably the best printed circuit board viewer on the internet.

## what?

This particular PCB viewer takes your gerber and drill files and gives you individual layer renders as well as very fancy renders of what your completed boards are going to look like. It does this all locally using the [gerber-to-svg](https://github.com/mcous/gerber-to-svg) module, so nothing gets sent to any server. Also, because the renders are SVGs, they're super easy to save and show off.

Using awesome new web technologies, the tracespace viewer also works offline and saves your renders locally. Pretty cool.

## why?

Because you should always check your design files for problems! Existing Gerber viewers are good, but tend not to give you a full picture of what your board will look like, meaning you can miss important details (shout out to [OSH Park](https://oshpark.com) for super cool renders by default). Gerber files (i.e. your PCB manufacturing files) are vector image files, so it makes sense to convert them into a web-friendly vector format. And an offline-enabled web-app means you don't have to worry about downloading or updating any software, and you'll still always have your the viewer available.

## problems?

See something that doesn't look right? Open an issue! Screenshots and Gerber files help if you're able to. If you're not comfortable publicly posting your designs, you can also email viewer@tracespace.io with your issue.

If you're technically inclined, PR's are always welcome!

## wanna contribute?

This site is written in ES2015 and uses [babel](https://babeljs.io/) and [webpack](http://webpack.github.io/) to run in your browser. The state layer is build using [redux](http://rackt.github.io/redux/) and the view layer is built with [react](https://facebook.github.io/react/). Rendering is accomplished with [web workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API), [gerber-to-svg](https://github.com/mcous/gerber-to-svg), and the [tracespace pcb stackup builder](https://github.com/tracespace/pcb-stackup). Local data is stored in [indexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).

Tests are run with [mocha](#), code is covered with [istanbul](#), and code is linted with [eslint](#). Linting happens post-test and pre-commit. Please make sure any PRs are accompanied by unit tests. We use [travis](#) as our CI server, use [coveralls](#) as our coverage tracker, and run browser tests with [sauce labs](#) and [zuul](#).

### build scripts

Nothing fancy here, just npm scripts. See [package.json](package.json) for the full list. These are the important ones:

* `$ npm start` - starts a fancy auto-watching dev server at [localhost:8080](http://localhost:8080)
* `$ npm test` - run tests
* `$ npm run test:watch` - run tests on code changes
* `$ npm run test:browser` - run tests locally in a browser of your choosing
* `$ npm run test:sauce` - run the tests on sauce (sauce credentials in [.zuulrc](#) required)
* `$ npm run deploy` - builds and deploys the site (credentials required)
