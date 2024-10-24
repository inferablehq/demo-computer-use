export const computerSchema = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  properties: {
    action: {
      description: `The action to perform. The available actions are:
* 'key': Press a key or key-combination on the keyboard.
- This supports xdotool's 'key' syntax.
- Examples: "a", "Return", "alt+Tab", "ctrl+s", "Up", "KP_0" (for the numpad 0 key).
* 'type': Type a string of text on the keyboard.
* 'cursor_position': Get the current (x, y) pixel coordinate of the cursor on the screen.
* 'mouse_move': Move the cursor to a specified (x, y) pixel coordinate on the screen.
* 'left_click': Click the left mouse button.
* 'left_click_drag': Click and drag the cursor to a specified (x, y) pixel coordinate on the screen.
* 'right_click': Click the right mouse button.
* 'middle_click': Click the middle mouse button.
* 'double_click': Double-click the left mouse button.
* 'screenshot': Take a screenshot of the screen.`,
      enum: [
        "key",
        "type",
        "mouse_move",
        "left_click",
        "left_click_drag",
        "right_click",
        "middle_click",
        "double_click",
        "screenshot",
        "cursor_position",
      ],
      type: "string",
    },
    coordinate: {
      description: "(x, y): The x (pixels from the left edge) and y (pixels from the top edge) coordinates to move the mouse to. Required only by `action=mouse_move` and `action=left_click_drag`.",
      type: "array",
    },
    text: {
      description: "Required only by `action=type` and `action=key`.",
      type: "string",
    },
  },
  required: ["action"],
  type: "object",
}
