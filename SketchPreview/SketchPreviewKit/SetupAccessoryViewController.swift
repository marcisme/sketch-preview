//
//  SetupAccessoryViewController.swift
//  SketchPreview
//
//  Created by Marc Schwieterman on 11/26/16.
//  Copyright © 2016 Marc Schwieterman Software, LLC. All rights reserved.
//

import Cocoa

class SetupAccessoryViewController: NSViewController {

    @IBOutlet weak var autoScaleButton: NSButton!
    @IBOutlet weak var simulateSixButton: NSButton!
    @IBOutlet weak var simulateSixPlusButton: NSButton!
    @IBOutlet weak var explicitScaleButton: NSButton!
    @IBOutlet weak var explicitSizeSegmentedControl: NSSegmentedControl!
    @IBOutlet weak var debugLoggingButton: NSButton!

    var config: [String: Any] {
        get {
            return [
                "previewSizeIndex": -1,
                "scalingStrategyId": -1,
                "debug": false
            ]
        }
        set {
        }
    }
}
