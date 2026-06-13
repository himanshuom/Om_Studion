import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Upload, Sliders, Image as ImageIcon, Download, Wand2, RefreshCw, Send } from 'lucide-react';

const colorFilters = [
  { id: 'raw', name: 'Raw Sensor', class: '' },
  { id: 'bw', name: 'Classic B&W', filter: 'grayscale(100%)' },
  { id: 'sepia', name: 'Vintage Sepia', filter: 'sepia(80%)' },
  { id: 'cool', name: 'Cool Cyan', filter: 'hue-rotate(30deg) saturate(95%) contrast(105%)' },
  { id: 'warm', name: 'Golden Hour', filter: 'sepia(25%) saturate(125%) brightness(105%)' },
  { id: 'emerald', name: 'Forest Film', filter: 'hue-rotate(-20deg) saturate(90%) contrast(110%) brightness(95%)' },
];

export default function AiEnhancer() {
  const [imageSrc, setImageSrc] = useState('/images/portrait_fashion.jpg');
  const [isBgRemoved, setIsBgRemoved] = useState(false);
  const [tolerance, setTolerance] = useState(30);
  const [smoothness, setSmoothness] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('raw');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingText, setProcessingText] = useState('');

  // Enhanced customizer states
  const [targetColor, setTargetColor] = useState(null); // { r, g, b }
  const [showOriginal, setShowOriginal] = useState(false);
  const [mockupType, setMockupType] = useState('none'); // 'none', 'mug', 'tshirt', 'frame'

  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  // Reload or re-render canvas when image source or options change
  useEffect(() => {
    processImage();
  }, [imageSrc, isBgRemoved, tolerance, targetColor, showOriginal]);

  const processImage = () => {
    setIsProcessing(true);
    setProcessingText('Loading photo engine...');

    const img = new Image();
    img.src = imageSrc;
    
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        setIsProcessing(false);
        return;
      }
      
      const ctx = canvas.getContext('2d');
      canvas.width = img.naturalWidth || img.width || 600;
      canvas.height = img.naturalHeight || img.height || 800;
      
      // Draw original image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Apply background removal (chroma keying) if active and not showing original
      if (isBgRemoved && !showOriginal) {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        let targetR, targetG, targetB;
        if (targetColor) {
          targetR = targetColor.r;
          targetG = targetColor.g;
          targetB = targetColor.b;
        } else {
          // Default: sample from top-left (10, 10)
          const sampleX = Math.min(10, canvas.width - 1);
          const sampleY = Math.min(10, canvas.height - 1);
          const sampleIndex = (sampleY * canvas.width + sampleX) * 4;
          targetR = data[sampleIndex];
          targetG = data[sampleIndex + 1];
          targetB = data[sampleIndex + 2];
        }

        // Filter background pixels
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          const distance = Math.sqrt(
            Math.pow(r - targetR, 2) +
            Math.pow(g - targetG, 2) +
            Math.pow(b - targetB, 2)
          );

          if (distance < tolerance) {
            data[i + 3] = 0; // Alpha channel transparent
          }
        }
        ctx.putImageData(imgData, 0, 0);
      }
      setIsProcessing(false);
    };
    
    img.onerror = () => {
      console.error("Failed to load image source");
      setIsProcessing(false);
    };
  };

  const handleCanvasClick = (e) => {
    if (!isBgRemoved) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * canvas.width);
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * canvas.height);
    
    const ctx = canvas.getContext('2d');
    try {
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      setTargetColor({
        r: pixel[0],
        g: pixel[1],
        b: pixel[2]
      });
    } catch (err) {
      console.error("Failed to sample click color:", err);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsProcessing(true);
      setProcessingText('Uploading & parsing image...');
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target.result);
        setIsBgRemoved(false);
        setTolerance(30);
        setTargetColor(null);
        setSmoothness(0);
        setSelectedFilter('raw');
        setMockupType('none');
        
        setTimeout(() => {
          setIsProcessing(false);
        }, 1000);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerBgRemoval = () => {
    if (isProcessing) return;

    setIsProcessing(true);
    setProcessingText(isBgRemoved ? 'Restoring original backdrop...' : 'Analyzing subject & segmenting background...');

    setTimeout(() => {
      setIsBgRemoved(!isBgRemoved);
      setTargetColor(null); // Reset color selection on toggle
      setIsProcessing(false);
    }, 1200);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `om-studio-print-${mockupType}.png`;
    
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');

    const activeFilterObj = colorFilters.find(f => f.id === selectedFilter);
    let filterString = '';
    if (activeFilterObj && activeFilterObj.filter) {
      filterString += activeFilterObj.filter + ' ';
    }
    if (smoothness > 0) {
      filterString += `blur(${smoothness * 0.1}px) contrast(${100 + smoothness * 1.5}%) brightness(${100 + smoothness * 0.3}%) `;
    }

    tempCtx.filter = filterString.trim() || 'none';
    tempCtx.drawImage(canvas, 0, 0);

    link.href = tempCanvas.toDataURL('image/png');
    link.click();
  };

  const handleWhatsAppOrder = () => {
    const whatsappNumber = '917301336655';
    let product = 'Photo Print';
    if (mockupType === 'mug') product = 'Custom Coffee Mug';
    if (mockupType === 'tshirt') product = 'Custom T-Shirt';
    if (mockupType === 'frame') product = 'Premium Wooden Frame';
    
    const text = `Hi OM Studio! I just customized a photo for a ${product} using your online AI Studio Enhancer. I'd like to place an order / inquiry. Please let me know how to send my photo for printing!`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleReset = () => {
    setIsProcessing(true);
    setProcessingText('Resetting parameters...');
    setTimeout(() => {
      setIsBgRemoved(false);
      setTolerance(30);
      setTargetColor(null);
      setSmoothness(0);
      setSelectedFilter('raw');
      setMockupType('none');
      setIsProcessing(false);
    }, 800);
  };

  const getActiveFilterCss = () => {
    if (showOriginal) return 'none';
    let filterStr = '';
    const active = colorFilters.find(f => f.id === selectedFilter);
    if (active && active.filter) {
      filterStr += active.filter + ' ';
    }
    if (smoothness > 0) {
      filterStr += `blur(${smoothness * 0.15}px) contrast(${100 + smoothness * 2}%) brightness(${100 + smoothness * 0.4}%) saturate(${100 - smoothness * 1}%)`;
    }
    return filterStr.trim() || 'none';
  };

  return (
    <section id="ai-enhancer" className="py-24 bg-primary-bg overflow-hidden border-t border-border-color/10 spotlight-glow-bottom">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-[11px] font-bold tracking-[0.25em] text-gold-accent uppercase mb-2">
            Futuristic Studio Tools
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary-text mb-4">
            OM AI Studio Enhancer
          </h2>
          <span className="inline-block w-16 h-[2px] bg-gold-accent" />
          <p className="text-sm text-secondary-text mt-6 leading-relaxed max-w-lg mx-auto">
            Experience our instant online customizer. Drag in a photo, key out backgrounds, smooth skin textures, apply luxury film presets, and instantly preview on t-shirts or ceramic mugs.
          </p>
        </div>

        {/* Interactive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch max-w-6xl mx-auto">
          
          {/* Canvas Preview Area (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center bg-secondary-bg border border-border-color rounded-sm p-6 relative min-h-[480px] overflow-hidden shadow-sm select-none">
            
            {/* Checkerboard transparent grid backdrop */}
            <div 
              className="absolute inset-4 rounded-sm z-0 opacity-15"
              style={{
                backgroundImage: 'radial-gradient(#C5A880 1px, transparent 1px), radial-gradient(#C5A880 1px, #FCFBF9 1px)',
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 10px 10px'
              }}
            />

            {/* Hold to Compare Button */}
            <button
              onMouseDown={() => setShowOriginal(true)}
              onMouseUp={() => setShowOriginal(false)}
              onMouseLeave={() => setShowOriginal(false)}
              onTouchStart={() => setShowOriginal(true)}
              onTouchEnd={() => setShowOriginal(false)}
              className="absolute top-4 right-4 bg-primary-bg/90 border border-border-color hover:bg-gold-accent hover:text-primary-bg text-secondary-text px-3 py-1.5 rounded-sm text-[10px] uppercase font-bold tracking-widest transition-all cursor-pointer z-35 flex items-center gap-1 backdrop-blur-sm select-none"
            >
              <RefreshCw className="w-3 h-3 animate-spin-slow" />
              <span>Hold to Compare</span>
            </button>

            {/* Canvas viewport wrapper */}
            <div className="relative z-10 w-full h-[400px] flex items-center justify-center max-h-[500px]">
              
              {/* Mockup Type 1: None (Standard Canvas) */}
              {mockupType === 'none' && (
                <canvas
                  ref={canvasRef}
                  onClick={handleCanvasClick}
                  className="max-w-full max-h-[380px] object-contain rounded-sm shadow-luxury transition-all duration-300 cursor-crosshair"
                  style={{ filter: getActiveFilterCss() }}
                />
              )}

              {/* Mockup Type 2: Custom Mug */}
              {mockupType === 'mug' && (
                <div className="relative w-[210px] h-[250px] md:w-[250px] md:h-[290px] rounded-[30px] border-[2px] border-neutral-100 bg-gradient-to-r from-neutral-300 via-white to-neutral-300 flex items-center justify-center shadow-2xl transition-all duration-500">
                  {/* Mug Handle */}
                  <div className="w-[50px] h-[130px] border-[16px] border-neutral-200 rounded-r-[40px] absolute -right-[36px] top-1/2 -translate-y-1/2 -z-10 shadow-md" />
                  {/* Curved Inner shadow for 3D depth */}
                  <div className="absolute inset-0 rounded-[28px] bg-gradient-to-r from-black/15 via-transparent to-black/20 pointer-events-none z-20" />
                  {/* Mug Top Opening Oval */}
                  <div className="w-[250px] h-[20px] border-[2px] border-neutral-200 rounded-[50%] absolute -top-[10px] bg-gradient-to-b from-neutral-300 to-white z-10 shadow-inner" />
                  
                  {/* Printable Area Wrapper */}
                  <div className="w-[125px] md:w-[145px] h-[160px] md:h-[190px] overflow-hidden rounded-sm relative flex items-center justify-center z-10">
                    <canvas
                      ref={canvasRef}
                      onClick={handleCanvasClick}
                      className="w-full h-full object-cover transition-all duration-300 cursor-crosshair"
                      style={{ filter: getActiveFilterCss() }}
                    />
                    {/* Reflection & curvature overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/25 via-transparent to-black/35 pointer-events-none z-20" />
                  </div>
                </div>
              )}

              {/* Mockup Type 3: Custom T-Shirt */}
              {mockupType === 'tshirt' && (
                <div className="relative w-[280px] h-[280px] md:w-[340px] md:h-[340px] flex items-center justify-center transition-all duration-500">
                  {/* T-Shirt Vector Silhouette */}
                  <div className="absolute inset-0 text-neutral-200 dark:text-neutral-800 opacity-90 drop-shadow-luxury">
                    <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
                      <path d="M18 2h-3a1 1 0 0 0-1 1 2 2 0 0 1-4 0 1 1 0 0 0-1-1H6a2 2 0 0 0-2 2v4a2 2 0 0 0 .58 1.42l3 3A1 1 0 0 0 8.3 13V21a1 1 0 0 0 1 1h5.4a1 1 0 0 0 1-1v-8a1 1 0 0 0 .72-.58l3-3A2 2 0 0 0 20 8V4a2 2 0 0 0-2-2z" />
                    </svg>
                  </div>
                  
                  {/* Chest Printed Area */}
                  <div className="absolute top-[38%] w-[80px] md:w-[105px] h-[100px] md:h-[130px] overflow-hidden border border-black/5 rounded-sm flex items-center justify-center z-10 shadow-inner">
                    <canvas
                      ref={canvasRef}
                      onClick={handleCanvasClick}
                      className="w-full h-full object-cover transition-all duration-300 cursor-crosshair"
                      style={{ filter: getActiveFilterCss() }}
                    />
                    {/* Soft fabric shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/10 pointer-events-none mix-blend-overlay z-20" />
                  </div>
                </div>
              )}

              {/* Mockup Type 4: Wooden Frame */}
              {mockupType === 'frame' && (
                <div className="p-3 md:p-5 bg-gradient-to-br from-[#704214] via-[#5C3317] to-[#3D2211] rounded-sm shadow-2xl border-[3px] border-[#8B5A2B] transition-all duration-500 flex items-center justify-center max-w-[90%] max-h-[95%]">
                  {/* Inner Gold Bevel Rim */}
                  <div className="p-1 bg-gradient-to-r from-gold-accent to-gold-hover rounded-sm flex items-center justify-center shadow-md">
                    {/* Acid-free Mount board */}
                    <div className="p-3 md:p-5 bg-[#FAF9F6] dark:bg-[#FDFBF7] shadow-inner flex items-center justify-center">
                      <canvas
                        ref={canvasRef}
                        onClick={handleCanvasClick}
                        className="max-w-full max-h-[250px] md:max-h-[290px] object-contain rounded-sm shadow-md transition-all duration-300 cursor-crosshair"
                        style={{ filter: getActiveFilterCss() }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Processing Loader Overlay */}
              <AnimatePresence>
                {isProcessing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center gap-4 text-white z-20"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                      className="w-10 h-10 border border-t-gold-accent border-r-transparent border-b-transparent border-l-transparent rounded-full"
                    />
                    <p className="text-xs uppercase tracking-widest text-gold-accent font-semibold animate-pulse">
                      {processingText}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Custom actions under preview */}
            <div className="flex justify-between items-center mt-4 pt-3 border-t border-border-color/30 relative z-10">
              <span className="text-[9px] md:text-[10px] text-tertiary-text font-bold tracking-widest uppercase flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5 text-gold-accent" />
                {imageSrc === '/images/portrait_fashion.jpg' ? 'Active: Red Studio Sample' : 'Active: Custom Upload'}
              </span>
              
              <button
                onClick={() => fileInputRef.current.click()}
                className="text-[11px] md:text-xs font-bold text-primary-text hover:text-gold-accent flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Photo</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* AI Controls Panel (5 Cols) */}
          <div className="lg:col-span-5 bg-secondary-bg border border-border-color rounded-sm p-6 flex flex-col justify-between shadow-sm text-left">
            <div>
              {/* Panel Header */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border-color/50">
                <div className="w-8 h-8 rounded-full bg-gold-accent/10 flex items-center justify-center text-gold-accent">
                  <Sliders className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-primary-text">AI Tool Cabinet</h3>
                  <p className="text-[10px] uppercase font-bold text-gold-accent tracking-widest leading-none">Parameters</p>
                </div>
              </div>

              {/* Control 1: Background keying */}
              <div className="flex flex-col gap-3 mb-6">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-primary-text flex items-center gap-2">
                    <Wand2 className="w-4 h-4 text-gold-accent" />
                    <span>Background Keyer</span>
                  </label>
                  <button
                    onClick={triggerBgRemoval}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer focus:outline-none ${
                      isBgRemoved ? 'bg-gold-accent' : 'bg-primary-bg border border-border-color'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-primary-bg shadow-md transition-transform duration-300 ${
                        isBgRemoved ? 'translate-x-6 bg-primary-bg' : 'translate-x-1 bg-secondary-text'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-[10px] text-secondary-text leading-relaxed">
                  Automatically cuts out backdrop colors. {isBgRemoved ? <strong className="text-gold-accent">Tip: Click on any color in the image preview to select and key out that specific background color.</strong> : "Click to activate background removal."}
                </p>

                {/* Tolerance slider */}
                {isBgRemoved && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex flex-col gap-1.5 mt-2 bg-primary-bg p-3 border border-border-color rounded-sm"
                  >
                    <div className="flex justify-between text-[10px] font-bold text-secondary-text">
                      <span>KEY TOLERANCE</span>
                      <span>{tolerance}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="120"
                      value={tolerance}
                      onChange={(e) => setTolerance(parseInt(e.target.value))}
                      className="w-full accent-gold-accent cursor-pointer"
                    />
                  </motion.div>
                )}
              </div>

              {/* Control 2: Skin smoothing */}
              <div className="flex flex-col gap-2.5 mb-6">
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-primary-text">
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-gold-accent" />
                    <span>Beauty Smoothness (AI)</span>
                  </span>
                  <span className="text-gold-accent">{smoothness * 10}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={smoothness}
                  onChange={(e) => setSmoothness(parseInt(e.target.value))}
                  className="w-full accent-gold-accent cursor-pointer"
                />
                <p className="text-[10px] text-secondary-text leading-relaxed">
                  Applies high-pass texture softening to blemishes while retaining facial contour clarity.
                </p>
              </div>

              {/* Control 3: Mockup Preview Type */}
              <div className="flex flex-col gap-3 mb-6">
                <label className="text-[11px] font-bold uppercase tracking-widest text-primary-text">
                  Product Mockup Preview
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'none', name: 'Photo Print' },
                    { id: 'mug', name: 'Custom Mug' },
                    { id: 'tshirt', name: 'Custom T-Shirt' },
                    { id: 'frame', name: 'Wooden Frame' },
                  ].map((mock) => (
                    <button
                      key={mock.id}
                      onClick={() => setMockupType(mock.id)}
                      className={`py-2 px-3 text-[10px] font-semibold rounded-sm transition-all text-center border cursor-pointer ${
                        mockupType === mock.id
                          ? 'bg-gold-accent border-gold-accent text-primary-bg font-bold shadow-sm'
                          : 'bg-primary-bg border-border-color text-secondary-text hover:border-gold-accent/40'
                      }`}
                    >
                      {mock.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Control 4: Color Matrix Presets */}
              <div className="flex flex-col gap-3">
                <label className="text-[11px] font-bold uppercase tracking-widest text-primary-text">
                  Color Preset matrix
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {colorFilters.map((filt) => (
                    <button
                      key={filt.id}
                      onClick={() => setSelectedFilter(filt.id)}
                      className={`py-2 px-3 text-[10px] font-semibold rounded-sm transition-all text-center border cursor-pointer ${
                        selectedFilter === filt.id
                          ? 'bg-gold-accent border-gold-accent text-primary-bg shadow-sm font-bold'
                          : 'bg-primary-bg border-border-color text-secondary-text hover:border-gold-accent/40'
                      }`}
                    >
                      {filt.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Panel Actions */}
            <div className="flex flex-col gap-3 mt-8 pt-6 border-t border-border-color/50">
              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="px-4 py-2.5 border border-border-color hover:border-gold-accent hover:text-gold-accent text-secondary-text text-[11px] uppercase tracking-wider font-semibold rounded-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer flex-grow"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>

                <button
                  onClick={handleDownload}
                  className="px-4 py-2.5 border border-border-color hover:border-gold-accent hover:text-gold-accent text-secondary-text text-[11px] uppercase tracking-wider font-semibold rounded-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer flex-grow"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export PNG</span>
                </button>
              </div>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-3 bg-gradient-to-r from-gold-accent to-gold-hover hover:from-gold-hover hover:to-gold-accent text-primary-bg text-xs uppercase tracking-widest font-bold rounded-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-luxury cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Order Custom {mockupType === 'none' ? 'Print' : mockupType === 'mug' ? 'Mug' : mockupType === 'tshirt' ? 'T-Shirt' : 'Frame'}</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
