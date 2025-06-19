import { useState, useEffect } from 'react';
import PixelButton from './PixelButton';

interface PixelArtGameProps {
  className?: string;
}

type ColorPalette = {
  name: string;
  colors: string[];
};

const PixelArtGame: React.FC<PixelArtGameProps> = ({ className = '' }) => {
  const [gridSize, setGridSize] = useState(12);
  const [selectedColor, setSelectedColor] = useState('#8B5CF6'); // Default purple
  const [grid, setGrid] = useState<string[][]>([]);
  const [isErasing, setIsErasing] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPalette, setCurrentPalette] = useState(0);

  // Color palettes
  const palettes: ColorPalette[] = [
    {
      name: 'Retro',
      colors: ['#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#FFFFFF', '#000000']
    },
    {
      name: 'Pastel',
      colors: ['#C084FC', '#F9A8D4', '#86EFAC', '#FCD34D', '#FCA5A5', '#93C5FD', '#FFFFFF', '#000000']
    },
    {
      name: 'Neon',
      colors: ['#7C3AED', '#EC4899', '#059669', '#D97706', '#DC2626', '#2563EB', '#FFFFFF', '#000000']
    }
  ];

  // Initialize grid
  useEffect(() => {
    initializeGrid();
    // Set CSS variable for grid size
    document.documentElement.style.setProperty('--grid-size', gridSize.toString());
  }, [gridSize]);

  const initializeGrid = () => {
    const newGrid = Array(gridSize).fill(null).map(() => 
      Array(gridSize).fill('transparent')
    );
    setGrid(newGrid);
  };

  const handlePixelClick = (rowIndex: number, colIndex: number) => {
    const newGrid = [...grid];
    newGrid[rowIndex][colIndex] = isErasing ? 'transparent' : selectedColor;
    setGrid(newGrid);
  };

  const handlePixelMouseOver = (rowIndex: number, colIndex: number) => {
    if (isDrawing) {
      handlePixelClick(rowIndex, colIndex);
    }
  };

  const handleMouseDown = () => {
    setIsDrawing(true);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    initializeGrid();
  };

  const changePalette = () => {
    setCurrentPalette((prev) => (prev + 1) % palettes.length);
  };

  const handleSizeChange = (newSize: number) => {
    if (newSize >= 8 && newSize <= 16) {
      setGridSize(newSize);
    }
  };

  // Export as PNG
  const exportAsPNG = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const pixelSize = 20;
    
    canvas.width = gridSize * pixelSize;
    canvas.height = gridSize * pixelSize;
    
    if (ctx) {
      // Fill background
      ctx.fillStyle = '#222222';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw pixels
      for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
          if (grid[row][col] !== 'transparent') {
            ctx.fillStyle = grid[row][col];
            ctx.fillRect(col * pixelSize, row * pixelSize, pixelSize, pixelSize);
          }
        }
      }
      
      // Create download link
      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'my-pixel-art.png';
      link.href = dataURL;
      link.click();
    }
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <h3 className="font-pixel text-xl text-center mb-4 text-retro-white">
        <span className="text-pink-400">PIXEL</span> 
        <span className="text-cyan-300">ART</span> 
        <span className="text-yellow-300">CREATOR</span>
      </h3>
      
      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {palettes[currentPalette].colors.map((color, index) => (
          <button
            key={index}
            className={`w-8 h-8 rounded-sm color-button ${selectedColor === color ? 'ring-2 ring-white' : ''}`}
            data-color={color}
            onClick={() => setSelectedColor(color)}
            aria-label={`Select color ${color}`}
          />
        ))}
        
        <button
          className={`w-8 h-8 rounded-sm flex items-center justify-center bg-gray-800 ${isErasing ? 'ring-2 ring-white' : ''}`}
          onClick={() => setIsErasing(!isErasing)}
          aria-label="Toggle eraser"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 20H9L4 15L15 4L21 10L20 20Z" />
          </svg>
        </button>
      </div>
      
      <div className="game-container pixel-corners mb-4">
        <div 
          className="game-grid"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {grid.map((row, rowIndex) => (
            row.map((color, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`game-pixel pixel-color-${color === 'transparent' ? 'transparent' : 'filled'}`}
                data-pixel-color={color}
                onClick={() => handlePixelClick(rowIndex, colIndex)}
                onMouseOver={() => handlePixelMouseOver(rowIndex, colIndex)}
                onTouchMove={(e) => {
                  // Handle touch for mobile devices
                  e.preventDefault();
                  const touch = e.touches[0];
                  const element = document.elementFromPoint(touch.clientX, touch.clientY);
                  if (element?.classList.contains('game-pixel')) {
                    const pixelCoords = element.getAttribute('data-coords');
                    if (pixelCoords) {
                      const [row, col] = pixelCoords.split('-').map(Number);
                      handlePixelClick(row, col);
                    }
                  }
                }}
                data-coords={`${rowIndex}-${colIndex}`}
              />
            ))
          ))}
        </div>
      </div>
      
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        <PixelButton size="sm" onClick={handleClear} variant="secondary">
          Clear
        </PixelButton>
        <PixelButton size="sm" onClick={changePalette}>
          Change Palette
        </PixelButton>
        <PixelButton size="sm" onClick={exportAsPNG} variant="accent">
          Export PNG
        </PixelButton>
      </div>
      
      <div className="flex justify-center gap-2">
        <PixelButton 
          size="sm" 
          onClick={() => handleSizeChange(gridSize - 1)}
          disabled={gridSize <= 8}
          variant="secondary"
        >
          -
        </PixelButton>
        <span className="font-pixel text-sm text-retro-white px-2">{gridSize}x{gridSize}</span>
        <PixelButton 
          size="sm" 
          onClick={() => handleSizeChange(gridSize + 1)}
          disabled={gridSize >= 16}
          variant="secondary"
        >
          +
        </PixelButton>
      </div>
      
      <p className="text-xs text-retro-lightgray mt-4 text-center max-w-md">
        Click or drag to draw. Use the eraser to remove pixels. 
        Create your own pixel art and export it as a PNG!
      </p>
    </div>
  );
};

export default PixelArtGame;
