// ColorPicker.jsx
import React, { useState, useRef, useEffect } from 'react';
import NavigationBar from '../NavigationBar';
import { FiHeart, FiHeart as FiHeartFilled } from "react-icons/fi";

const ColorPicker = () => {
  const [colors, setColors] = useState([]);
  const [file, setFile] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false);
  const TOOL_KEY = 'favoriteTools';

  const fileInput = useRef(null);
  const canvasRef = useRef(null);

  const getContrastColor = (hexColor) => {
    hexColor = hexColor.replace('#', '');
    const r = parseInt(hexColor.substr(0, 2), 16);
    const g = parseInt(hexColor.substr(2, 2), 16);
    const b = parseInt(hexColor.substr(4, 2), 16);
    const relativeLuminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    return relativeLuminance > 0.5 ? '#000000' : '#ffffff';
  };

  const copy = (e, text) => {
    e.target.innerText = 'Copied';
    const element = document.createElement('textarea');
    element.value = text;
    document.body.appendChild(element);
    element.select();
    document.execCommand('copy');
    document.body.removeChild(element);
    setTimeout(() => {
      e.target.innerText = text;
    }, 1000);
  };

  const drawImageOnCanvas = (file) => {
    const ctx = canvasRef.current.getContext('2d');
    const canvas = canvasRef.current;
    const img = new Image();

    img.onload = () => {
      const container = document.getElementById('container');
      const maxWidth = container.offsetWidth;
      const imageWidth = img.width;
      const imageHeight = img.height;
      const scaleFactor = maxWidth / imageWidth;
      const canvasWidth = imageWidth * scaleFactor;
      const canvasHeight = imageHeight * scaleFactor;

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      container.style.height = `${canvasHeight}px`;
      ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
      getDominantColors(ctx, canvasWidth, canvasHeight);
    };

    img.src = typeof file === 'string' ? file : URL.createObjectURL(file);
  };

  const getDominantColors = (ctx, width, height) => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const rgbArray = buildRgb(imageData.data);
    const colors = quantization(rgbArray, 0).map(rgbToHex);
    setColors(colors);
  };

  const buildRgb = (imageData) => {
    const rgbValues = [];
    for (let i = 0, j = 0; i < imageData.length; i += 4, j++) {
      rgbValues[j] = {
        r: imageData[i],
        g: imageData[i + 1],
        b: imageData[i + 2],
      };
    }
    return rgbValues;
  };

  const findBiggestColorRange = (rgbValues) => {
    let rMin = Number.MAX_VALUE;
    let gMin = Number.MAX_VALUE;
    let bMin = Number.MAX_VALUE;
    let rMax = Number.MIN_VALUE;
    let gMax = Number.MIN_VALUE;
    let bMax = Number.MIN_VALUE;

    rgbValues.forEach((pixel) => {
      rMin = Math.min(rMin, pixel.r);
      gMin = Math.min(gMin, pixel.g);
      bMin = Math.min(bMin, pixel.b);
      rMax = Math.max(rMax, pixel.r);
      gMax = Math.max(gMax, pixel.g);
      bMax = Math.max(bMax, pixel.b);
    });

    const rRange = rMax - rMin;
    const gRange = gMax - gMin;
    const bRange = bMax - bMin;

    if (rRange >= gRange && rRange >= bRange) {
      return 'r';
    } else if (gRange >= rRange && gRange >= bRange) {
      return 'g';
    } else {
      return 'b';
    }
  };

  const quantization = (rgbValues, depth) => {
    const MAX_DEPTH = 2;
    if (depth === MAX_DEPTH || rgbValues.length === 0) {
      const color = rgbValues.reduce(
        (prev, curr) => {
          prev.r += curr.r;
          prev.g += curr.g;
          prev.b += curr.b;
          return prev;
        },
        { r: 0, g: 0, b: 0 }
      );
      const count = rgbValues.length || 1;
      color.r = Math.round(color.r / count);
      color.g = Math.round(color.g / count);
      color.b = Math.round(color.b / count);
      return [color];
    }

    const componentToSortBy = findBiggestColorRange(rgbValues);
    rgbValues.sort((p1, p2) => p1[componentToSortBy] - p2[componentToSortBy]);
    const mid = Math.floor(rgbValues.length / 2);
    return [
      ...quantization(rgbValues.slice(0, mid), depth + 1),
      ...quantization(rgbValues.slice(mid), depth + 1),
    ];
  };

  const rgbToHex = (rgb) => {
    const rHex = rgb.r.toString(16).padStart(2, '0');
    const gHex = rgb.g.toString(16).padStart(2, '0');
    const bHex = rgb.b.toString(16).padStart(2, '0');
    return `#${rHex}${gHex}${bHex}`;
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFile(file);
    drawImageOnCanvas(file);
  };

  const toggleFavourite = () => {
    let storedFavorites = JSON.parse(localStorage.getItem(TOOL_KEY)) || [];

    if (isFavourite) {
      storedFavorites = storedFavorites.filter((tool) => tool !== 'Color Picker');
    } else {
      storedFavorites.push('Color Picker');
    }

    localStorage.setItem(TOOL_KEY, JSON.stringify(storedFavorites));
    setIsFavourite(!isFavourite);
  };

  useEffect(() => {
    drawImageOnCanvas('/quino-al-J1_1YigSUPA-unsplash.jpg');
    const storedFavorites = JSON.parse(localStorage.getItem(TOOL_KEY)) || [];
      setIsFavourite(storedFavorites.includes('Color Picker'));
  }, []);

  return (
    <div className="bg-[#10002b] min-h-screen text-[#f7ebff]" >
        <NavigationBar/>

        {/* Title Section */}
        <section className="pt-40 max-w-6xl mx-auto bg-[#10002b]">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold mb-6 text-[#c3b1ff]">
                Image Color Picker
                </h1>
                <button onClick={toggleFavourite} className="text-2xl hover:scale-110 transition-transform">
                            {isFavourite ? (
                            <FiHeartFilled fill="#ff4d4d" stroke="#ff4d4d" />
                            ) : (
                            <FiHeart stroke="#ffffff" fill="none" />
                            )}
                </button>
                  
            </div>
            <p className="text-sm md:text-base leading-relaxed">
            The Image Color Picker is a simple and efficient tool that allows you to extract color information from an image with ease. By uploading an image, you can select specific points on the image to identify the colors you need. The tool provides the corresponding color codes in formats like HEX, RGB, and HSL, making it easy to integrate these colors into your projects. This tool streamlines the color selection process, saving you time and effort compared to manually picking colors or using external software. It's a perfect solution for developers, designers, and anyone who needs accurate color matching for their projects, ensuring consistency in the color schemes and visual designs.            
            </p>
        </section>

        <section className="bg-[#10002b] pt-5 ">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:px-12">
            <div className="card items-center mx-auto max-w-screen-xl lg:grid lg:grid-cols-12 overflow-hidden rounded-lg border border-[#c3b1ff] p-5">
            <div className="p-8 col-span-5 flex h-full flex-col justify-between">
                <div>
                <label className="mb-1 text-[#f7ebff]">Palette</label>
                <div className="flex">
                    <div className="palette flex w-full h-10 rounded-lg overflow-hidden">
                    {colors.map((color, index) => (
                        <div
                        key={index}
                        onClick={(e) => copy(e, color)}
                        className="cursor-pointer relative flex flex-grow items-center justify-center"
                        style={{
                            color: getContrastColor(color),
                            background: color,
                        }}
                        >
                        {color}
                        </div>
                    ))}
                    </div>
                </div>
                </div>

                <button
                onClick={() => fileInput.current.click()}
                type="button"
                className="text-white bg-[#00c8a0] hover:bg-[#00b393] focus:ring-4 focus:ring-[#00b393] font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                >
                Browse image
                </button>
                <input
                type="file"
                className="hidden"
                accept="image/*"
                ref={fileInput}
                onChange={handleFileUpload}
                />
            </div>
            <div className="p-8 h-full flex rounded-lg relative justify-center items-center col-span-7 bg-[#3a2f59]">
                <div className="canvas-container w-full" id="container">
                <canvas ref={canvasRef} className="canvas" />
                </div>
            </div>
            </div>
        </div>
        </section>
    </div>
  );
};

export default ColorPicker;
