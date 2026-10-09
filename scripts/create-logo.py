from PIL import Image, ImageDraw, ImageFilter, ImageChops
from pathlib import Path
import random
random.seed(42)
glyphs={
'A':['01110','11011','11011','11111','11011','11011','11011'],
'D':['11110','11011','11011','11011','11011','11011','11110'],
'R':['11110','11011','11011','11110','11100','11010','11011'],
'I':['11111','01110','01110','01110','01110','01110','11111'],
'N':['11011','11011','11111','11111','11111','11011','11011'],
'W':['11011','11011','11011','11111','11111','11111','01010'],
'E':['11111','11000','11000','11110','11000','11000','11111'],
'Z':['11111','00011','00111','01110','11100','11000','11111'],
'P':['11110','11011','11011','11110','11000','11000','11000'],
'O':['01110','11011','11011','11011','11011','11011','01110'],
'T':['11111','01110','01110','01110','01110','01110','01110'],
'F':['11111','11000','11000','11110','11000','11000','11000'],
'L':['11000','11000','11000','11000','11000','11000','11111'],
}
W,H=960,210
out=Image.new('RGBA',(W,H))
def word(text,x,y,sx,sy,depth):
 mask=Image.new('L',(W,H));d=ImageDraw.Draw(mask);cx=x
 for char in text:
  if char==' ':cx+=sx*3;continue
  for j,row in enumerate(glyphs[char]):
   for i,v in enumerate(row):
    if v=='1':d.rectangle((cx+i*sx,y+j*sy,cx+(i+1)*sx-1,y+(j+1)*sy-1),fill=255)
  cx+=6*sx
 outline=mask.filter(ImageFilter.MaxFilter(9));
 for i in range(depth,-1,-1):
  shifted=ImageChops.offset(outline,-i//4,i)
  out.paste((12,12,12,255),(0,0),shifted)
 for i in range(depth-3,1,-1):out.paste((65+i//3,63+i//3,61+i//3,255),(0,0),ImageChops.offset(mask,-i//4,i))
 face=Image.new('RGBA',(W,H),(188,184,179,255));fd=ImageDraw.Draw(face)
 for j in range(y,y+7*sy,4):
  for i in range(x,cx,4):
   if random.random()<.15:
    c=random.choice([145,158,168,200,210]);fd.rectangle((i,j,i+random.choice([3,7,11]),j+3),fill=(c,c-3,c-5,255))
 out.paste(face,(0,0),mask)
 edge=ImageChops.subtract(mask,ImageChops.offset(mask,2,2));out.paste((226,222,215,255),(0,0),edge)
 edge=ImageChops.subtract(mask,ImageChops.offset(mask,-2,-2));out.paste((118,113,108,255),(0,0),edge)
word('ADRIAN WENZEN',34,12,12,14,25)
word('PORTFOLIO',263,142,8,7,14)
out.save('public/logo.png')
print('Created personal logo',out.size)
