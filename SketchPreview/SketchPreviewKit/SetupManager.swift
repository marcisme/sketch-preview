//
//  SetupManager.swift
//  SketchPreview
//
//  Created by Marc Schwieterman on 11/26/16.
//  Copyright © 2016 Marc Schwieterman Software, LLC. All rights reserved.
//

import Cocoa

public class SetupManager: NSObject {

    public static let shared = SetupManager()

    public func setup() -> [String: Any] {
        let alert = NSAlert()
        alert.messageText = "Preview Setup"
        alert.informativeText = "* Simulated scaling modes are experimental"
        alert.addButton(withTitle: "Save")
        alert.addButton(withTitle: "Cancel")

        let bundle = Bundle(for: SetupManager.self)
        let setupAccessoryViewController = SetupAccessoryViewController(nibName: nil, bundle: bundle)!
        alert.accessoryView = setupAccessoryViewController.view

        alert.runModal()

        return [
            "foo": "FOO",
            "bar": 1,
            "baz": true
        ]
    }

}
