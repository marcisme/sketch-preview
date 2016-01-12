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


@import 'lib/calculations.js'

// logger

function Logger(debugEnabled) {

  this.debugEnabled = debugEnabled

  this.debug = function(message) {
    if (this.debugEnabled === 1) {
      log("DEBUG: " + message)
    }
  }

  this.error = function(message) {
    log("ERROR: " + message)
  }

}

// common functions

var isSupportedVersion = function(doc) {
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

  var logger = new Logger()

  var PREVIEW_DIRECTORY_NAME = "com.marcisme.sketch-preview"
  var CONFIG_FILE_NAME = "config.plist"
  var configDictionary

  var PREVIEW_SIZES = [0.5, 1.0, 1.5, 2.0, 3.0, 3.5, 4.0]
  this.PREVIEW_SIZE_LABELS = PREVIEW_SIZES.map(function(size) { return size + "x" })
  var PREVIEW_SIZE_INDEX_KEY = "previewSizeIndex"

  var SCALING_STRATEGY_ID_KEY = "scalingStrategyId"

  var DEBUG_KEY = "debug"

  this.getPreviewSize = function() {
    var previewSizeIndex = configDictionary[PREVIEW_SIZE_INDEX_KEY]
    if (previewSizeIndex) {
      return PREVIEW_SIZES[previewSizeIndex]
    }
  }

  this.getPreviewSizeLabelIndex = function() {
    var index = configDictionary[PREVIEW_SIZE_INDEX_KEY]
    if (index == null || index < 0 || index >= PREVIEW_SIZES.length) { return 1 }
    return index
  }

  this.setPreviewSizeLabelIndex = function(previewSizeLabelIndex) {
    configDictionary[PREVIEW_SIZE_INDEX_KEY] = [NSNumber numberWithInteger:previewSizeLabelIndex]
  }

  this.getScalingStrategy = function() {
    var scalingStrategyId = this.getScalingStrategyId()
    var scalingStrategy
    logger.debug("searching for scalingStrategyId: " + scalingStrategyId)
    this.SCALING_STRATEGIES.forEach(function(strategy) {
      if (scalingStrategyId == strategy.strategyId) {
        logger.debug("found strategy: " + strategy.label)
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

  function isDebug(cd) {
    if (cd == null) { return 0 }
    var debugEnabled = cd[DEBUG_KEY]
    if (debugEnabled == null) { return 0 }
    return [debugEnabled integerValue]
  }

  this.isDebug = function() {
    return isDebug(configDictionary)
  }

  this.setDebug = function(enabled) {
    configDictionary[DEBUG_KEY] = [NSNumber numberWithInteger:enabled]
  }

  this.save = function() {
    var url = getConfigFileURL()
    if ([configDictionary writeToURL:url atomically:true]) {
      logger.debug("config written to: " + url)
    } else {
      logger.debug("failed to write config to: " + url)
    }
    logger.debug("config: " + configDictionary)
  }

  function loadConfigDictionary() {
    var url = getConfigFileURL()
    var cd = [NSMutableDictionary dictionaryWithContentsOfURL:url]
    logger.debugEnabled = isDebug(cd)
    if (cd) {
      logger.debug("config loaded from: " + url)
      logger.debug("config: " + cd)
      return cd
    } else {
      logger.debug("failed to load config from: " + url)
      logger.debug("config: " + cd)
      return [NSMutableDictionary dictionary]
    }
  }

  function getConfigFileURL() {
    var fileManager = [NSFileManager defaultManager]
    var applicationSupport = [[fileManager URLsForDirectory:NSCachesDirectory inDomains:NSUserDomainMask] lastObject]
    return [applicationSupport URLByAppendingPathComponent:PREVIEW_DIRECTORY_NAME + "/" + CONFIG_FILE_NAME]
  }

  configDictionary = loadConfigDictionary()

}

