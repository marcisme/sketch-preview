# Overview

This is analysis of how different ways of generating PNGs affects their output
and ultimately display in Skala Preview.

## Versions

* Sketch 49.3 (51167)
* Acorn 6.1.2 (12955)
* macOS High Sierra 10.13.4
* Digital Color Meter 5.11
* ImageMagick 7.0.7-28

All PNGs were generated on and measurements taken on a MacBook Pro (13-inch,
2017, Two Thunderbolt 3 ports) using the built-in display with the `Color LCD`
profile and display scaling set to `More Space`.

## Files

The value for *sRGB Chunk* represents its `rendering_intent` value.
The value for *gAMA Chunk* represents its `gamma` and `exponent` value.

The source sRGB values are (255, 0, 0), (102, 0, 204), (123, 45, 67), (12, 34, 56).

PNG RGB values measured as the following. The `f` colors look faded.

* c<sub>1</sub> (255, 0, 0), (102, 1, 204), (123, 45, 67), (13, 34, 56)
* c<sub>2</sub> (255, 0, 0), (102, 1, 204), (123, 45, 67), (11, 34, 56)
* c<sub>3</sub> (253, 2, 0), (102, 0, 204), (123, 46, 67), (12, 34, 56)
* c<sub>4</sub> (253, 2, 0), (102, 1, 204), (123, 44, 67), (12, 34, 56)
* f<sub>1</sub> (255, 0, 0), (212, 0, 243), (220, 180, 194), (137, 170, 188)

File with a `with_profile` suffix were exported with "Save for web" unchecked in
Sketch and "Embed profile" unchecked in Acorn. Files with a `no_profile` suffix
were exported with "Save for web" checked in Sketch and "Embed profile"
unchecked and "Match to sRGB" either unchecked or disabled in Acorn.

The `Sketch_sRGB_no_profile_stripped.png` file had its color profile stripped
with Imagemagick, but the introduction of the `PLTE` chunk suggests it may have
been further modified.

File | Chunks | Profile in `Preview.app` | Metered as | RGB in `Preview.app` | RGB in `Skala Preview`
-|-|-|-|-|-
Acorn_sRGB_with_profile.png | sRGB(0) | sRGB | sRGB | c<sub>1</sub> | f<sub>1</sub>
Acorn_sRGB_no_profile.png | | - | sRGB | c<sub>1</sub> | c<sub>2</sub>
Acorn_DisplayP3_with_profile.png | iCCP | Display P3 | P3 | c<sub>3</sub> | c<sub>4</sub>
Acorn_DisplayP3_no_profile.png | | - | P3 | c<sub>1</sub> | c<sub>2</sub>
Sketch_sRGB_with_profile.png | sRGB(0) | sRGB | sRGB | c<sub>1</sub> | f<sub>1</sub>
Sketch_sRGB_no_profile.png | gAMA(45455 / 2.20) | sRGB | sRGB | c<sub>1</sub> | f<sub>1</sub>
Sketch_sRGB_no_profile_stripped.png | PLTE | sRGB | sRGB | c<sub>1</sub> | c<sub>2</sub>
Sketch_DisplayP3_with_profile.png | iCCP | Display P3 | P3 | c<sub>3</sub> | c<sub>4</sub>
Sketch_DisplayP3_no_profile.png | gAMA(45455 / 2.20) | sRGB | sRGB | c<sub>1</sub> | f<sub>1</sub>

## Questions

* What exactly causes `Preview.app` to show the profile as `-` vs `sRGB`? Do
  `PLTE` and `gAMA` chunks imply `sRGB` on macOS?

## Commands

Strip all color profiles

``` bash
convert Sketch_sRGB_no_profile.png -strip Sketch_sRGB_no_profile_stripped.png
```

Generate Imagemagick data for all PNGs

``` bash
for f in $(ls *.png); do echo "identify -verbose $f > $(echo $f | cut -d. -f1).txt" | bash; done
```
