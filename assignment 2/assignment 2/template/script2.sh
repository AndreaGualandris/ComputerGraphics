#!/bin/sh

#convert all images result${}.ppm to a result${}.png file



for i in $(seq 1 3600)
    do
    convert resultsppm/result$i.ppm results/result$i.png
done

#create a video with ffmpeg with all images results/result$i.png

#ffmpeg -r 30 -i results/result%d.png -vcodec libx264 -crf 25  -pix_fmt yuv420p 3lights.mp4