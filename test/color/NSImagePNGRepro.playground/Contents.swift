import AppKit

func showme(_ path: String) -> NSImage {
    let path = Bundle.main.path(forResource: path, ofType: "png")!
    return NSImage(contentsOfFile: path)!
}

showme("no_chunks")

showme("gAMA_chunk")

showme("sRGB_chunk")
