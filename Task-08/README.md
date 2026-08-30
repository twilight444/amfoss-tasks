## Approach
The goal was to reconstruct a secret message fragmented
across 97 individual image layers.

1. **Loading Images**: 
   Iterated through all image files from `Layer 1.png` 
   to `Layer 97.png`, loading each with OpenCV and 
   converting from BGR to RGB color format.

2. **Extracting Coordinates & Colors**: 
   For each layer, identified non-white pixels 
   (`img != 255`) to find the drawn point/dot. 
   Calculated the average `(x, y)` coordinate to find 
   the exact center of the dot and extracted its RGB 
   color value. If a layer was completely blank, appended 
   `None` to mark a break in the line.

3. **Reconstructing the Image**: 
   Created a blank white 512x512 canvas using Pillow. 
   Iterated through the extracted coordinates and drew 
   connected lines between consecutive points using their 
   respective colors to get the secret message.
