const { encode } = require('blurhash');
const { createCanvas, Image } = require('canvas');

const loadImage = async src =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (...args) => reject(args);
    img.src = src;
  });

const getImageData = image => {
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);
  return ctx.getImageData(0, 0, image.width, image.height);
};

exports.handler = async (event) => {
    const imageUrl = event.data.imageUrl;
    const image = await loadImage(imageUrl);
    const imageData = getImageData(image);
    
    const blurHash = encode(imageData.data, imageData.width, imageData.height, 4, 4);
    
    return {
        statusCode: 200,
        body: JSON.stringify({blurHash}),
    };
};
