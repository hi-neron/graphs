# Canvas Notes

## PATHS

**fill()** > Fill the current path
**beginPath()** > starts a line  
**closePath()** > finish parth  
**moveTo(x, y)** > start point  
**lineTo(x, y)** > draw line from previus point  
**stroke()** > set path to stroke  
**clip()** > Clip a region of any shape and size from the original canvas  

### Curves

**quadraticCurveTo()** > Creates a quadratic Bézier curve  
**bezierCurveTo()** > Creates a cubic Bézier curve  
**arc()** > Creates an arc/curve (used to create circles, or parts of circles)  
**arcTo()** > Creates an arc/curve between two tangents  
**isPointInPath()** > Returns true if the specified point is in the current path, otherwise false  

### Lines styles

**lineCap** > Set or return the style of the end caps for a line  
**lineJoin** > Set or return the type of corner created, when two lines meet  
**lineWidth** > Set or return the current line width  
**miterLimit** > Set or return the maximom miter length  

## RECTANGLES

**Rect(x, y, width, height)** > Create Rectangle  
**FillRect(x, y, width, height)** > draw filled rectangle  
**strokeRect(x, y, width, height)** > draws rectangle (only stroke)  
**clearRect(x, y, width, height)** > clears the specified pixels within a given rectangle  

## TEXT

**fillText(string, x, y)** > Draw Filled text  
**strokeText()** > Draw text on canvas "only outer line"
**measureText()** > Return an objet that contains the width of the specified string

### Text styles

**font** > Sets or returns the current font properties for text content
**textAlign** > Sets or returns the current alignment for text content
**textBaseline** > Sets or returns the current text baseline used when drawing text

## IMAGES

**drawImage()** > Draw an image, canvas, or video onto the canvas
**createImageData()** > Creates a new, blank ImageData object
**getImageData()** > Returns an ImageData object that copies the pixel data for the specified rectangle on a canvas
**putImageData()** > Puts the image data (from a specified ImageData object) back onto the canvas

## Pixel manipulation

**width** > Returns the width of an ImageData object
**height** > Returns the height of an ImageData object
**data** > Returns an object that contains image data of a specified ImageData object

## TRANSFORMATIONS

**scale()** > Scales the current drawing bigger or smaller
**rotate()** > Rotates the current drawing
**translate()** > Remaps the (0,0) position on the canvas
**transform()** > Replaces the current transformation matrix for the drawing
**setTransform()** > Resets the current transform to the identity matrix. Then runs transform()

## STYLES

**fillStyle** > set or return color, gradient, or pattern used tofill th drawing  
**strokeStyle** > set or return color, gradient, or pattern used for strokes  

## SHADOWS

**shadowColor** > set or return the color to use for shadows  
**shadowBlur** > set or return the blur leve for shadows  
**shadowOffsetX** > set or return the horizontal distance of the shadow from the shape  
**shadowOffsetY** > set or return the vertical distance of the shadow from the shape  

## GRADIENTS

**createLinearGradient(x1, y1, x2, y2)** > Creates a linear gradient (to use on canvas content)  
**createRadialGradient(x1, y1, x2, y2)** > Creates a radial/circular gradient (to use on canvas content)  return an object gradient. to use with addColorStop
**createPattern(image, repeatStyle)** > Repeats a specified element in the specified direction  valid values: repeat, repeat-x, repeat-y, and no-repeat.
**addColorStop()** > Specifies the colors and stop positions in a gradient object  

## OTHERS

**save()** > Saves the state of the current context
**restore()** > Returns previously saved path state and attributes
**createEvent()** >  
**getContext()** >  
**toDataURL()** > tranform canvas data to uri base64 image