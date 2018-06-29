# MakeCode Package for 4tronix Cube:Bit Magical Mystery Cubes

Helper routines for using the neopixels in the Cube:Bit range of Cubes https://4tronix.co.uk/cubebit/.

## Defining the Cube
The first thing you shouild do is create a Cube object with the required diemnsions per side use the
```blocks
create cube:bit on pin0 with side <3/4/5/6/7/8>
```

Then set the brightness to be used from 0 to 255. We strongly recommend keeping this at less than 100. All values sent to the LEDs after this command will be scaled down to fit in this maximum brightness level.
```blocks
set cube:bit brightness to <0..255>
```

##Using Cube:Bit Pixels
Each pixel can be address by using the pixel ID which is a number from 0 to the number of pixels in the cube. eg. a 3x3x3 cube has 27 pixels, 4x4x4 has 64 and 5x5x5 has 125
If you want to specify the x,y,z position of the pixel then use the mapping block to create the pixel ID
```blocks
map from x y x
```

Whenever changing the colour of pixels or clearing them, or rotating them, you will need to display the result afterwards. Use the show block for this
```blocks
show pixels
```

## Supported targets

* for PXT/microbit

## License

Apache 2.0
