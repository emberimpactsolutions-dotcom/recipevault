import Tesseract from "tesseract.js";

async function prepareImage(file) {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const scale = 3;

      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      ctx.drawImage(
        img,
        0,
        0,
        canvas.width,
        canvas.height
      );

      resolve(canvas);
    };

    img.src = URL.createObjectURL(file);
  });
}

export async function extractText(file) {
  const canvas = await prepareImage(file);

  const result = await Tesseract.recognize(
    canvas,
    "eng",
    {
      logger: (m) => console.log(m),
    }
  );

  return result.data.text;
}