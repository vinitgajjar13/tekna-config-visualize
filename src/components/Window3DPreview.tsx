import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Card } from "@/components/ui/card";
import { WindowSpecs } from "./WindowForm";

interface Window3DPreviewProps {
  specs: WindowSpecs;
}

const WindowModel = ({ specs }: { specs: WindowSpecs }) => {
  // Convert inches to Three.js units (scale down for better viewing)
  const height = specs.height / 12;
  const width = specs.width / 12;
  const frameThickness = 0.2;

  // Aluminum frame color
  const frameColor = "#8b9197";
  const glassColor = "#88ccff";

  return (
    <group>
      {/* Outer Frame */}
      {/* Top */}
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[width, frameThickness, frameThickness]} />
        <meshStandardMaterial color={frameColor} metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Bottom */}
      <mesh position={[0, -height / 2, 0]}>
        <boxGeometry args={[width, frameThickness, frameThickness]} />
        <meshStandardMaterial color={frameColor} metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Left */}
      <mesh position={[-width / 2, 0, 0]}>
        <boxGeometry args={[frameThickness, height, frameThickness]} />
        <meshStandardMaterial color={frameColor} metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Right */}
      <mesh position={[width / 2, 0, 0]}>
        <boxGeometry args={[frameThickness, height, frameThickness]} />
        <meshStandardMaterial color={frameColor} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Glass Pane */}
      {specs.windowType === "Slider" ? (
        <>
          {/* Left sliding panel */}
          <mesh position={[-width / 4, 0, -0.05]}>
            <boxGeometry args={[width / 2 - frameThickness, height - frameThickness, 0.02]} />
            <meshPhysicalMaterial
              color={glassColor}
              transparent
              opacity={0.3}
              metalness={0.1}
              roughness={0.1}
              transmission={0.9}
            />
          </mesh>
          
          {/* Right sliding panel */}
          <mesh position={[width / 4, 0, 0.05]}>
            <boxGeometry args={[width / 2 - frameThickness, height - frameThickness, 0.02]} />
            <meshPhysicalMaterial
              color={glassColor}
              transparent
              opacity={0.3}
              metalness={0.1}
              roughness={0.1}
              transmission={0.9}
            />
          </mesh>

          {/* Middle divider for slider */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[frameThickness, height, frameThickness]} />
            <meshStandardMaterial color={frameColor} metalness={0.8} roughness={0.2} />
          </mesh>
        </>
      ) : (
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[width - frameThickness, height - frameThickness, 0.02]} />
          <meshPhysicalMaterial
            color={glassColor}
            transparent
            opacity={0.3}
            metalness={0.1}
            roughness={0.1}
            transmission={0.9}
          />
        </mesh>
      )}

      {/* Grill (optional) */}
      {specs.grill && (
        <>
          {/* Horizontal grill bars */}
          {[...Array(3)].map((_, i) => (
            <mesh key={`h-${i}`} position={[0, (i - 1) * (height / 3), 0.1]}>
              <boxGeometry args={[width - frameThickness, 0.05, 0.05]} />
              <meshStandardMaterial color={frameColor} metalness={0.8} roughness={0.2} />
            </mesh>
          ))}
          
          {/* Vertical grill bars */}
          {[...Array(3)].map((_, i) => (
            <mesh key={`v-${i}`} position={[(i - 1) * (width / 3), 0, 0.1]}>
              <boxGeometry args={[0.05, height - frameThickness, 0.05]} />
              <meshStandardMaterial color={frameColor} metalness={0.8} roughness={0.2} />
            </mesh>
          ))}
        </>
      )}

      {/* Mesh (optional - represented as a slightly darker overlay) */}
      {specs.mesh && (
        <mesh position={[0, 0, 0.15]}>
          <boxGeometry args={[width - frameThickness * 2, height - frameThickness * 2, 0.01]} />
          <meshStandardMaterial
            color="#333333"
            transparent
            opacity={0.2}
            metalness={0.5}
            roughness={0.8}
          />
        </mesh>
      )}
    </group>
  );
};

const Window3DPreview = ({ specs }: Window3DPreviewProps) => {
  return (
    <Card className="p-6 backdrop-blur-sm bg-card/80 border-border/50 h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-foreground">3D Preview</h2>
      <div className="flex-1 bg-gradient-to-br from-muted/50 to-muted/20 rounded-lg overflow-hidden border border-border">
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} />
          
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[-5, 5, 5]} intensity={0.5} />
          
          {/* Window Model */}
          <WindowModel specs={specs} />
          
          {/* Controls */}
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            minDistance={3}
            maxDistance={15}
          />
        </Canvas>
      </div>
      <div className="mt-4 text-sm text-muted-foreground text-center">
        <p>Click and drag to rotate • Scroll to zoom</p>
      </div>
    </Card>
  );
};

export default Window3DPreview;
