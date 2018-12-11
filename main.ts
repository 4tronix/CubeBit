
/**
  * Enumeration of axes
  */
enum CBAxis {
    //% block="xy"
    XY,
    //% block="xz"
    XZ,
    //% block="yz"
    YZ
}

/**
  * Pre-Defined LED colours
  */
enum CBColors
{
    //% block=red
    Red = 0xff0000,
    //% block=orange
    Orange = 0xffa500,
    //% block=yellow
    Yellow = 0xffff00,
    //% block=green
    Green = 0x00ff00,
    //% block=blue
    Blue = 0x0000ff,
    //% block=indigo
    Indigo = 0x4b0082,
    //% block=violet
    Violet = 0x8a2be2,
    //% block=purple
    Purple = 0xff00ff,
    //% block=white
    White = 0xffffff,
    //% block=black
    Black = 0x000000
}


/**
 * Custom blocks
 */
//% weight=10 color=#e7660b icon="\uf247"
namespace cubebit {

    let nCube: neopixel.Strip;
    let cubeHeight: number;
    let cubeSide: number;
    let cubeSide2: number;
    let cubeSide3: number;

    /**
     * Create a Cube:Bit cube (default 3x3x3) on Selected Pin (default Pin0)
     * @param pin Micro:Bit pin to connect to Cube:Bit
     * @param side number of pixels on each side. eg: 3, 4, 5, 8
     */

// Helper functions

    function pixelMap(x: number, y: number, z: number): number
    {
        if (cubeSide == 9)	// need to change to separate flag for cubes built out of smaller slices
            return pMap8(x, y, z);
        else
            return pMap(x, y, z, cubeSide);
    }

    //pMap8 is mapping function for 8x8 built out of 4x4 slices. 0,0,0 is not ID=0, it is in fact 268
    function pMap8(x: number, y: number, z: number): number
    {
        if (x<4 && y<4)  // column 0 (front left)
        {
            return 256 + pMap(3-x, 3-y, z, 4);
        }
        else if (x>=4 && y<4)  // column 1 (front right)
        {
            if ((z%2) == 0)
                return 255 - pMap(y, x-4, z, 4);
            else
                return 255 - pMap(3-y, 7-x, z, 4);
        }
        else if (x<4 && y>=4)  // column 2 (back left)
        {
            if ((z%2) == 0)
                return 511 - pMap(7-y, 3-x, z, 4);
            else
                return 511 - pMap(y-4, x, z, 4);
        }
        else  // column 3 (back right)
        {
            return pMap(x-4, y-4, z, 4);
        }
    }

    function pMap(x: number, y: number, z: number, side: number): number
    {
        let q=0;
        if (x<side && y<side && z<cubeHeight && x>=0 && y>=0 && z>=0)
        {
            if ((z%2) == 0)
            {
                if ((y%2) == 0)
                    q = y * side + x;
                else
                    q = y * side + side - 1 - x;
            }
            else
            {
                if ((side%2) == 0)
                    y = side - y - 1;
                if ((x%2) == 0)
                    q = side * (side - x) - 1 - y;
                else
                    q = (side - 1 - x) * side + y;
            }
            return z*side*side + q;
        }
        return cubeSide3;    // extra non-existent pixel for out of bounds
    }

    function neo(pin: DigitalPin, side: number): neopixel.Strip
    {
        if (!nCube)
        {
            if (! cubeHeight)
                cubeHeight = side;
            cubeSide = side;
            cubeSide2 = side * side;
            cubeSide3 = side * side * cubeHeight;
            nCube = neopixel.create(pin, cubeSide3, NeoPixelMode.RGB);
            nCube.setBrightness(40);
        }
        return nCube;
    }

// Main exported functions

    //% blockId="cubebit_create" block="create Cube:Bit on %pin| with side %side"
    //% weight=100
    //% side.min=3 side.max=8
    export function create(pin: DigitalPin, side: number): void
    {
        neo(pin, side);
    }

    /**
      * Show all changes
      */
    //% blockId="cubebit_show" block="show Cube:Bit changes"
    //% weight=95
    export function neoShow(): void
    {
        neo(DigitalPin.P0,3).show();
    }

    /**
      * Sets all pixels to a given colour
      *
      * @param rgb RGB colour of the pixel
      */
    //% blockId="cubebit_set_color" block="set all pixels to %rgb=cb_colours"
    //% weight=90
    export function setColor(rgb: number): void
    {
        neo(DigitalPin.P0,3).showColor(rgb);
    }

