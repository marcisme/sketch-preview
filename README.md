# Introduction

This [Sketch](http://bohemiancoding.com/sketch) plugin provides a preview
command (⌘P) that will export the currently selected Artboard at a configurable
preview size (⌘⌥P) and open the resulting image file in [Skala
Preview](http://bjango.com/mac/skalapreview).

If you prefer, you can name a slice `Preview`, and that slice will be used
instead.

# Installation

[Download](https://github.com/marcisme/sketch-preview/archive/master.zip) the
latest version of this project, and copy the `SketchPreview` directory into the
Sketch plugin directory. For Sketch 3, this should be:

```
~/Library/Containers/com.bohemiancoding.sketch3/Data/Library/Application\ Support/com.bohemiancoding.sketch3/Plugins
```

You can open this directory in the Finder with the `Plugins -> Reveal Plugins
Folder...` menu item.

# Usage

* Make sure you have an Artboard selected
* Select `Preview` from the Plugins menu or press ⌘P
* Select `Preview Setup...` from the plugins menu or Press ⌘⌥P to configure the
  plugin

## Scaling Modes

There are now several scaling modes intended for iOS design. These modes either
change the output size to *2x* or *3x* based on Artboard dimensions, or they
attempt to scale the preview up to simulate the Display Zoom or compatibility
modes available on the iPhones 6. The simulated modes are not currently
accurate, and the final image will be 1 to 2 pixels off in the smaller
dimension.

# Compatibility

This plugin has been used successfully with the following versions of software.
Not all combinations of each application have been tested, but this should give
you some idea of the latest versions that have worked for other people. Feel
free to submit a [pull request](https://github.com/marcisme/sketch-preview/compare/)
if you've used the plugin with a newer version of any of these applications.

* Sketch 3.1.1 (8761)
* Skala Preview 1.6.0
* Skala View for Android 1.2.2

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
