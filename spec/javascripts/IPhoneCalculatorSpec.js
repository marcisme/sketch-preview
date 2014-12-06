describe("IPhoneCalculator", function() {

  var IPhone5Portrait = rect([320, 568])
  var IPhone6Portrait = rect([375, 667])
  var IPhone6pPortrait = rect([414, 736])

  var IPhone5Landscape = rect([568, 320])
  var IPhone6Landscape = rect([667, 375])
  var IPhone6pLandscape = rect([736, 414])

  var calculator = new IPhoneCalculator()

  describe("scaling factors", function() {

    it("returns the scale factor for iPhone 5[s]", function() {
      expect(calculator.sizeFor5).toEqual(2)
    })

    it("returns the scale factor for iPhone 6", function() {
      expect(calculator.sizeFor6).toEqual(2)
    })

    it("returns the scale factor for iPhone 6p", function() {
      expect(calculator.sizeFor6p).toEqual(3)
    })

  })

  describe("portrait", function() {

    itDetectsSupportedArtboardSizes([IPhone5Portrait, IPhone6Portrait, IPhone6pPortrait])

    describe("iPhone 6 scaling", function() {

      it("scales from iPhone 5[s]", function() {
        expect(calculator.scaleTo6(IPhone5Portrait)).toBeCloseTo(2.348)
      })

      it("scales vertically scrollable content from iPhone 5[s]", function() {
        expect(calculator.scaleTo6(delta(IPhone5Portrait, [0, 100]))).toBeCloseTo(2.348)
      })

    })

    describe("iPhone 6+ scaling", function() {

      it("scales from iPhone 5[s]", function() {
        expect(calculator.scaleTo6p(IPhone5Portrait)).toBeCloseTo(3.887)
      })

      it("scales from iPhone 6", function() {
        expect(calculator.scaleTo6p(IPhone6Portrait)).toBeCloseTo(3.310)
      })

      it("scales vertically scrollable content from iPhone 5[s]", function() {
        expect(calculator.scaleTo6p(delta(IPhone5Portrait, [0, 100]))).toBeCloseTo(3.887)
      })

      it("scales vertically scrollable content from iPhone 6", function() {
        expect(calculator.scaleTo6p(delta(IPhone6Portrait, [0, 100]))).toBeCloseTo(3.310)
      })

    })

  })

  describe("landscape", function() {

    itDetectsSupportedArtboardSizes([IPhone5Landscape, IPhone6Landscape, IPhone6pLandscape])

    describe("iPhone 6 scaling", function() {

      it("scales from iPhone 5[s]", function() {
        expect(calculator.scaleTo6(IPhone5Landscape)).toBeCloseTo(2.348)
      })

      it("scales vertically scrollable content from iPhone 5[s]", function() {
        expect(calculator.scaleTo6(delta(IPhone5Landscape, [0, 100]))).toBeCloseTo(2.348)
      })

      it("scales horizontally scrollable content from iPhone 5[s]", function() {
        expect(calculator.scaleTo6(delta(IPhone5Landscape, [100, 0]))).toBeCloseTo(2.348)
      })

    })

    describe("iPhone 6+ scaling", function() {

      it("scales from iPhone 5[s]", function() {
        expect(calculator.scaleTo6p(IPhone5Landscape)).toBeCloseTo(3.887)
      })

      it("scales from iPhone 6", function() {
        expect(calculator.scaleTo6p(IPhone6Landscape)).toBeCloseTo(3.310)
      })

      it("scales vertically scrollable content from iPhone 5[s]", function() {
        expect(calculator.scaleTo6p(delta(IPhone5Landscape, [0, 100]))).toBeCloseTo(3.887)
      })

      it("scales vertically scrollable content from iPhone 6", function() {
        expect(calculator.scaleTo6p(delta(IPhone6Landscape, [0, 100]))).toBeCloseTo(3.310)
      })

      it("scales horizontally scrollable content from iPhone 5[s]", function() {
        expect(calculator.scaleTo6p(delta(IPhone5Landscape, [100, 0]))).toBeCloseTo(3.887)
      })

      it("scales horizontally scrollable content from iPhone 6", function() {
        expect(calculator.scaleTo6p(delta(IPhone6Landscape, [100, 0]))).toBeCloseTo(3.310)
      })

    })

  })

  function rect(size) {
    return { origin: { x: 0, y: 0 }, size: { width: size[0], height: size[1] } }
  }

  function delta(originalRect, delta) {
    var newWidth = originalRect.size.width + delta[0]
    var newHeight = originalRect.size.height + delta[1]
    return rect([newWidth, newHeight])
  }

  function itDetectsSupportedArtboardSizes(iPhoneRects) {

    describe("artboard detection", function() {

      it("detects iPhone 5[s] artboards", function() {
        expect(calculator.isArtboardFor5(delta(iPhoneRects[0], [-1, 0]))).toBe(false)
        expect(calculator.isArtboardFor5(delta(iPhoneRects[0], [0, -1]))).toBe(false)
        expect(calculator.isArtboardFor5(delta(iPhoneRects[0], [-1, -1]))).toBe(false)
        expect(calculator.isArtboardFor5(iPhoneRects[0])).toBe(true)
        expect(calculator.isArtboardFor5(delta(iPhoneRects[0], [1, 0]))).toBe(true)
        expect(calculator.isArtboardFor5(delta(iPhoneRects[0], [0, 1]))).toBe(true)
        expect(calculator.isArtboardFor5(delta(iPhoneRects[0], [1, 1]))).toBe(false)
      })

      it("detects iPhone 6 artboards", function() {
        expect(calculator.isArtboardFor6(delta(iPhoneRects[1], [-1, 0]))).toBe(false)
        expect(calculator.isArtboardFor6(delta(iPhoneRects[1], [0, -1]))).toBe(false)
        expect(calculator.isArtboardFor6(delta(iPhoneRects[1], [-1, -1]))).toBe(false)
        expect(calculator.isArtboardFor6(iPhoneRects[1])).toBe(true)
        expect(calculator.isArtboardFor6(delta(iPhoneRects[1], [1, 0]))).toBe(true)
        expect(calculator.isArtboardFor6(delta(iPhoneRects[1], [0, 1]))).toBe(true)
        expect(calculator.isArtboardFor6(delta(iPhoneRects[1], [1, 1]))).toBe(false)
      })

      it("detects iPhone 6+ artboards", function() {
        expect(calculator.isArtboardFor6p(delta(iPhoneRects[2], [-1, 0]))).toBe(false)
        expect(calculator.isArtboardFor6p(delta(iPhoneRects[2], [0, -1]))).toBe(false)
        expect(calculator.isArtboardFor6p(delta(iPhoneRects[2], [-1, -1]))).toBe(false)
        expect(calculator.isArtboardFor6p(iPhoneRects[2])).toBe(true)
        expect(calculator.isArtboardFor6p(delta(iPhoneRects[2], [1, 0]))).toBe(true)
        expect(calculator.isArtboardFor6p(delta(iPhoneRects[2], [0, 1]))).toBe(true)
        expect(calculator.isArtboardFor6p(delta(iPhoneRects[2], [1, 1]))).toBe(false)
      })

    })

  }

})
