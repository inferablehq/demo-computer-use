import screenshot from 'screenshot-desktop';
import { readFileSync, unlinkSync } from 'fs';
import sharp from 'sharp';
import { getScreenSize } from 'robotjs';
import { blob } from 'inferable';

export const takeScreenshot = async () => {
  const name = `screenshot-${Date.now()}.png`;

  await screenshot({
    format: "png",
    filename: name,
  });

  const resized = await sharp(readFileSync(name))
    .resize({
      width: 1280,
      height: 800,
      fit: "fill",
    })
    .toBuffer();

  // write the resized image to disk
  await sharp(resized).toFile(`resized-${name}`);

  unlinkSync(name);
  unlinkSync(`resized-${name}`);

  return blob({
    name,
    data: resized,
    type: "image/png",
  })
;
};

export const convertCoordinates = ({
  screenSize,
  screenshotSize,
  coordinates
}: {
    screenSize?: {
      width: number,
      height: number
    },
    screenshotSize: {
      width: number,
      height: number
    },
    coordinates: {
      x: number,
      y: number
    }
  }) => {
  // Ensure screenSize is assigned correctly, or fetch it if not provided
  screenSize = screenSize ?? getScreenSize();

  // Calculate scale ratios
  const scaleX = screenSize.width / screenshotSize.width;
  const scaleY = screenSize.height / screenshotSize.height;

  // Use scaling ratios to convert the coordinates
  const coordinatesInScreenshot = {
    x: coordinates.x * scaleX,
    y: coordinates.y * scaleY
  }

  return coordinatesInScreenshot;
};
