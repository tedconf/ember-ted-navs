# Ember CLI TED Navs

> This addon is prepared for internal use by TED and is open-sourced for educational purposes but will not be supported for shared community use.

This addon adds several TED-themed navigation components to your app.

## Installation

This addon relies on TED Bootstrap, so first ensure that [Ember CLI TED Bootstrap](https://github.com/tedconf/ember-cli-ted-bootstrap) is installed.

Then, install using

```sh
ember install ember-ted-navs
```

## Components

### ted-navbar

Blockless form:

```hbs
{{ted-navbar name='My App'}}
```

`<ted-navbar>` accepts an optional block, so you can add additional Bootstrap elements to the navbar:

```hbs
{{#ted-navbar name='My App'}}
  
{{/ted-navbar}}
```

### ted-nav

### ted-subnav
