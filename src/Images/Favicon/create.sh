#!/bin/bash
set -e

if [[ $(which convert) == "" ]]; then
    echo "ERROR: ImageMagick not installed"
    exit 1
fi

# make script callable from anywhere, see: https://stackoverflow.com/a/9107028
ABSOLUTE_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PUBLIC_FOLDER=${ABSOLUTE_PATH}/../../../public

# see: http://www.imagemagick.org/Usage/thumbnails/#favicon
convert -density 512 ${ABSOLUTE_PATH}/notes.svg \
    \( -clone 0 -resize 64x64 -gravity center -extent 64x64 \) \
    \( -clone 0 -resize 48x48 -gravity center -extent 48x48 \) \
    \( -clone 0 -resize 32x32 -gravity center -extent 32x32 \) \
    \( -clone 0 -resize 16x16 -gravity center -extent 16x16 \) \
    -delete 0 -alpha off -colors 256 ${PUBLIC_FOLDER}/favicon.ico

for res in 192 512; do
    convert -density $((8 * res)) ${ABSOLUTE_PATH}/notes.svg -resize ${res}x${res} -gravity center -extent ${res}x${res} ${PUBLIC_FOLDER}/logo${res}.png
done
