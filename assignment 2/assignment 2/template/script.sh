#!/bin/sh

g++ main2.cpp


x=0.0;
y=26.0;
z=5.0;

x2=0.0;
y2=1.0;
z2=12.0;

x3=0.0;
y3=5.0;
z3=1.0;

n=120;

#generate images ppm
for i in $(seq 1 $n)
do
    x=$(echo "scale=10; $x * c(2*3.14159265358979323846/$n) - $y * s(2*3.14159265358979323846/$n)" | bc -l)
    y=$(echo "scale=10; $x * s(2*3.14159265358979323846/$n) + $y * c(2*3.14159265358979323846/$n)" | bc -l)
    z=$z;

    x2=$(echo "scale=10; $x2 * c(2*3.14159265358979323846/$n) - $y2 * s(2*3.14159265358979323846/$n)" | bc -l)
    y2=$(echo "scale=10; $x2 * s(2*3.14159265358979323846/$n) + $y2 * c(2*3.14159265358979323846/$n)" | bc -l)
    z2=$z2;

    x3=$(echo "scale=10; $x3 * c(2*3.14159265358979323846/$n) - $y3 * s(2*3.14159265358979323846/$n)" | bc -l)
    y3=$(echo "scale=10; $x3 * s(2*3.14159265358979323846/$n) + $y3 * c(2*3.14159265358979323846/$n)" | bc -l)
    z3=$z3;

    ./a.out $i $x $y $z $x2 $y2 $z2 $x3 $y3 $z3
done


#convert all images result${}.ppm to a result${}.png file
for i in $(seq 1 $n)
    do
    convert resultsppm/result$i.ppm results/result$i.png
done

#convert pngs images to a video
ffmpeg -r 60 -i results/result%d.png -vcodec libx264 -crf 25  -pix_fmt yuv420p video2sec.mp4

#convert pngs images to a video 60 fps
#ffmpeg -r 60 -i results/result%d.png -vcodec libx264 -crf 25  -pix_fmt yuv420p 3lights2min60fps.mp4

