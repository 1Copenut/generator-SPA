# generator-SPA
This generator has been built for the designer looking to build interactive wireframes quickly. It includes a Node/Express server instance for working AJAX requests.


## Getting Started
This is a non-sanctioned generator for the moment. First, make sure you have [Yeoman](http://yeoman.io), [Bower](http:bower.io), and [Grunt](http:gruntjs.com) installed. Create or cd into your local dev directory, ~/dev for instance, then clone the repo:

```
$ git clone https://github.com/1Copenut/generator-SPA.git
```

cd into the generator-SPA directory and create the symbolic link. This command may require you to run as sudo.

```
$ cd generator-SPA && npm link
```

## Make a new directory and run the generator
The previously created symbolic link means you can create a new directory anytime and run the generator. This command may require you to run as sudo.

```
$ mkdir newname && yo SPA
```

## Don't forget Twig
I use Twig for my templating needs. It's not available as a Grunt plugin yet, so you'll need to add it manually. This command may require you to run as sudo.

```
$ npm install twig
```

## Fire up Express, and you&rsquo;re off
After the generator is done creating files, typing the line below will start an Express server instance and open a new browser window in Chrome automatically.

```
$ grunt server
```

## Big Thank You
[Rebecca Murphey](https://twitter.com/rmurphey) was gracious enough to post her [entire repo](https://github.com/rmurphey/testable-javascript) for the [Writing Testable Javascript](http://alistapart.com/article/writing-testable-javascript) article, which I used to structure my test directory and all of the Require.js plumbing. I encourage everyone to read and study both the article and code--they will change the way you think about Javascript and testing.

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
