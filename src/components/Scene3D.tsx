import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars, Sparkles, Environment, MeshTransmissionMaterial, Float as Float3D } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'

function Particles({ count = 500 }) {
  const mesh = useRef<THREE.Points>(null)
  const mouse = useRef({ x: 0, y: 0 })

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const scales = new Float32Array(count)
    const speeds = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
      scales[i] = Math.random()
      speeds[i] = Math.random() * 0.5 + 0.5
    }
    return { positions, scales, speeds }
  }, [count])

  useFrame((state) => {
    if (!mesh.current) return
    const time = state.clock.getElapsedTime()
    mesh.current.rotation.y = time * 0.05
    mesh.current.rotation.x = Math.sin(time * 0.1) * 0.1
    
    const positions = mesh.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3 + 1] += Math.sin(time * particles.speeds[i] + i) * 0.002
    }
    mesh.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#0071e3"
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function FloatingRings() {
  const ring1 = useRef<THREE.Mesh>(null)
  const ring2 = useRef<THREE.Mesh>(null)
  const ring3 = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (ring1.current) {
      ring1.current.rotation.z = t * 0.2
      ring1.current.rotation.x = Math.sin(t * 0.5) * 0.3
    }
    if (ring2.current) {
      ring2.current.rotation.z = -t * 0.15
      ring2.current.rotation.y = Math.cos(t * 0.3) * 0.2
    }
    if (ring3.current) {
      ring3.current.rotation.x = t * 0.1
      ring3.current.rotation.y = -t * 0.25
    }
  })

  return (
    <>
      <Float3D speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={ring1} position={[3, 1, -2]}>
          <torusGeometry args={[1.5, 0.02, 16, 100]} />
          <meshBasicMaterial color="#0071e3" transparent opacity={0.3} />
        </mesh>
      </Float3D>
      
      <Float3D speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh ref={ring2} position={[-3, -1, -3]}>
          <torusGeometry args={[2, 0.015, 16, 100]} />
          <meshBasicMaterial color="#5856d6" transparent opacity={0.2} />
        </mesh>
      </Float3D>
      
      <Float3D speed={2.5} rotationIntensity={0.8} floatIntensity={0.3}>
        <mesh ref={ring3} position={[0, 2, -4]}>
          <torusGeometry args={[1, 0.01, 16, 100]} />
          <meshBasicMaterial color="#bf5af2" transparent opacity={0.4} />
        </mesh>
      </Float3D>
    </>
  )
}

function FloatingOrbs() {
  const orb1 = useRef<THREE.Mesh>(null)
  const orb2 = useRef<THREE.Mesh>(null)
  const orb3 = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (orb1.current) {
      orb1.current.position.x = Math.sin(t * 0.5) * 4
      orb1.current.position.y = Math.cos(t * 0.3) * 2
    }
    if (orb2.current) {
      orb2.current.position.x = Math.cos(t * 0.4) * 3
      orb2.current.position.y = Math.sin(t * 0.6) * 3
    }
    if (orb3.current) {
      orb3.current.position.x = Math.sin(t * 0.3 + 2) * 5
      orb3.current.position.y = Math.cos(t * 0.5 + 1) * 2.5
    }
  })

  return (
    <>
      <Float3D speed={3} rotationIntensity={0} floatIntensity={2}>
        <mesh ref={orb1} position={[4, 0, -2]}>
          <sphereGeometry args={[0.15, 32, 32]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            resolution={512}
            transmission={1}
            roughness={0}
            thickness={0.5}
            ior={1.5}
            chromaticAberration={0.06}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.1}
            temporalDistortion={0.2}
            clearcoat={1}
            attenuationDistance={0.5}
            attenuationColor="#0071e3"
            color="#0071e3"
          />
        </mesh>
      </Float3D>
      
      <Float3D speed={2.5} rotationIntensity={0} floatIntensity={1.5}>
        <mesh ref={orb2} position={[-4, 1, -3]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            resolution={256}
            transmission={1}
            roughness={0}
            thickness={0.3}
            ior={1.5}
            chromaticAberration={0.04}
            distortion={0.1}
            temporalDistortion={0.1}
            clearcoat={1}
            attenuationColor="#5856d6"
            color="#5856d6"
          />
        </mesh>
      </Float3D>
      
      <Float3D speed={4} rotationIntensity={0} floatIntensity={2.5}>
        <mesh ref={orb3} position={[2, -2, -2]}>
          <sphereGeometry args={[0.08, 32, 32]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            resolution={256}
            transmission={1}
            roughness={0}
            thickness={0.2}
            ior={1.5}
            chromaticAberration={0.03}
            distortion={0.1}
            clearcoat={1}
            attenuationColor="#bf5af2"
            color="#bf5af2"
          />
        </mesh>
      </Float3D>
    </>
  )
}

function GridPlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
      <planeGeometry args={[50, 50, 50, 50]} />
      <meshBasicMaterial 
        color="#0071e3" 
        wireframe 
        transparent 
        opacity={0.05}
      />
    </mesh>
  )
}

export function Scene3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 10, 30]} />
        
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#0071e3" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#5856d6" />
        
        <Particles count={800} />
        <FloatingRings />
        <FloatingOrbs />
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        <Sparkles count={100} scale={15} size={2} speed={0.4} opacity={0.5} color="#0071e3" />
        
        <GridPlane />
        
        <Environment preset="night" />
        
        <EffectComposer>
          <Bloom 
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            height={300}
            intensity={0.5}
          />
          <Noise opacity={0.02} />
          <Vignette eskil={false} offset={0.1} darkness={0.5} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
