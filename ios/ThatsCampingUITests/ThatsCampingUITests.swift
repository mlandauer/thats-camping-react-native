//
//  ThatsCampingUITests.swift
//  ThatsCampingUITests
//
//  Created by Matthew Landauer on 10/10/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

import XCTest

class ThatsCampingUITests: XCTestCase {
  let app = XCUIApplication()

  override func setUp() {
    super.setUp()

    // Put setup code here. This method is called before the invocation of each test method in the class.
    // In UI tests it’s important to set the initial state - such as interface orientation - required for your tests before they run. The setUp method is a good place to do this.
  }

  override func tearDown() {
    // Put teardown code here. This method is called after the invocation of each test method in the class.
    super.tearDown()
  }

  func testExample() {
    // In UI tests it is usually best to stop immediately when a failure occurs.
    continueAfterFailure = false
    // UI tests must launch the application that they test. Doing this in setup will make sure it happens for each test method.
    setupSnapshot(app)

    addUIInterruptionMonitor(withDescription: "Location Dialog") { (alert) -> Bool in
      alert.buttons["Allow"].tap()
      return true
    }

    app.launch()

    // We need to tap something to trigger the interruption monitor above
    app.tabBars.buttons["List"].tap()

    // Wait for data to load
    let laneCove = app.otherElements["Lane Cove River"]
    let exists = NSPredicate(format: "exists == true")
    expectation(for: exists, evaluatedWith: laneCove, handler: nil)
    waitForExpectations(timeout: 120, handler: nil)

    snapshot("0Launch")
  }
}