    /**
     * Set a pixel to a given colour.
     *
     * @param ID location of the pixel in the cube from 0
     * @param rgb RGB color of the LED
     */
    //% blockId="cubebit_set_pixel_color" block="set pixel color at %ID|to %rgb=cb_colours"
    //% weight=85
    export function setPixelColor(ID: number, rgb: number): void
    {
        neo(DigitalPin.P0,3).setPixelColor(ID, rgb);
    }

    /**
      * Clear leds.
      */
    //% blockId="cubebit_clear" block="clear all pixels"
    //% weight=80
    export function neoClear(): void
    {
        neo(DigitalPin.P0,3).clear();
    }

    /**
      * Sets a plane of pixels to given colour
      *
      * @param plane number of plane from 0 to size of cube
      * @param axis axis (xy,xz,yz) of the plane
      * @param rgb RGB colour of the pixel
      */
    //% blockId="cubebit_set_plane" block="set plane %plane| on axis %axis=CBAxis| to %rgb=cb_colours"
    //% weight=75
    export function setPlane(plane: number, axis: CBAxis, rgb: number): void
    {
        if (axis == CBAxis.YZ)
        {
            for (let y=0; y<cubeSide; y++)
                for (let z=0; z<cubeHeight; z++)
                    nCube.setPixelColor(pixelMap(plane,y,z), rgb);
        }
        else if (axis == CBAxis.XZ)
        {
            for (let x=0; x<cubeSide; x++)
                for (let z=0; z<cubeHeight; z++)
                    nCube.setPixelColor(pixelMap(x,plane,z), rgb);
        }
        else if (axis == CBAxis.XY)
        {
            for (let x=0; x<cubeSide; x++)
                for (let y=0; y<cubeSide; y++)
                    nCube.setPixelColor(pixelMap(x,y,plane), rgb);
        }
    }

    /**
      * Defines a custom height for the Cube (height>0)
      * @param height number of slices in the tower. eg: 4
      */
    //% blockId="cubebit_set_height" block="set height of tower to %height"
    //% weight=70
    //% deprecated=true
    export function setHeight(height: number): void
    {
        if (! cubeHeight)
            cubeHeight = height;
    }

    /**
      * Get numeric value of colour
      *
      * @param color Standard RGB Led Colours
      */
    //% blockId="cb_colours" block=%color
    //% weight=65
    export function CBColours(color: CBColors): number
    {
        return color;
    }

    /**
     * Get the pixel ID from x, y, z coordinates
     *
     * @param x position from left to right (x dimension)
     * @param y position from front to back (y dimension)
     * @param z position from bottom to top (z dimension)
     */
    //% blockId="cubebit_map_pixel" block="map ID from x %x|y %y|z %z"
    //% weight=55
    export function mapPixel(x: number, y: number, z: number): number
    {
        return pixelMap(x,y,z);
    }

    /**
     * Convert from RGB values to colour number
     *
     * @param red Red value of the LED 0:255
     * @param green Green value of the LED 0:255
     * @param blue Blue value of the LED 0:255
     */
    //% blockId="cubebit_convertRGB" block="convert from red %red| green %green| blue %bblue"
    //% weight=50
    export function convertRGB(r: number, g: number, b: number): number
    {
        return ((r & 0xFF) << 16) | ((g & 0xFF) << 8) | (b & 0xFF);
    }

    /**
      * Shows a rainbow pattern on all pixels
      */
    //% blockId="cubebit_rainbow" block="set Cube:Bit rainbow"
    //% weight=45
    export function neoRainbow(): void
    {
        neo(DigitalPin.P0,3).showRainbow(1, 360);
    }

    /**
     * Shift LEDs forward and clear with zeros.
     */
    //% blockId="cubebit_shift" block="shift pixels"
    //% weight=40
    export function neoShift(): void
    {
        neo(DigitalPin.P0,3).shift(1);
    }

    /**
     * Rotate LEDs forward.
     */
    //% blockId="cubebit_rotate" block="rotate pixels"
    //% weight=35
    export function neoRotate(): void
    {
        neo(DigitalPin.P0,3).rotate(1);
    }

    /**
     * Set the brightness of the cube. Note this only applies to future writes to the strip.
     * @param brightness a measure of LED brightness in 0-255. eg: 40
     */
    //% blockId="cubebit_brightness" block="set Cube:Bit brightness %brightness"
    //% brightness.min=0 brightness.max=255
    //% weight=30
    export function neoBrightness(brightness: number): void
    {
        neo(DigitalPin.P0,3).setBrightness(brightness);
    }


}
