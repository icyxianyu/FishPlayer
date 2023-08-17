export const createImage = (video: HTMLVideoElement) => {
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d")!.drawImage(video, 0, 0, canvas.width, canvas.height);
  try {
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob || new Blob());
      const a = document.createElement("a");
      a.href = url;
      a.download = "screenshot.png";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, "image/png");
  } catch (e) {
    console.log(e);
  }
};
