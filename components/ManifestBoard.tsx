/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ManifestCanvas, ManifestImage, ManifestText } from '../types/manifest';

interface ManifestBoardProps {
  onClose: () => void;
}

const MAX_IMAGES = 20;

const ManifestBoard: React.FC<ManifestBoardProps> = ({ onClose }) => {
  const [canvas, setCanvas] = useState<ManifestCanvas>({
    id: Date.now().toString(),
    name: 'Untitled Canvas',
    images: [],
    texts: [],
    backgroundColor: '#1f2937',
    width: 1200,
    height: 800,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [tool, setTool] = useState<'select' | 'text' | 'image'>('select');
  const [textInput, setTextInput] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddImage = useCallback((file: File) => {
    if (canvas.images.length >= MAX_IMAGES) {
      alert(`Maximum ${MAX_IMAGES} images allowed`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const newImage: ManifestImage = {
        id: Date.now().toString(),
        src: e.target?.result as string,
        x: 100,
        y: 100,
        width: 200,
        height: 200,
        rotation: 0,
        zIndex: canvas.images.length + canvas.texts.length,
      };
      setCanvas(prev => ({
        ...prev,
        images: [...prev.images, newImage],
        updatedAt: Date.now(),
      }));
    };
    reader.readAsDataURL(file);
  }, [canvas.images.length, canvas.texts.length]);

  const handleAddText = useCallback(() => {
    if (!textInput.trim()) return;

    const newText: ManifestText = {
      id: Date.now().toString(),
      text: textInput,
      x: 100,
      y: 100,
      fontSize: 24,
      color: '#ffffff',
      fontWeight: 'normal',
      rotation: 0,
      zIndex: canvas.images.length + canvas.texts.length,
    };
    setCanvas(prev => ({
      ...prev,
      texts: [...prev.texts, newText],
      updatedAt: Date.now(),
    }));
    setTextInput('');
    setTool('select');
  }, [textInput, canvas.images.length, canvas.texts.length]);

  const handleDeleteElement = useCallback(() => {
    if (!selectedElement) return;

    setCanvas(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== selectedElement),
      texts: prev.texts.filter(txt => txt.id !== selectedElement),
      updatedAt: Date.now(),
    }));
    setSelectedElement(null);
  }, [selectedElement]);

  const handleSaveCanvas = useCallback(() => {
    const savedCanvases = JSON.parse(localStorage.getItem('editpix_canvases') || '[]');
    const existingIndex = savedCanvases.findIndex((c: ManifestCanvas) => c.id === canvas.id);
    
    if (existingIndex >= 0) {
      savedCanvases[existingIndex] = canvas;
    } else {
      savedCanvases.push(canvas);
    }
    
    localStorage.setItem('editpix_canvases', JSON.stringify(savedCanvases));
    alert('Canvas saved successfully!');
    setShowSaveModal(false);
  }, [canvas]);

  const handleLoadCanvas = useCallback((loadedCanvas: ManifestCanvas) => {
    setCanvas(loadedCanvas);
    setShowLoadModal(false);
    setSelectedElement(null);
  }, []);

  const handleExportCanvas = useCallback(async () => {
    if (!canvasRef.current) return;

    // Create a temporary canvas for export
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height;
    const ctx = exportCanvas.getContext('2d');
    if (!ctx) return;

    // Draw background
    ctx.fillStyle = canvas.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw all elements in z-index order
    const allElements = [
      ...canvas.images.map(img => ({ ...img, type: 'image' as const })),
      ...canvas.texts.map(txt => ({ ...txt, type: 'text' as const })),
    ].sort((a, b) => a.zIndex - b.zIndex);

    for (const element of allElements) {
      if (element.type === 'image') {
        const img = new Image();
        img.src = element.src;
        await new Promise((resolve) => {
          img.onload = () => {
            ctx.save();
            ctx.translate(element.x + element.width / 2, element.y + element.height / 2);
            ctx.rotate((element.rotation * Math.PI) / 180);
            ctx.drawImage(img, -element.width / 2, -element.height / 2, element.width, element.height);
            ctx.restore();
            resolve(null);
          };
        });
      } else {
        ctx.save();
        ctx.translate(element.x, element.y);
        ctx.rotate((element.rotation * Math.PI) / 180);
        ctx.font = `${element.fontWeight} ${element.fontSize}px Arial`;
        ctx.fillStyle = element.color;
        ctx.fillText(element.text, 0, 0);
        ctx.restore();
      }
    }

    // Export as image
    const dataURL = exportCanvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `${canvas.name.replace(/\s+/g, '_')}.png`;
    link.href = dataURL;
    link.click();
  }, [canvas]);

  const getSavedCanvases = (): ManifestCanvas[] => {
    return JSON.parse(localStorage.getItem('editpix_canvases') || '[]');
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-700 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-white">Manifest Board</h2>
          <input
            type="text"
            value={canvas.name}
            onChange={(e) => setCanvas(prev => ({ ...prev, name: e.target.value }))}
            className="bg-gray-800 border border-gray-700 text-white px-3 py-1 rounded text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowLoadModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium"
          >
            Load
          </button>
          <button
            onClick={handleSaveCanvas}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium"
          >
            Save
          </button>
          <button
            onClick={handleExportCanvas}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm font-medium"
          >
            Export
          </button>
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium"
          >
            Close
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-gray-800 border-b border-gray-700 p-3 flex items-center gap-3">
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={canvas.images.length >= MAX_IMAGES}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Image ({canvas.images.length}/{MAX_IMAGES})
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && handleAddImage(e.target.files[0])}
          className="hidden"
        />
        
        <button
          onClick={() => setTool('text')}
          className={`px-4 py-2 rounded text-sm font-medium ${
            tool === 'text' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Add Text
        </button>

        {tool === 'text' && (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddText()}
              placeholder="Enter text..."
              className="bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded text-sm"
            />
            <button
              onClick={handleAddText}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium"
            >
              Add
            </button>
          </div>
        )}

        {selectedElement && (
          <button
            onClick={handleDeleteElement}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium ml-auto"
          >
            Delete Selected
          </button>
        )}
      </div>

      {/* Canvas Area */}
      <div className="flex-1 overflow-auto p-8 flex items-center justify-center">
        <div
          ref={canvasRef}
          className="relative border-2 border-gray-600 shadow-2xl"
          style={{
            width: `${canvas.width}px`,
            height: `${canvas.height}px`,
            backgroundColor: canvas.backgroundColor,
          }}
        >
          {/* Render Images */}
          {canvas.images.map((img) => (
            <div
              key={img.id}
              onClick={() => setSelectedElement(img.id)}
              className={`absolute cursor-move ${
                selectedElement === img.id ? 'ring-2 ring-blue-500' : ''
              }`}
              style={{
                left: `${img.x}px`,
                top: `${img.y}px`,
                width: `${img.width}px`,
                height: `${img.height}px`,
                transform: `rotate(${img.rotation}deg)`,
                zIndex: img.zIndex,
              }}
            >
              <img src={img.src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}

          {/* Render Texts */}
          {canvas.texts.map((txt) => (
            <div
              key={txt.id}
              onClick={() => setSelectedElement(txt.id)}
              className={`absolute cursor-move ${
                selectedElement === txt.id ? 'ring-2 ring-blue-500' : ''
              }`}
              style={{
                left: `${txt.x}px`,
                top: `${txt.y}px`,
                fontSize: `${txt.fontSize}px`,
                color: txt.color,
                fontWeight: txt.fontWeight,
                transform: `rotate(${txt.rotation}deg)`,
                zIndex: txt.zIndex,
              }}
            >
              {txt.text}
            </div>
          ))}
        </div>
      </div>

      {/* Load Modal */}
      {showLoadModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-auto">
            <h3 className="text-xl font-bold text-white mb-4">Load Canvas</h3>
            <div className="space-y-2">
              {getSavedCanvases().map((savedCanvas) => (
                <button
                  key={savedCanvas.id}
                  onClick={() => handleLoadCanvas(savedCanvas)}
                  className="w-full text-left bg-gray-700 hover:bg-gray-600 text-white p-4 rounded"
                >
                  <div className="font-semibold">{savedCanvas.name}</div>
                  <div className="text-sm text-gray-400">
                    {savedCanvas.images.length} images, {savedCanvas.texts.length} texts
                  </div>
                  <div className="text-xs text-gray-500">
                    Updated: {new Date(savedCanvas.updatedAt).toLocaleString()}
                  </div>
                </button>
              ))}
              {getSavedCanvases().length === 0 && (
                <p className="text-gray-400 text-center py-8">No saved canvases</p>
              )}
            </div>
            <button
              onClick={() => setShowLoadModal(false)}
              className="mt-4 bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManifestBoard;
