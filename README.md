# Introduction

This [Sketch](http://bohemiancoding.com/sketch) plugin provides a preview
command (⌘P) that will open a specially named slice in
[Skala Preview](http://bjango.com/mac/skalapreview).
The plugin works by exporting the first slice named `Preview` to Sketch's cache
directory and opening that file in Skala Preview.

If you prefer a clipboard-based approach, you may want to check out
[crop_Artboard](https://github.com/FredericJacobs/crop_Artboard).

# Installation

1. Copy the plugin file to either
`~/Library/Containers/com.bohemiancoding.sketch/Data/Library/Application\ Support/sketch/Plugins`
or `~/Library/Application\ Support/sketch/plugins` as described in the Sketch
[scripting guide](http://bohemiancoding.com/sketch/scripting).

    If you're feeling brave, you can do something like this: `curl https://raw.github.com/marcisme/sketch-preview/master/Preview.jstalk -o ~/Library/Containers/com.bohemiancoding.sketch/Data/Library/Application\ Support/sketch/Plugins/Preview.jstalk`

2. Enable scripting in Sketch if needed
`Preferences -> General -> Enable Scripting`

3. Create a device screen-sized slice, and name it `Preview`

# Compatibility

This plugin was developed with the App Store version of Sketch 2.2.4 and Skala Preview 1.5.2.

# Author

[Marc Schwieterman](https://github.com/marcisme) ([@mschwieterman](https://twitter.com/mschwieterman) / [@mbs](https://app.net/mbs))

# License

MIT License
