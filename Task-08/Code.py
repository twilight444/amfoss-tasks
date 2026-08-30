import os
import cv2
import numpy as np
from PIL import Image, ImageDraw
folder_path = r"D:\Amfoss\Operation-Pixel-Merge\assets"

images = []
for i in range(1, 98):
    path = f"{folder_path}\\Layer {i}.png"
    if os.path.exists(path):
        img_bgr = cv2.imread(path)
        img = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)
        images.append(img)

dot_data = []
for img in images:
    non_white =np.any(img != 255, axis=-1)
    crdnts = np.argwhere(non_white)
    if len(crdnts) == 0 :
        dot_data.append((None, None))
    else :
        avg_y,avg_x = np.mean(crdnts, axis=0)
        x = int(round (avg_x))
        y = int(round (avg_y))
        r, g, b = img[y, x]
        color = (int(r), int(g), int(b))
        dot_data.append(((x, y), color))

canvas = Image.new("RGB", (512, 512), (255, 255, 255))
draw = ImageDraw.Draw(canvas)

prev_pt = None
for point, color in dot_data:
    if point == None :
        prev_pt = None
    else:
        if prev_pt != None :
            draw.line([prev_pt, point], fill=color, width=3)
        prev_pt = point

canvas.show()
