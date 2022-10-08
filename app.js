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


  var lastBuffer;
  var img = document.getElementById("streamImage");

  // message
  setInterval(async function() {
    var bufferImage = await getPixelData();
    if (bufferImage.byteLength != 0 && lastBuffer != bufferImage) {
      lastBuffer = bufferImage;
      var blob = new Blob([bufferImage], { type: "image/jpeg" });

      var domURL = self.URL || self.webkitURL || self,
        url = domURL.createObjectURL(blob)

      img.onload = function() {
        domURL.revokeObjectURL(url); // clean up
      };
      img.src = url;
    }
  }, /*Delay in milliseconds*/ 150);
});