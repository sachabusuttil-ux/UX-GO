const ColorThief = require('colorthief');
const { colord, extend } = require('colord');
const names = require('colord/plugins/names');
extend([names]);

const imgPath = process.argv[2];

if (!imgPath) {
    console.error("Please provide an image path");
    process.exit(1);
}

ColorThief.getColor(imgPath)
    .then(color => {
        const primary = colord({ r: color[0], g: color[1], b: color[2] }).toHex();
        console.log(`Dominant: ${primary}`);
        return ColorThief.getPalette(imgPath, 5);
    })
    .then(palette => {
        console.log("Palette:");
        palette.forEach(c => {
            const hex = colord({ r: c[0], g: c[1], b: c[2] }).toHex();
            console.log(hex);
        });
    })
    .catch(err => {
        console.error("Error extracting colors:", err);
    });
