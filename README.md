# MakeCode Package for 4tronix Cube:Bit Magical RGB Cubes of Awesome

Helper routines for using the neopixels in the Cube:Bit range of Cubes https://4tronix.co.uk/cubebit/.

## Defining the Cube
The first thing you should do is create a Cube object with the required dimensions per side. Use the block:
```blocks
create cube:bit on pin0 with side <3/4/5/6/7/8>
```

Then set the brightness to be used from 0 to 255. If this block is not used, then the brightness is set to 40. We strongly recommend keeping this at less than 100. All values sent to the LEDs after this command will be scaled down to fit in this maximum brightness level.
```blocks
set cube:bit brightness to <0..255>
```

## Using Cube:Bit Pixels
Each pixel can be addressed by using the pixel ID which is a number from 0 to the number of pixels in the cube minus one. eg. a 3x3x3 cube has 27 pixels so the ID can be 0 to 26, 4x4x4 has 64 (ID 0 to 63) and 5x5x5 has 125 (ID 0 to 124)
```blocks
set pixel color at ID to <colour>
```
The colour value is a number. There are some pre-define colours (eg. Red, Yellow, etc) or you can put in a simple number, or you can define separate Red, Green and Blue values using the map colour block
```blocks
convert from red, green, blue
```

If you want to specify the x,y,z position of the pixel then use the mapping block to create the pixel ID
```blocks
map from x y z
```

If you have set the Manual update mode, then whenever changing the colour of pixels or clearing them, or rotating them, you will need to display the result afterwards. Use the show changes block for this. The default update mode is automatic so any changes to the LED values will immediately appear on the LEDs
```blocks
show Cube:Bit changes
```

You can also set a whole plane of pixels to the same colour. eg. set the top slice to blue, or the left side to green. Use the set plane block:
```blocks
set plane <number> on axis <xy, xz, yz> to <colour>
```

## Supported targets

* for PXT/microbit

## License

MIT
