# project-init-php - *In Progress*
This is a personal repository used to seed new apps written in PHP.

## Build Tasks
After downloading, rename the project. Do a global search for
```
project-init-php
```
and replace it your project's name.

Next, run a few tasks to initialize the project.
```
npm install
bower update
grunt reallyfull
```
All of your files should be set up and ready to go!

## Components
This project uses bower to pull down other repos and put the files in their new home.

### Grunt Tasks
- Autoprefixer
- Contrib-Clean
- Contrib-Concat
- Contrib-Copy
- Contrib-CSSmin
- Contrib-LESS
- Contrib-Uglify
- Contrib-Watch
- SFTP-Deploy
- Text-Replace

### HTML
- Bootstrap

### CSS
- Bootstrap
- Animate.css

### JS
- Bootstrap
- Select2
- HolderJS
- FixieJS
- UIFunk (*soon*)

## Le Build
On the initial run, Grunt pulls things out of <code>/bower_components/<code> and fills the CSS and JS folders with plugins, etc.