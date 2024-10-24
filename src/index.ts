import { Inferable, blob } from 'inferable';
import { z } from 'zod';
import { getMousePos, moveMouse, mouseClick, typeString, keyTap } from 'robotjs';
import { computerSchema } from './computer';
import { convertCoordinates, takeScreenshot } from './screenshot';

// Instantiate the Inferable client.
const i = new Inferable({
  // To get a new key, run:
  // npx @inferable/cli auth keys create 'My New Machine Key' --type='cluster_machine'
  apiSecret: process.env.INFERABLE_API_SECRET
})

i.default.register({
  name: "computer",
  func: async (input) => {
    switch (input.action) {
      case "screenshot": {
        return {
          size: {
            width: 1280,
            height: 800
          },
          currentMouseCoordinates: getMousePos(),
          image: await takeScreenshot(),
          success: true
        }
      }
      case "mouse_move": {
        const coordinates = convertCoordinates({
          screenshotSize: {
            width: 1280,
            height: 800
          },
          coordinates: {
            x: input.coordinate[0],
            y: input.coordinate[1]
          }
        })

        const previousMouseCoordinates = getMousePos();

        moveMouse(coordinates.x, coordinates.y);
        await new Promise(resolve => setTimeout(resolve, 100));
        return {
          previousMouseCoordinates,
          currentMouseCoordinates: getMousePos(),
          image: await takeScreenshot(),
          success: true,
        }
      }
      case "key": {
        let key = input.text.toLowerCase();
        let modifier = undefined;
        if (key.includes("+")) {
          modifier = key.split("+")[0];
          key = key.split("+")[1];
        }

        if (key === "return") {
          key = "enter";
        }

        if (key.startsWith("kp_")) {
          key = `numpad_${key.split("_")[1]}`
        }

        keyTap(key, modifier);
        await new Promise(resolve => setTimeout(resolve, 100));
        return {
          currentMouseCoordinates: getMousePos(),
          image: await takeScreenshot(),
          success: true,
        }
      }
      case "type": {
        // Type the input.text
        typeString(input.text);
        await new Promise(resolve => setTimeout(resolve, 100));
        return {
          currentMouseCoordinates: getMousePos(),
          image: await takeScreenshot(),
          success: true,
        }
      }
      case "cursor_position": {
        return {
          currentMouseCoordinates: getMousePos(),
          image: await takeScreenshot(),
          success: true,
        }
      }
      case "left_click": {
        mouseClick("left");
        await new Promise(resolve => setTimeout(resolve, 100));
        return {
          currentMouseCoordinates: getMousePos(),
          image: await takeScreenshot(),
          success: true,
        }
      }
      case "double_click": {
        mouseClick("left", true);
        await new Promise(resolve => setTimeout(resolve, 100));
        return {
          currentMouseCoordinates: getMousePos(),
          image: await takeScreenshot(),
          success: true,
        }
      }
      case "right_click": {
        mouseClick("right");
        await new Promise(resolve => setTimeout(resolve, 100));
        return {
          currentMouseCoordinates: getMousePos(),
          image: await takeScreenshot(),
          success: true,
        }
      }
      case "middle_click": {
        mouseClick("middle");
        await new Promise(resolve => setTimeout(resolve, 100));
        return {
          currentMouseCoordinates: getMousePos(),
          image: await takeScreenshot(),
          success: true,
        }
      }
    }
    throw new Error(`Unknown action: ${input.action}`);
  },
  schema: {
    input: computerSchema,
  },
  config: {
    private: true
  }
});

i.default.register({
  name: "wait",
  description: "Sleep for a specified amount of time (in milliseconds)",
  func: async (input) => {
    await new Promise(resolve => setTimeout(resolve, input.time));
    return {
      success: true
    }
  },
  schema: {
    input: z.object({
      time: z.number().describe("The amount of time to sleep in milliseconds"),
    })
  },
});

i.default.start().then(() => {
  console.log("Inferable demo service started");
})
