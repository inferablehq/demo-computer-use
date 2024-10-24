import { moveMouse } from "robotjs";
import { convertCoordinates, takeScreenshot } from "./src/screenshot";

takeScreenshot()

convertCoordinates({
  screenshotSize: {
    width: 1280,
    height: 800
  },
  coordinates: {
    x: 640,
    y: 400
  }
})
