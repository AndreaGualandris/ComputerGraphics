#!/bin/sh

g++ main2.cpp

x=1.0;
y=-2.0;
z=8.0;

n=60;


#generate images ppm
#move the ball up and down to create a video ./a.out $i $x $y $z
for i in $(seq 1 $n)
do
    x=$x;
    y=$(echo "$y + (5.0 / $n)" | bc -l);
    z=$z;

    ./a.out $i $x $y $z
done

n2=120;

for i in $(seq 60 $n2)
do
    x=$x;
    y=$(echo "$y - (5.0 / $n)" | bc -l);
    z=$z;

    ./a.out $i $x $y $z
done

n3=180;

for i in $(seq 120 $n3)
do
    x=$x;
    y=$(echo "$y + (5.0 / $n)" | bc -l);
    z=$z;

    ./a.out $i $x $y $z
done


for i in $(seq 1 $n3)
    do
    convert resultsppm/result$i.ppm results/result$i.png
done

ffmpeg -r 60 -i results/result%d.png -vcodec libx264 -crf 25  -pix_fmt yuv420p video.mp4
