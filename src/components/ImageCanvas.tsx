import React, { useRef, useEffect, useState } from "react";
import ImageEx from "../../public/a2cbec1124234a6d846f908ba9531a2e-1.jpg";
interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ImageViewerProps {
  imageUrl?: string;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ imageUrl = ImageEx.src }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [zoomLevel, setZoomLevel] = useState<string>("fit");
  const [boundingBoxes, setBoundingBoxes] = useState<BoundingBox[]>([{ x: 110, y: 483, width: 173, height: 16 }]);
  const [panStart, setPanStart] = useState<{ x: number; y: number } | null>(null);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        setCtx(context);
      }
    }
  }, []);

  useEffect(() => {
    if (ctx) {
      const img = new Image();
      img.onload = () => {
        setImage(img);
        fitImageToCanvas(img);
      };
      img.src = imageUrl;
    }
  }, [ctx, imageUrl]);

  const fitImageToCanvas = (img: HTMLImageElement) => {
    if (ctx) {
      const canvas = canvasRef.current;
      if (canvas) {
        const parent = canvas.parentElement;
        if (parent) {
          canvas.width = parent.clientWidth;
          canvas.height = parent.clientHeight;
        }
        const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
        const offsetX = (canvas.width - img.width * scale) / 2;
        const offsetY = (canvas.height - img.height * scale) / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX + panOffset.x, offsetY + panOffset.y, img.width * scale, img.height * scale);
        // Render bounding boxes
        boundingBoxes.forEach((box) => {
          ctx.strokeStyle = "red";
          ctx.lineWidth = 2;
          ctx.strokeRect(
            box.x * scale + offsetX + panOffset.x,
            box.y * scale + offsetY + panOffset.y,
            box.width * scale,
            box.height * scale
          );
        });
      }
    }
  };

  const updateImage = (img: HTMLImageElement, zoom: number) => {
    const canvas = canvasRef.current;
    if (image && ctx && canvas) {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.translate(centerX, centerY);
      const scale = zoom;
      const offsetX = (canvas.width - img.width * scale) / 2;
      const offsetY = (canvas.height - img.height * scale) / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, offsetX + panOffset.x, offsetY + panOffset.y, img.width * scale, img.height * scale);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      // Render bounding boxes
      boundingBoxes.forEach((box) => {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(
          box.x * zoom + offsetX + panOffset.x,
          box.y * zoom + offsetY + panOffset.y,
          box.width * zoom,
          box.height * zoom
        );
      });
    }
  };

  const handleZoomChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPanOffset({ x: 0, y: 0 });
    setZoomLevel(event.target.value);
    if (image && ctx) {
      if (event.target.value === "fit") {
        fitImageToCanvas(image);
      } else {
        const zoom = parseFloat(event.target.value);
        //updateImage(image, zoom);
        const canvas = canvasRef.current;
        if (canvas) {
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.translate(centerX, centerY);
          const scale = zoom;
          const offsetX = (canvas.width - image.width * scale) / 2;
          const offsetY = (canvas.height - image.height * scale) / 2;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(image, offsetX + panOffset.x, offsetY + panOffset.y, image.width * scale, image.height * scale);
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          // Render bounding boxes
          boundingBoxes.forEach((box) => {
            ctx.strokeStyle = "red";
            ctx.lineWidth = 2;
            ctx.strokeRect(
              box.x * zoom + offsetX + panOffset.x,
              box.y * zoom + offsetY + panOffset.y,
              box.width * zoom,
              box.height * zoom
            );
          });
        }
      }
    }
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    setPanStart({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (panStart && ctx) {
      const deltaX = event.clientX - panStart.x;
      const deltaY = event.clientY - panStart.y;
      setPanOffset((prevOffset) => ({ x: prevOffset.x + deltaX, y: prevOffset.y + deltaY }));
      if (zoomLevel === "fit") {
        fitImageToCanvas(image!);
      } else {
        const zoom = parseFloat(zoomLevel);
        updateImage(image!, zoom);
      }
      setPanStart({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseUp = () => {
    setPanStart(null);
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div className="absolute z-10">
        <label htmlFor="zoom">Zoom:</label>
        <select id="zoom" value={zoomLevel.toString()} onChange={handleZoomChange}>
          <option value="0.75">75%</option>
          <option value="1">100%</option>
          <option value="fit">Fit Content</option>
        </select>
      </div>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      ></canvas>
    </div>
  );
};

export default ImageViewer;
