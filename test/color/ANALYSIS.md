# Overview

This is analysis of how different ways of generating PNGs affects their output
and ultimately display in Skala Preview.

## Versions

* Sketch 49.3 (51167)
* Acorn 6.1.2 (12955)
* macOS High Sierra 10.13.4
* Digital Color Meter 5.11
* ImageMagick 7.0.7-28
* Pngcrush 1.8.13

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

The `Sketch_sRGB_no_profile_degamma.png` file had its `gAMA` chunk removed with
Pngcrush.

File | Chunks | Profile in `Preview.app` | Metered as | RGB in `Preview.app` | RGB in `Skala Preview`
-|-|-|-|-|-
Acorn_sRGB_with_profile.png | sRGB(0) | sRGB | sRGB | c<sub>1</sub> | f<sub>1</sub>
Acorn_sRGB_no_profile.png | | - | sRGB | c<sub>1</sub> | c<sub>2</sub>
Sketch_sRGB_with_profile.png | sRGB(0) | sRGB | sRGB | c<sub>1</sub> | f<sub>1</sub>
Sketch_sRGB_no_profile.png | gAMA(45455 / 2.20) | sRGB | sRGB | c<sub>1</sub> | f<sub>1</sub>
Sketch_sRGB_no_profile_stripped.png | PLTE | sRGB | sRGB | c<sub>1</sub> | c<sub>2</sub>
Sketch_sRGB_no_profile_degamma.png | | - | sRGB | c<sub>1</sub> | c<sub>2</sub>
Acorn_DisplayP3_with_profile.png | iCCP | Display P3 | P3 | c<sub>3</sub> | c<sub>4</sub>
Acorn_DisplayP3_no_profile.png | | - | P3 | c<sub>1</sub> | c<sub>2</sub>
Sketch_DisplayP3_with_profile.png | iCCP | Display P3 | P3 | c<sub>3</sub> | c<sub>4</sub>
Sketch_DisplayP3_no_profile.png | gAMA(45455 / 2.20) | sRGB | sRGB | c<sub>1</sub> | f<sub>1</sub>

## Thoughts

`Acorn_sRGB_no_profile.png`is very close to the source image, while
`Sketch_sRGB_no_profile.png` looks faded *when opened*. Drag and dropping from
the source document or copying the image to the clipboard results in the desired
colors.

* What exactly causes `Preview.app` to show the profile as `-` vs `sRGB`?
* Do `PLTE` and `gAMA` chunks imply `sRGB` on macOS?

From section [11.3.3.2](https://www.w3.org/TR/PNG/#11gAMA) of the PNG spec:

> In fact specifying the desired display output intensity is insufficient. It is
> also necessary to specify the viewing conditions under which the output is
> desired. **For gAMA these are the reference viewing conditions of the sRGB
> specification** [IEC 61966-2-1], which are based on ISO 3664 [ISO-3664].
> Adjustment for different viewing conditions is normally handled by a Colour
> Management System. If the adjustment is not performed, the error is usually
> small. Applications desiring high colour fidelity may wish to use an sRGB chunk
> or iCCP chunk.

So maybe a `gAMA` chunk does imply sRGB?

* Why is the behavior between opening and reading from the pasteboard different?
* Does the pasteboard only contain raw image data, which does not include any
  ancillary chunks?

* Removing the `gAMA` chunk results in desired colors, so it seems that the
  working combinations are:
  * neither an `sRGB` no `gAMA` chunk
  * an `iCCP` chunk with a `P3` profile

### Differences

* `Acorn_sRGB_no_profile.png`
  * no alpha
  * color type 2 (Truecolor)
* `Sketch_sRGB_no_profile.png`
  * alpha
  * explicit `gAMA` chunk
  * color type 6 (RGBA)

``` diff
> diff Acorn_sRGB_no_profile.txt Sketch_sRGB_no_profile.txt
1c1
< Image: Acorn_sRGB_no_profile.png
---
> Image: Sketch_sRGB_no_profile.png
8c8
<   Type: Palette
---
>   Type: PaletteAlpha
15a16
>     Alpha: 1-bit
41a43,50
>     Alpha:
>       min: 255  (1)
>       max: 255 (1)
>       mean: 255 (1)
>       standard deviation: 0 (0)
>       kurtosis: 8.192e+63
>       skewness: 1e+45
>       entropy: 0
46,50c55,59
<       mean: 74.8333 (0.293464)
<       standard deviation: 60.6722 (0.23793)
<       kurtosis: 0.0211965
<       skewness: 1.08093
<       entropy: 0.982132
---
>       mean: 119.875 (0.470098)
>       standard deviation: 45.5042 (0.178448)
>       kurtosis: -1.62436
>       skewness: 0.279492
>       entropy: 0.736599
53,56c62,65
<      10000: ( 12, 34, 56) #0C2238 srgb(12,34,56)
<      10000: (102,  0,204) #6600CC srgb(102,0,204)
<      10000: (123, 45, 67) #7B2D43 srgb(123,45,67)
<      10000: (255,  0,  0) #FF0000 red
---
>      10000: ( 12, 34, 56,255) #0C2238FF srgba(12,34,56,1)
>      10000: (102,  0,204,255) #6600CCFF srgba(102,0,204,1)
>      10000: (123, 45, 67,255) #7B2D43FF srgba(123,45,67,1)
>      10000: (255,  0,  0,255) #FF0000FF red
58c67
<   Gamma: 0.454545
---
>   Gamma: 0.45455
78c87,88
<     date:modify: 2018-04-13T12:37:17-07:00
---
>     date:modify: 2018-04-13T12:45:30-07:00
>     png:gAMA: gamma=0.45454544 (See Gamma, above)
81,82c91,92
<     png:IHDR.color-type-orig: 2
<     png:IHDR.color_type: 2 (Truecolor)
---
>     png:IHDR.color-type-orig: 6
>     png:IHDR.color_type: 6 (RGBA)
86c96
<     signature: 62fcd571657034ec5b879a6f90fca6cd08191cd3b7cd3a828c6c66917f04d9a3
---
>     signature: dc2d1b50f4bface86767a023dafe1d7d99d70e2d11190fdf82dfce0378bd100d
90c100
<   Filesize: 347B
---
>   Filesize: 1025B
```

## Commands

Strip all color profiles

``` bash
convert Sketch_sRGB_no_profile.png -strip Sketch_sRGB_no_profile_stripped.png
```

Generate Imagemagick data for all PNGs

``` bash
for f in $(ls *.png); do echo "identify -verbose $f > $(echo $f | cut -d. -f1).txt" | bash; done
```

Remove `gAMA` chunk

``` bash
pngcrush -rem gAMA Sketch_sRGB_no_profile.png Sketch_sRGB_no_profile_degamma.png
```
