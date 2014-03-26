# Introduction

This [Sketch](http://bohemiancoding.com/sketch) plugin provides a preview
command (⌘P) that will open an Artboard or a specially named slice in
[Skala Preview](http://bjango.com/mac/skalapreview). The plugin works by
exporting the current Artboard or the first slice named `Preview` to Sketch's
cache directory and opening that file in Skala Preview.

If you prefer a clipboard-based approach, you may want to check out
[crop_Artboard](https://github.com/FredericJacobs/crop_Artboard).

# Installation

1. Copy the plugin file to either
`~/Library/Containers/com.bohemiancoding.sketch/Data/Library/Application\ Support/sketch/Plugins`
or `~/Library/Application\ Support/sketch/plugins` as described in the Sketch
[scripting guide](http://bohemiancoding.com/sketch/scripting).

    If you're feeling brave, you can do something like this:
    ```
    curl https://raw.github.com/marcisme/sketch-preview/master/Preview.jstalk \
        -o ~/Library/Containers/com.bohemiancoding.sketch/Data/Library/Application\ Support/sketch/Plugins/Preview.jstalk
    ```

2. Enable scripting if using an older version of Sketch that has the option.
`Preferences -> General -> Enable Scripting`

# Usage

* Make sure you have an Artboard selected

    or

* Create a device screen-sized slice, and name it `Preview`

# Compatibility

This plugin was most recently tested with the Sketch Version 2.4.3 (5347), Skala Preview 1.6.0 (and Skala View for Andriod 1.2.2)

# Author

[Marc Schwieterman](https://github.com/marcisme) ([@mschwieterman](https://twitter.com/mschwieterman) / [@mbs](https://app.net/mbs))

# Contributors

Big thanks to these people for their contributions.

* [Jacob Elias](https://github.com/jelias) ([@\_jelias\_](https://twitter.com/_jelias_))
* [David Klawitter](https://github.com/davidklaw)

# License

MIT License
