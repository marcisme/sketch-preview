# Introduction

This [Sketch](http://bohemiancoding.com/sketch) plugin provides a preview
command (⌘P) that will export the currently selected Artboard and open the
resulting image file in [Skala Preview](http://bjango.com/mac/skalapreview). If
you prefer, you can name a slice `Preview`, and that slice will be used instead.

# Installation

Copy `Preview.jstalk` to the Sketch plugin directory. For Sketch 3, this
should be:

`~/Library/Containers/com.bohemiancoding.sketch3/Data/Library/Application\ Support/com.bohemiancoding.sketch3/Plugins`

If you're feeling brave, you can do something like this:

```
curl https://raw.github.com/marcisme/sketch-preview/master/Preview.jstalk \
    -o ~/Library/Containers/com.bohemiancoding.sketch3/Data/Library/Application\ Support/com.bohemiancoding.sketch3/Plugins/Preview.jstalk
```

If you're still using Sketch 2, your plugin directory should be either of the
following for App Store or direct download versions respectively.

* `~/Library/Containers/com.bohemiancoding.sketch/Data/Library/Application\ Support/sketch/Plugins`
* `~/Library/Application\ Support/sketch/plugins`

# Usage

* Make sure you have an Artboard selected

    or

* Create a device screen-sized slice, and name it `Preview`

# Compatibility

This plugin has been used successfully with the following versions of software.
Not all combinations of each application have been tested, but this should give
you some idea of the latest versions that have worked for other people. Feel
free to submit a [pull request](https://github.com/marcisme/sketch-preview/compare/)
if you've used the plugin with a newer version of any of these applications.

* Sketch 2.4.4 (5370)
* Sketch 3.0.1 (7597)
* Skala Preview 1.6.0
* Skala View for Andriod 1.2.2

# Author

[Marc Schwieterman](https://github.com/marcisme) ([@mschwieterman](https://twitter.com/mschwieterman) / [@mbs](https://app.net/mbs))

# Contributors

Big thanks to these people for their contributions.

* [Jacob Elias](https://github.com/jelias) ([@\_jelias\_](https://twitter.com/_jelias_))
* [David Klawitter](https://github.com/davidklaw)
* [Tomas Linhart](https://github.com/TomasLinhart)

# License

MIT License
