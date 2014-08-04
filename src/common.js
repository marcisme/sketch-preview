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


/* Begin common code */

function isSupportedVersion() {
  return [[doc currentPage] respondsToSelector:"exportableLayers"]
}

function Config() {

  this.PREVIEW_SIZE_LABELS = ["default", "0.5x", "1x", "1.5x", "2x", "3x"]

  var PREVIEW_DIRECTORY_NAME = "com.marcisme.sketch-preview"
  var CONFIG_FILE_NAME = "/config.plist"
  var PREVIEW_SIZES = [0.5, 1.0, 1.5, 2.0, 3.0]
  var configDictionary = loadConfigDictionary()
  var PREVIEW_SIZE_INDEX_KEY = "previewSizeIndex"

  this.getPreviewSize = function() {
    var previewSizeIndex = configDictionary[PREVIEW_SIZE_INDEX_KEY]
    if (previewSizeIndex) {
      return PREVIEW_SIZES[previewSizeIndex]
    }
  }

  this.getPreviewSizeLabelIndex = function() {
    if (this.getPreviewSize()) {
      return configDictionary[PREVIEW_SIZE_INDEX_KEY] + 1
    } else {
      return 0
    }
  }

  this.setPreviewSizeLabelIndex = function(previewSizeLabelIndex) {
    configDictionary[PREVIEW_SIZE_INDEX_KEY] = previewSizeLabelIndex - 1
  }

  this.save = function() {
    [configDictionary writeToURL:getConfigFileURL() atomically:true]
  }

  function loadConfigDictionary() {
    return [NSMutableDictionary dictionaryWithContentsOfURL:getConfigFileURL()] ||
      [NSMutableDictionary dictionary]
  }

  function getConfigFileURL() {
    var fileManager = [NSFileManager defaultManager]
    var applicationSupport = [[fileManager URLsForDirectory:NSCachesDirectory inDomains:NSUserDomainMask] lastObject]
    return [applicationSupport URLByAppendingPathComponent:PREVIEW_DIRECTORY_NAME + "/" + CONFIG_FILE_NAME]
  }

}

/* End common code */

