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


#import 'lib/calculations.js'

var DEBUG = false

// logging functions

function debug(message) {
  if (DEBUG) {
    log("DEBUG: " + message)
  }
}

function error(message) {
  log("ERROR: " + message)
}

// common functions

function isSupportedVersion() {
  return [[doc currentPage] respondsToSelector:"exportableLayers"]
}

// configuration objects

function Config() {

  this.SCALING_STRATEGIES = [
    new IPhoneAutoStrategy(),
    new IPhone6Strategy(),
    new IPhone6pStrategy(),
    new ExplicitSizeStrategy(this)
  ]

  var PREVIEW_DIRECTORY_NAME = "com.marcisme.sketch-preview"
  var CONFIG_FILE_NAME = "config.plist"
  var configDictionary = loadConfigDictionary()

  var PREVIEW_SIZES = [0.5, 1.0, 1.5, 2.0, 3.0, 4.0]
  this.PREVIEW_SIZE_LABELS = PREVIEW_SIZES.map(function(size) { return size + "x" })
  var PREVIEW_SIZE_INDEX_KEY = "previewSizeIndex"

  var SCALING_STRATEGY_ID_KEY = "scalingStrategyId"

  this.getPreviewSize = function() {
    var previewSizeIndex = configDictionary[PREVIEW_SIZE_INDEX_KEY]
    if (previewSizeIndex) {
      return PREVIEW_SIZES[previewSizeIndex]
    }
  }

  this.getPreviewSizeLabelIndex = function() {
    var index = configDictionary[PREVIEW_SIZE_INDEX_KEY]
    if (index < 0 || index >= PREVIEW_SIZES.length) { return 1 }
    return index
  }

  this.setPreviewSizeLabelIndex = function(previewSizeLabelIndex) {
    configDictionary[PREVIEW_SIZE_INDEX_KEY] = [NSNumber numberWithInteger:previewSizeLabelIndex]
  }

  this.getScalingStrategy = function() {
    var scalingStrategyId = this.getScalingStrategyId()
    var scalingStrategy
    debug("searching for scalingStrategyId: " + scalingStrategyId)
    this.SCALING_STRATEGIES.forEach(function(strategy) {
      if (scalingStrategyId == strategy.strategyId) {
        debug("found strategy: " + strategy.label)
        scalingStrategy = strategy
      }
    })
    return scalingStrategy
  }

  this.getScalingStrategyId = function() {
    return configDictionary[SCALING_STRATEGY_ID_KEY] || 1
  }

  this.setScalingStrategyId = function(scalingStrategyId) {
    configDictionary[SCALING_STRATEGY_ID_KEY] = [NSNumber numberWithInteger:scalingStrategyId]
  }

  this.save = function() {
    var url = getConfigFileURL()
    if ([configDictionary writeToURL:url atomically:true]) {
      debug("config written to: " + url)
    } else {
      debug("failed to write config to: " + url)
    }
    debug("config: " + configDictionary)
  }

  function loadConfigDictionary() {
    var url = getConfigFileURL()
    var cd = [NSMutableDictionary dictionaryWithContentsOfURL:url]
    if (cd) {
      debug("config loaded from: " + url)
      debug("config: " + cd)
      return cd
    } else {
      debug("failed to load config from: " + url)
      debug("config: " + cd)
      return [NSMutableDictionary dictionary]
    }
  }

  function getConfigFileURL() {
    var fileManager = [NSFileManager defaultManager]
    var applicationSupport = [[fileManager URLsForDirectory:NSCachesDirectory inDomains:NSUserDomainMask] lastObject]
    return [applicationSupport URLByAppendingPathComponent:PREVIEW_DIRECTORY_NAME + "/" + CONFIG_FILE_NAME]
  }

}

