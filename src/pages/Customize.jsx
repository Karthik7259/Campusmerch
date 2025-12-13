import React, { useState, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { toast } from 'react-toastify';
import Title from '../Components/Title';
import * as THREE from 'three';

// Human Avatar with T-Shirt Component
const HumanWithTShirt = ({ color, designs }) => {
  const groupRef = useRef();

  // Create textures for different parts
  const createTexture = (design) => {
    if (!design) return null;
    
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    
    // Fill with transparent background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw logo if exists
    if (design.logo) {
      const img = new Image();
      img.src = design.logo;
      const logoSize = design.logoSize || 200;
      const x = (design.logoPosition?.x || 50) * canvas.width / 100 - logoSize / 2;
      const y = (design.logoPosition?.y || 30) * canvas.height / 100 - logoSize / 2;
      ctx.drawImage(img, x, y, logoSize, logoSize);
    }
    
    // Draw text if exists
    if (design.text) {
      ctx.fillStyle = design.textColor || '#000000';
      ctx.font = `${design.fontSize || 48}px ${design.fontFamily || 'Arial'}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const x = (design.textPosition?.x || 50) * canvas.width / 100;
      const y = (design.textPosition?.y || 60) * canvas.height / 100;
      
      // Add shadow for better visibility
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 3;
      
      ctx.fillText(design.text, x, y);
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  };

  const frontTexture = createTexture(designs.front);
  const backTexture = createTexture(designs.back);
  const leftShoulderTexture = createTexture(designs.leftShoulder);
  const rightShoulderTexture = createTexture(designs.rightShoulder);

  return (
    <group ref={groupRef} position={[0, -2.5, 0]}>
      {/* Head */}
      <mesh position={[0, 3.8, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color="#f5d5b8" roughness={0.6} />
      </mesh>
      
      {/* Neck */}
      <mesh position={[0, 3.3, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.3, 16]} />
        <meshStandardMaterial color="#f5d5b8" roughness={0.6} />
      </mesh>
      
      {/* Torso/Body - covered by t-shirt */}
      <mesh position={[0, 2.2, 0]}>
        <boxGeometry args={[1, 2, 0.5]} />
        <meshStandardMaterial color="#f5d5b8" roughness={0.6} />
      </mesh>
      
      {/* T-Shirt Front */}
      <mesh position={[0, 2.2, 0.26]}>
        <boxGeometry args={[1.05, 2.1, 0.02]} />
        <meshStandardMaterial 
          color={color} 
          map={frontTexture}
          roughness={0.7}
          metalness={0.05}
        />
      </mesh>
      
      {/* T-Shirt Back */}
      <mesh position={[0, 2.2, -0.26]} rotation={[0, Math.PI, 0]}>
        <boxGeometry args={[1.05, 2.1, 0.02]} />
        <meshStandardMaterial 
          color={color} 
          map={backTexture}
          roughness={0.7}
          metalness={0.05}
        />
      </mesh>
      
      {/* T-Shirt Sides */}
      <mesh position={[0.525, 2.2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.5, 2.1, 0.02]} />
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.05} />
      </mesh>
      <mesh position={[-0.525, 2.2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[0.5, 2.1, 0.02]} />
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.05} />
      </mesh>
      
      {/* Neck collar */}
      <mesh position={[0, 3.15, 0]}>
        <torusGeometry args={[0.2, 0.05, 16, 32]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      
      {/* Left Arm */}
      <mesh position={[-0.65, 2.5, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 1.5, 16]} />
        <meshStandardMaterial color="#f5d5b8" roughness={0.6} />
      </mesh>
      
      {/* Left Shoulder/Sleeve */}
      <mesh position={[-0.65, 2.8, 0]}>
        <cylinderGeometry args={[0.16, 0.14, 0.6, 16]} />
        <meshStandardMaterial 
          color={color} 
          map={leftShoulderTexture}
          roughness={0.7}
          metalness={0.05}
        />
      </mesh>
      
      {/* Right Arm */}
      <mesh position={[0.65, 2.5, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 1.5, 16]} />
        <meshStandardMaterial color="#f5d5b8" roughness={0.6} />
      </mesh>
      
      {/* Right Shoulder/Sleeve */}
      <mesh position={[0.65, 2.8, 0]}>
        <cylinderGeometry args={[0.16, 0.14, 0.6, 16]} />
        <meshStandardMaterial 
          color={color} 
          map={rightShoulderTexture}
          roughness={0.7}
          metalness={0.05}
        />
      </mesh>
      
      {/* Left Forearm */}
      <mesh position={[-0.65, 1.5, 0.15]} rotation={[0.3, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.11, 0.8, 16]} />
        <meshStandardMaterial color="#f5d5b8" roughness={0.6} />
      </mesh>
      
      {/* Right Forearm */}
      <mesh position={[0.65, 1.5, 0.15]} rotation={[0.3, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.11, 0.8, 16]} />
        <meshStandardMaterial color="#f5d5b8" roughness={0.6} />
      </mesh>
      
      {/* Hips/Waist */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.45, 0.5, 0.3, 16]} />
        <meshStandardMaterial color="#2c3e50" roughness={0.8} />
      </mesh>
      
      {/* Left Leg */}
      <mesh position={[-0.25, 0.2, 0]}>
        <cylinderGeometry args={[0.15, 0.13, 1.6, 16]} />
        <meshStandardMaterial color="#2c3e50" roughness={0.8} />
      </mesh>
      
      {/* Right Leg */}
      <mesh position={[0.25, 0.2, 0]}>
        <cylinderGeometry args={[0.15, 0.13, 1.6, 16]} />
        <meshStandardMaterial color="#2c3e50" roughness={0.8} />
      </mesh>
      
      {/* Shadow/Base */}
      <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.8, 32]} />
        <meshStandardMaterial 
          color="#000000" 
          transparent 
          opacity={0.2}
          roughness={1}
        />
      </mesh>
    </group>
  );
};

const Customize = () => {
  const [selectedColor, setSelectedColor] = useState('#FFFFFF');
  const [selectedSize, setSelectedSize] = useState('M');
  const [activeArea, setActiveArea] = useState('front'); // front, back, leftShoulder, rightShoulder
  const [designs, setDesigns] = useState({
    front: { text: '', textColor: '#000000', fontSize: 48, textPosition: { x: 50, y: 60 }, logo: null, logoSize: 200, logoPosition: { x: 50, y: 30 }, fontFamily: 'Arial' },
    back: { text: '', textColor: '#000000', fontSize: 48, textPosition: { x: 50, y: 60 }, logo: null, logoSize: 200, logoPosition: { x: 50, y: 30 }, fontFamily: 'Arial' },
    leftShoulder: { text: '', textColor: '#000000', fontSize: 32, textPosition: { x: 50, y: 50 }, logo: null, logoSize: 100, logoPosition: { x: 50, y: 50 }, fontFamily: 'Arial' },
    rightShoulder: { text: '', textColor: '#000000', fontSize: 32, textPosition: { x: 50, y: 50 }, logo: null, logoSize: 100, logoPosition: { x: 50, y: 50 }, fontFamily: 'Arial' },
  });
  const fileInputRef = useRef(null);

  const tshirtColors = [
    { name: 'White', value: '#FFFFFF' },
    { name: 'Black', value: '#000000' },
    { name: 'Navy', value: '#1E3A8A' },
    { name: 'Red', value: '#DC2626' },
    { name: 'Green', value: '#16A34A' },
    { name: 'Yellow', value: '#FACC15' },
    { name: 'Gray', value: '#6B7280' },
    { name: 'Pink', value: '#EC4899' },
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  
  const fonts = ['Arial', 'Times New Roman', 'Courier New', 'Georgia', 'Verdana', 'Comic Sans MS', 'Impact'];

  const areas = [
    { id: 'front', label: 'Front', icon: '👕' },
    { id: 'back', label: 'Back', icon: '🔙' },
    { id: 'leftShoulder', label: 'Left Shoulder', icon: '⬅️' },
    { id: 'rightShoulder', label: 'Right Shoulder', icon: '➡️' },
  ];

  // Get current design for active area
  const currentDesign = designs[activeArea];

  // Update design for active area
  const updateDesign = (updates) => {
    setDesigns(prev => ({
      ...prev,
      [activeArea]: {
        ...prev[activeArea],
        ...updates
      }
    }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Logo file size should be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        updateDesign({ logo: event.target.result });
        toast.success(`Logo uploaded to ${areas.find(a => a.id === activeArea).label}!`);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    updateDesign({ logo: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.info('Logo removed');
  };

  const handleAddToCart = () => {
    const hasCustomization = Object.values(designs).some(
      design => design.text || design.logo
    );
    
    if (!hasCustomization) {
      toast.error('Please add some customization (text or logo) to at least one area');
      return;
    }

    const customizationData = {
      color: selectedColor,
      size: selectedSize,
      designs: designs,
      type: 'custom-tshirt-3d'
    };

    console.log('Customization data:', customizationData);
    toast.success('Custom 3D t-shirt added to cart!');
  };

  const handleResetArea = () => {
    const maxLogoSize = activeArea.includes('Shoulder') ? 100 : 200;
    const defaultFontSize = activeArea.includes('Shoulder') ? 32 : 48;
    
    setDesigns(prev => ({
      ...prev,
      [activeArea]: {
        text: '',
        textColor: '#000000',
        fontSize: defaultFontSize,
        textPosition: { x: 50, y: activeArea.includes('Shoulder') ? 50 : 60 },
        logo: null,
        logoSize: maxLogoSize,
        logoPosition: { x: 50, y: activeArea.includes('Shoulder') ? 50 : 30 },
        fontFamily: 'Arial'
      }
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.info(`${areas.find(a => a.id === activeArea).label} design reset`);
  };

  const rotateToView = (view) => {
    // This would be handled by OrbitControls or camera animation
    toast.info(`Rotating to ${view} view`);
  };

  return (
    <div className='border-t pt-10 min-h-screen pb-10'>
      <div className='text-center mb-8'>
        <Title text1={'3D CUSTOMIZE'} text2={'YOUR T-SHIRT'} />
        <p className='text-gray-600 mt-2'>Design your t-shirt on a realistic human model - rotate to view all angles</p>
      </div>

      <div className='flex flex-col lg:flex-row gap-8 mb-10'>
        {/* 3D Canvas Preview */}
        <div className='flex-1 flex flex-col items-center'>
          <div className='bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-lg shadow-2xl w-full' style={{ height: '600px' }}>
            <Canvas>
              <Suspense fallback={null}>
                <PerspectiveCamera makeDefault position={[0, 1.5, 5]} />
                <OrbitControls 
                  enablePan={true}
                  enableZoom={true}
                  enableRotate={true}
                  minDistance={3}
                  maxDistance={8}
                  target={[0, 1.5, 0]}
                  maxPolarAngle={Math.PI / 2}
                  minPolarAngle={0}
                />
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
                <directionalLight position={[-5, 3, -5]} intensity={0.4} />
                <spotLight position={[0, 5, 0]} angle={0.3} penumbra={1} intensity={0.5} />
                <HumanWithTShirt color={selectedColor} designs={designs} />
                <Environment preset="city" />
              </Suspense>
            </Canvas>
          </div>
          
          <div className='mt-4 text-sm text-gray-600 text-center'>
            <p>🖱️ Drag to rotate • Scroll to zoom • Right-click to pan</p>
            <p className='text-xs mt-1'>Rotate to see front, back, and shoulder designs</p>
          </div>

          {/* Quick View Buttons */}
          <div className='flex gap-3 mt-4 flex-wrap justify-center'>
            <button
              onClick={() => setActiveArea('front')}
              className={`px-4 py-2 rounded-md transition-all ${
                activeArea === 'front' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              👕 Front View
            </button>
            <button
              onClick={() => setActiveArea('back')}
              className={`px-4 py-2 rounded-md transition-all ${
                activeArea === 'back' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              🔙 Back View
            </button>
            <button
              onClick={() => setActiveArea('leftShoulder')}
              className={`px-4 py-2 rounded-md transition-all ${
                activeArea === 'leftShoulder' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              ⬅️ Left Shoulder
            </button>
            <button
              onClick={() => setActiveArea('rightShoulder')}
              className={`px-4 py-2 rounded-md transition-all ${
                activeArea === 'rightShoulder' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              ➡️ Right Shoulder
            </button>
          </div>
          
          <div className='flex gap-4 mt-6'>
            <button
              onClick={handleAddToCart}
              className='bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-all font-semibold'
            >
              Add to Cart - ₹599
            </button>
          </div>
        </div>

        {/* Customization Controls */}
        <div className='flex-1 bg-white p-6 rounded-lg shadow-lg max-h-[800px] overflow-y-auto'>
          <h2 className='text-2xl font-semibold mb-4'>Customization Options</h2>
          
          {/* Active Area Indicator */}
          <div className='mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
            <p className='text-sm font-medium text-blue-900'>
              Currently Designing: <span className='text-blue-600 font-bold'>{areas.find(a => a.id === activeArea)?.label}</span>
            </p>
            <p className='text-xs text-blue-700 mt-1'>Select a view button above to design different areas</p>
          </div>

          {/* T-Shirt Color */}
          <div className='mb-6'>
            <label className='block text-sm font-medium mb-3'>T-Shirt Color</label>
            <div className='flex flex-wrap gap-3'>
              {tshirtColors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(color.value)}
                  className={`w-12 h-12 rounded-full border-2 transition-all ${
                    selectedColor === color.value ? 'border-black scale-110 ring-2 ring-offset-2 ring-black' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className='mb-6'>
            <label className='block text-sm font-medium mb-3'>Size</label>
            <div className='flex flex-wrap gap-2'>
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-md transition-all ${
                    selectedSize === size
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-gray-300 hover:border-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <hr className='my-6' />

          {/* Design Controls for Active Area */}
          <h3 className='text-lg font-semibold mb-4'>
            Design {areas.find(a => a.id === activeArea)?.label}
          </h3>

          {/* Logo Upload */}
          <div className='mb-6'>
            <label className='block text-sm font-medium mb-3'>Upload Logo</label>
            <input
              type='file'
              ref={fileInputRef}
              onChange={handleLogoUpload}
              accept='image/*'
              className='hidden'
            />
            <div className='flex gap-2'>
              <button
                onClick={() => fileInputRef.current.click()}
                className='flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-md border border-blue-200 hover:bg-blue-100 transition-all'
              >
                {currentDesign.logo ? 'Change Logo' : 'Choose Logo'}
              </button>
              {currentDesign.logo && (
                <button
                  onClick={handleRemoveLogo}
                  className='bg-red-50 text-red-600 px-4 py-2 rounded-md border border-red-200 hover:bg-red-100 transition-all'
                >
                  Remove
                </button>
              )}
            </div>
            {currentDesign.logo && (
              <div className='mt-3 space-y-2'>
                <div>
                  <label className='block text-xs text-gray-600 mb-1'>Logo Size: {currentDesign.logoSize}px</label>
                  <input
                    type='range'
                    min='50'
                    max={activeArea.includes('Shoulder') ? 150 : 300}
                    value={currentDesign.logoSize}
                    onChange={(e) => updateDesign({ logoSize: Number(e.target.value) })}
                    className='w-full'
                  />
                </div>
                <div>
                  <label className='block text-xs text-gray-600 mb-1'>Logo Position X: {currentDesign.logoPosition.x}%</label>
                  <input
                    type='range'
                    min='0'
                    max='100'
                    value={currentDesign.logoPosition.x}
                    onChange={(e) => updateDesign({ logoPosition: { ...currentDesign.logoPosition, x: Number(e.target.value) } })}
                    className='w-full'
                  />
                </div>
                <div>
                  <label className='block text-xs text-gray-600 mb-1'>Logo Position Y: {currentDesign.logoPosition.y}%</label>
                  <input
                    type='range'
                    min='0'
                    max='100'
                    value={currentDesign.logoPosition.y}
                    onChange={(e) => updateDesign({ logoPosition: { ...currentDesign.logoPosition, y: Number(e.target.value) } })}
                    className='w-full'
                  />
                </div>
              </div>
            )}
          </div>

          {/* Custom Text */}
          <div className='mb-6'>
            <label className='block text-sm font-medium mb-3'>Custom Text/Name</label>
            <input
              type='text'
              value={currentDesign.text}
              onChange={(e) => updateDesign({ text: e.target.value })}
              placeholder='Enter your text or name'
              maxLength={30}
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black'
            />
            <p className='text-xs text-gray-500 mt-1'>{currentDesign.text.length}/30 characters</p>
          </div>

          {currentDesign.text && (
            <>
              {/* Font Family */}
              <div className='mb-4'>
                <label className='block text-xs text-gray-600 mb-1'>Font Style</label>
                <select
                  value={currentDesign.fontFamily}
                  onChange={(e) => updateDesign({ fontFamily: e.target.value })}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black'
                >
                  {fonts.map((font) => (
                    <option key={font} value={font} style={{ fontFamily: font }}>
                      {font}
                    </option>
                  ))}
                </select>
              </div>

              {/* Text Color */}
              <div className='mb-4'>
                <label className='block text-xs text-gray-600 mb-1'>Text Color</label>
                <div className='flex gap-2'>
                  <input
                    type='color'
                    value={currentDesign.textColor}
                    onChange={(e) => updateDesign({ textColor: e.target.value })}
                    className='h-10 w-20 rounded cursor-pointer'
                  />
                  <input
                    type='text'
                    value={currentDesign.textColor}
                    onChange={(e) => updateDesign({ textColor: e.target.value })}
                    className='flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm'
                    placeholder='#000000'
                  />
                </div>
              </div>

              {/* Font Size */}
              <div className='mb-4'>
                <label className='block text-xs text-gray-600 mb-1'>Font Size: {currentDesign.fontSize}px</label>
                <input
                  type='range'
                  min='20'
                  max={activeArea.includes('Shoulder') ? 48 : 72}
                  value={currentDesign.fontSize}
                  onChange={(e) => updateDesign({ fontSize: Number(e.target.value) })}
                  className='w-full'
                />
              </div>

              {/* Text Position */}
              <div className='mb-4'>
                <label className='block text-xs text-gray-600 mb-1'>Text Position X: {currentDesign.textPosition.x}%</label>
                <input
                  type='range'
                  min='0'
                  max='100'
                  value={currentDesign.textPosition.x}
                  onChange={(e) => updateDesign({ textPosition: { ...currentDesign.textPosition, x: Number(e.target.value) } })}
                  className='w-full'
                />
              </div>

              <div className='mb-4'>
                <label className='block text-xs text-gray-600 mb-1'>Text Position Y: {currentDesign.textPosition.y}%</label>
                <input
                  type='range'
                  min='0'
                  max='100'
                  value={currentDesign.textPosition.y}
                  onChange={(e) => updateDesign({ textPosition: { ...currentDesign.textPosition, y: Number(e.target.value) } })}
                  className='w-full'
                />
              </div>
            </>
          )}

          <button
            onClick={handleResetArea}
            className='w-full mt-4 bg-gray-100 text-gray-700 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-200 transition-all'
          >
            Reset {areas.find(a => a.id === activeArea)?.label} Design
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className='bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg mb-10'>
        <h3 className='text-xl font-semibold mb-4'>Why 3D Customize with Us?</h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='flex items-start gap-3'>
            <div className='bg-blue-100 p-2 rounded-full'>
              <svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5' />
              </svg>
            </div>
            <div>
              <h4 className='font-semibold mb-1'>Realistic Human Preview</h4>
              <p className='text-sm text-gray-600'>See exactly how your design looks on a person wearing the t-shirt</p>
            </div>
          </div>
          <div className='flex items-start gap-3'>
            <div className='bg-green-100 p-2 rounded-full'>
              <svg className='w-6 h-6 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
              </svg>
            </div>
            <div>
              <h4 className='font-semibold mb-1'>Premium Quality Printing</h4>
              <p className='text-sm text-gray-600'>High-quality DTG printing for vibrant, long-lasting designs</p>
            </div>
          </div>
          <div className='flex items-start gap-3'>
            <div className='bg-purple-100 p-2 rounded-full'>
              <svg className='w-6 h-6 text-purple-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </div>
            <div>
              <h4 className='font-semibold mb-1'>Fast Turnaround</h4>
              <p className='text-sm text-gray-600'>Your custom 3D t-shirt delivered in 7-10 business days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customize;
