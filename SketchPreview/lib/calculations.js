// Copyright (c) 2014 Marc Schwieterman
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.


function IPhoneCalculator() {

  this.sizeFor5 = 2
  this.sizeFor6 = 2
  this.sizeFor6p = 3

  this.is5 = function(rect) {
    return isCompatibleRect(rect, [320, 568])
  }

  this.is6 = function(rect) {
    return isCompatibleRect(rect, [375, 667])
  }

  this.is6p = function(rect) {
    return isCompatibleRect(rect, [414, 736])
  }

  this.scaleTo6 = function(rect) {
    return 1334 / largestDimension(rect)
  }

  this.scaleTo6p = function(rect) {
    return 2208 / largestDimension(rect)
  }

  function largestDimension(rect) {
    return Math.max(rect.size.width, rect.size.height)
  }

  function isCompatibleRect(rect, dimensions) {
    var size = rect.size
    if (size.width == dimensions[0] && size.height == dimensions[1]) {
      return true
    }
    if (size.height == dimensions[0] || size.width == dimensions[1]) {
      return true
    }
    return false
  }

}

// The strategyId properties should be > 0 because they're being used as tag
// values in the UI, and we want to avoid the case where a tag hasn't been
// set and defaults to 0.

function ExplicitSizeStrategy(config) {

  this.strategyId = 1
  this.label = "Scale to explicit size"
  this.config = config

  this.sizeForRect = function(rect) {
    return this.config.getPreviewSize()
  }

}

function IPhoneAutoStrategy() {

  this.strategyId = 2
  this.label = "Scale for iPhone (320x568@2x, 375x667@2x, 414x736@3x)",
  this.iPhone = new IPhoneCalculator()

  this.sizeForRect = function(rect) {
    if (this.iPhone.is5(rect)) { return this.iPhone.sizeFor5 }
    if (this.iPhone.is6(rect)) { return this.iPhone.sizeFor6 }
    if (this.iPhone.is6p(rect)) { return this.iPhone.sizeFor6p }
    return 1
  }

}

function IPhone6Strategy() {

  this.strategyId = 3
  this.label = "Simulate iPhone 6 scaling (320x568 to 750x1334*, 375x667@2x)",
  this.iPhone = new IPhoneCalculator()

  this.sizeForRect = function(rect) {
    if (this.iPhone.is5(rect)) { return this.iPhone.scaleTo6(rect) }
    if (this.iPhone.is6(rect)) { return this.iPhone.sizeFor6 }
    return 1
  }

}

function IPhone6pStrategy() {

  this.strategyId = 4
  this.label = "Simulate iPhone 6+ scaling (320x568, 375x667 to 1242x2208*, 414x736@3x)",
  this.iPhone = new IPhoneCalculator()

  this.sizeForRect = function(rect) {
    if (this.iPhone.is5(rect)) { return this.iPhone.scaleTo6p(rect) }
    if (this.iPhone.is6(rect)) { return this.iPhone.scaleTo6p(rect) }
    if (this.iPhone.is6p(rect)) { return this.iPhone.sizeFor6p }
    return 1
  }

}

