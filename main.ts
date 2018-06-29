
/**
  * Enumeration of pins
  */
enum BCButtons {
    //% block="Pin0"
    pin1,
    //% block="Pin2"
    pin2,
    //% block="Pin3"
    pin3,
    //% block="Pin4"
    pin4,
    //% block="Pin5"
    pin5
}

/**
 * Custom blocks
 */
//% weight=10 color=#e7660b icon="\uf247"
namespace cubebit {

    let nCube: neopixel.Strip;
    let cubeSide: number;

    /**
     * Create a Cube:Bit cube on Pin0
     * @param side number of pixels on each side
     */
    //% blockId="cubebit_create" block="create Cube:Bit on pin0 with side %side"
    //% weight=99
    //% side.min=3 side.max=8
    export function create(side: number): void
    {
        neo(side);
    }

    function neo(side: number): neopixel.Strip {
        if (!nCube)
        {
            cubeSide = side;
            nCube = neopixel.create(DigitalPin.P0, side*side*side, NeoPixelMode.RGB)
        }
        return nCube;
    }

    /**
      * Sets all pixels to a given colour (using colour names).
      *
      * @param rgb RGB colour of the pixel
      */
    //% blockId="cubebit_set_color" block="set all pixels to %rgb=neopixel_colors"
    //% weight=80
    export function setColor(rgb: number) {
        neo(3).showColor(rgb);
    }

    function pixelMap(x: number, y: number, z: number): number
    {
        let q=0;
        if (x<cubeSide && y<cubeSide && z<cubeSide && x>=0 && y>=0 && z>=0)
        {
            if (z==0 || z==2 || z==4)
            {
                if (y==0 || y==2 || y==4)
                    q = y * cubeSide + x;
                else
                    q = y * cubeSide + cubeSide - 1 - x;
            }
            else
            {
                if (x==0 || x==2 || x==4)
                    q = cubeSide * (cubeSide - x) - 1 - y;
                else
                    q = (cubeSide - 1 - x) * cubeSide + y;
            }
        }
        return z*cubeSide*cubeSide + q;
    }

    /**
     * Get the pixel ID from x, y, z coordinates
     *
     * @param x position from left to right (x dimension)
     * @param y position from front to back (y dimension)
     * @param z position from bottom to top (z dimension)
     */
    //% blockId="cubebit_map_pixel" block="map ID from x %x|y %y|z %z"
    //% weight=93
    export function mapPixel(x: number, y: number, z: number): number {
        return pixelMap(x,y,z);
    }

    /**
     * Set a pixel to a given colour (using colour names).
     *
     * @param ID location of the pixel in the cube from 0
     * @param rgb RGB color of the LED
     */
    //% blockId="cubebit_set_pixel_color" block="set pixel color at %ID|to %rgb=neopixel_colors"
    //% weight=80
    export function setPixelColor(ID: number, rgb: number): void {
        neo(3).setPixelColor(ID, rgb);
    }

    /**
      * Show pixels
      */
    //% blockId="cubebit_show" block="show Cube:Bit changes"
    //% weight=76
    export function neoShow(): void {
        neo(3).show();
    }

    /**
      * Clear leds.
      */
    //% blockId="cubebit_clear" block="clear all pixels"
    //% weight=75
    export function neoClear(): void {
        neo(3).clear();
    }

    /**
      * Shows a rainbow pattern on all pixels
      */
    //% blockId="cubebit_rainbow" block="set Cube:Bit rainbow"
    //% weight=70
    export function neoRainbow(): void {
        neo(3).showRainbow(1, 360);
    }

    /**
     * Shift LEDs forward and clear with zeros.
     */
    //% blockId="cubebit_shift" block="shift pixels"
    //% weight=66
    export function neoShift(): void {
        neo(3).shift(1);
    }

    /**
     * Rotate LEDs forward.
     */
    //% blockId="cubebit_rotate" block="rotate pixels"
    //% weight=65
    export function neoRotate(): void {
        neo(3).rotate(1);
    }

    /**
     * Set the brightness of the cube. Note this only applies to future writes to the strip.
     *
     * @param brightness a measure of LED brightness in 0-255. eg: 255
     */
    //% blockId="cubebit_brightness" block="set Cube:Bit brightness %brightness"
    //% brightness.min=0 brightness.max=255
    //% weight=10
    export function neoBrightness(brightness: number): void {
        neo(3).setBrightness(brightness);
    }


}
