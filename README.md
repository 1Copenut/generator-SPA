# generator-SPA
This generator has been built for the designer looking to build interactive wireframes quickly. It includes a Node/Express server instance for working AJAX requests.


## Getting Started
This is a non-sanctioned generator for the moment. First, make sure you have [Yeoman](http://yeoman.io), [Bower](http:bower.io), and [Grunt](http:gruntjs.com) installed. Then clone the generator into a local repo:

```
$ git clone https://github.com/1Copenut/generator-SPA.git
```

## Make a new directory, and symlink the generator
The npm link will create a local link so you can run the yo SPA command anytime on your local machine. This command may require you to run as sudo.

```
$ mkdir newname && cd newname && npm link
```

## Enough already, how do I use the generator?
Initiate:

```
$ yo SPA
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

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
