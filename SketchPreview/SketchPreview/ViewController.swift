//
//  ViewController.swift
//  SketchPreview
//
//  Created by Marc Schwieterman on 11/26/16.
//  Copyright © 2016 Marc Schwieterman Software, LLC. All rights reserved.
//

import Cocoa
import SketchPreviewKit

class ViewController: NSViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }

    override var representedObject: Any? {
        didSet {
        // Update the view, if already loaded.
        }
    }

    @IBAction func setup(_ sender: NSButton) {
        if let config = SetupManager.shared.setup(config: [:]) {
            print(config)
        } else {
            print("cancelled")
        }
    }

}
