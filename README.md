# Introduction

This [Sketch](http://bohemiancoding.com/sketch) plugin provides a preview
command (⌘P) that will export the currently selected Artboard at a configurable
preview size (⌘⌥P) and open the resulting image file in [Skala
Preview](http://bjango.com/mac/skalapreview).

# Installation

[Download](https://github.com/marcisme/sketch-preview/archive/master.zip) or
clone the latest version of this project, and open `SketchPreview.sketchplugin`.

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

As of `v0.6.0`, Artboards that are larger in one dimension should be scaled
correctly, allowing preview of mockups of scrollable content.

# Compatibility

This plugin has been used successfully with the following versions of software.
Not all combinations of each application have been tested, but this should give
you some idea of the latest versions that have worked for other people. Feel
free to submit a [pull request](https://github.com/marcisme/sketch-preview/compare/)
if you've used the plugin with a newer version of any of these applications.

* Sketch 3.4.4 (17249)
* Skala Preview 2.0 (207)
* Skala View for iOS 2.0
* Skala View for Android 2.0

# Troubleshooting

If you find any issues, you can try to reproduce them with the files in the test
directory of this repository. You can also check the `Enable debug logging`
option in the `Preview Setup` and look at the output in `Console.app` to get a
better idea of what is going on. Please open an
[issue](https://github.com/marcisme/sketch-preview/issues/new) if there is still
a problem.

# Author

[Marc Schwieterman](https://github.com/marcisme) ([@mschwieterman](https://twitter.com/mschwieterman))

# Contributors

Big thanks to these people for their contributions.

* [Jacob Elias](https://github.com/jelias) ([@\_jelias\_](https://twitter.com/_jelias_))
* [David Klawitter](https://github.com/davidklaw)
* [Tomas Linhart](https://github.com/TomasLinhart)

# License

MIT License
