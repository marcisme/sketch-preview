# Introduction

This [Sketch](http://bohemiancoding.com/sketch) plugin provides a preview
command (⌘P) that will export the currently selected Artboard at a configurable
preview size (⌘⌥P) and open the resulting image file in [Skala
Preview](http://bjango.com/mac/skalapreview).

If you prefer, you can name a slice `Preview`, and that slice will be used
instead.

# Installation

The easiest way to install the plugin is to
[download](https://github.com/marcisme/sketch-preview/archive/master.zip) the
latest version of this project and double-click the `Preview.sketchplugin` and
`Set Preview Size.sketchplugin` files.

Installation of the `Set Preview Size` plugin is optional.

## Manual Installation

You can also copy the plugin files to the Sketch plugin directory yourself. For
Sketch 3, this should be:

```
~/Library/Containers/com.bohemiancoding.sketch3/Data/Library/Application\ Support/com.bohemiancoding.sketch3/Plugins
```

You can open this directory in the Finder with the `Plugins -> Reveal Plugins
Folder...` menu item.

# Usage

* Make sure you have an Artboard selected or a device screen-sized slice named
  `Preview`
* Select `Preview` from the Plugins menu or press ⌘P
* Select `Set Preview Size` from the plugins menu or Press ⌘⌥P

# Compatibility

This plugin has been used successfully with the following versions of software.
Not all combinations of each application have been tested, but this should give
you some idea of the latest versions that have worked for other people. Feel
free to submit a [pull request](https://github.com/marcisme/sketch-preview/compare/)
if you've used the plugin with a newer version of any of these applications.

* Sketch 3.0.4 (8053)
* Skala Preview 1.6.0
* Skala View for Andriod 1.2.2

# Troubleshooting

*Sketch 2 is no longer supported*

If you find any other issues, you can try to reproduce them with
`PreviewTest.sketch`, found in the test directory of this repository. You can
also edit the plugin file to set `DEBUG` to `true` and look at the output in
`Console.app` to get a better idea of what is going on. Please open an
[issue](https://github.com/marcisme/sketch-preview/issues/new) if there is still
a problem.

# Author

[Marc Schwieterman](https://github.com/marcisme) ([@mschwieterman](https://twitter.com/mschwieterman) / [@mbs](https://app.net/mbs))

# Contributors

Big thanks to these people for their contributions.

* [Jacob Elias](https://github.com/jelias) ([@\_jelias\_](https://twitter.com/_jelias_))
* [David Klawitter](https://github.com/davidklaw)
* [Tomas Linhart](https://github.com/TomasLinhart)

# License

MIT License
