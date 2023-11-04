# MakeCode Package for 4tronix Cube:Bit Magical RGB Cubes of Awesome

Helper routines for using the Fireleds in the [4tronix Cube:Bit range of Cubes](https://4tronix.co.uk/cubebit)

## Defining the Cube
The first thing you should do is create a Cube object with the required dimensions per side using the `create(...)` function.
This example creates a 4x4x4 cube on Pin 0:

```block
cubebit.create(DigitalPin.P0, 4)
```

Then set the brightness to be used (values from 0 to 255) using the `setBrightness(...)` function. If this block is not used, then the brightness is set to 40.
We strongly recommend keeping this at less than 100. All values sent to the LEDs after this command will be scaled down to fit in this maximum brightness level.

This example sets the brightness to 80:

```block
cubebit.ledBrightness(80)
```

## Using Cube:Bit Fireleds
Each Fireled can be addressed by using the ID which is a number from 0 to the number of pixels in the cube minus one.
For example, a 3x3x3 cube has 27 pixels so the ID can be 0 to 26, 4x4x4 has 64 (ID 0 to 63) and 5x5x5 has 125 (ID 0 to 124)

Set the Fireled at ID 37 to Green:

```block
cubebit.setPixelColor(0, 0xFF0000)
```

The colour value is a number. There are some pre-define colours (eg. Red, Yellow, etc) or you can put in a simple number,
or you can define separate Red, Green and Blue values using the `convertRGB(...)` map colour block.
This example sets Fireled 41 to colour: Red to 25, Green and Blue to 50:

```block
cubebit.setPixelColor(41, cubebit.convertRGB(25, 50, 50))
```

If you want to specify the x,y,z position of the pixel then use the `mapPixel(...)` block to create the pixel ID. The x, y and z values must be less than the number of Fireleds per side.

This example sets the Fireled at position x=2, y=3, z=1 to a Purple colour:

```block
cubebit.setPixelColor(cubebit.mapPixel(2, 3, 1), 0xFF00FF)
```

If you have set the Manual update mode, then whenever changing the colour of pixels or clearing them, or rotating them, you will need to display the result afterwards. 
Use the `ledShow(...)` block for this. The default update mode is automatic so any changes to the LED values will immediately appear on the LEDs

```block
cubebit.ledShow()
```

You can also set a whole plane of pixels to the same colour. eg. set the top slice to blue, or the left side to green. Use the `setPlane(...)` block.

This example sets Plane 1 on the XZ axis to Blue:

```block
cubebit.setPlane(1, CBAxis.XZ, 0x0000FF)
```

## Supported targets

* for PXT/microbit

## License

MIT
