TYPE=png
dir=samples/test
PRE=fxgif
scale=1046

# ffmpeg -f image2 -framerate 5 -i $dir/$PRE%02d.$TYPE -y -s ${scale}x${scale} $dir/$PRE-5.gif
# ffmpeg -f image2 -framerate 2 -i $dir/$PRE%02d.$TYPE -y -s ${scale}x${scale} $dir/$PRE-2.gif
# ffmpeg -f image2 -framerate 3 -i $dir/$PRE%02d.$TYPE -y -s ${scale}x${scale} $dir/$PRE-3.gif
# ffmpeg -f image2 -framerate 10 -i $dir/$PRE%02d.$TYPE -y -s ${scale}x${scale} $dir/$PRE-10.gif
# ffmpeg -f image2 -framerate 16 -i $dir/$PRE%02d.$TYPE -y -s ${scale}x${scale} $dir/$PRE-16.gif
ffmpeg -f image2 -framerate 24 -i $dir/$PRE%02d.$TYPE -y $dir/$PRE-24.gif
ffmpeg -f image2 -framerate 20 -i $dir/$PRE%02d.$TYPE -y $dir/$PRE-20.gif
ffmpeg -f image2 -framerate 30 -i $dir/$PRE%02d.$TYPE -y -s 350x350 $dir/$PRE-30.gif
ffmpeg -f image2 -framerate 60 -i $dir/$PRE%02d.$TYPE -y -s 350x350 $dir/$PRE-60.gif