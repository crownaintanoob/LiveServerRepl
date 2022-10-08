$(document).ready(function() {
  async function getPixelData() {
    try {
      const response = await fetch("/getstreamdata", {
        method: "GET",
      });

      const pixelDataResult = await response.arrayBuffer();
      return pixelDataResult
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  function isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  var img = new Image(1080, 1080);
  var lastBuffer;
  document.body.appendChild(img);

  // message
  setInterval(async function() {
    var bufferImage = await getPixelData();
    if (bufferImage.byteLength != 0 && lastBuffer != bufferImage) {
      lastBuffer = bufferImage;
      var blob = new Blob([bufferImage], { type: "image/png" });

      var domURL = self.URL || self.webkitURL || self,
        url = domURL.createObjectURL(blob)

      img.onload = function() {
        domURL.revokeObjectURL(url); // clean up
      };
      img.src = url;
    }
  }, /*Delay in milliseconds*/ 200);
});