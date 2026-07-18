import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

function FloatingShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(time / 4) * 0.2;
    meshRef.current.rotation.y = time / 6;
    meshRef.current.rotation.z = Math.sin(time / 2) * 0.1;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <mesh
        ref={meshRef}
        onClick={() => setClicked(!clicked)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.15 : 1.0}
        style={{ cursor: 'pointer' }}
      >
        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
        <MeshDistortMaterial
          color={clicked ? '#A3E635' : '#8B5CF6'} // Toggles between Violet and Lime on click
          roughness={0.15}
          metalness={0.7}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          distort={0.3}
          speed={1.5}
        />
      </mesh>
    </Float>
  );
}

export default function Canvas3D() {
  return (
    <div className="w-full h-full min-h-[300px] md:min-h-[400px] lg:min-h-[480px] relative select-none">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} />
        <FloatingShape />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
