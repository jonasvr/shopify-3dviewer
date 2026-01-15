import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, ContactShadows } from '@react-three/drei'
import Model from './Model'

export default function Experience() {
    return (
        <Canvas shadows camera={{ position: [6.28, -39.28, 30.29], fov: 45 }}>
            <color attach="background" args={['#252525']} />

            <Suspense fallback={null}>
                <group position={[0, -0.5, 0]}>
                    <Model />
                </group>
                <Environment preset="city" />
            </Suspense>

            <ContactShadows position={[0, -0.5, 0]} opacity={0.5} scale={10} blur={1.5} far={0.8} />
            <OrbitControls
                makeDefault
                target={[0, 0, 0]}
                enablePan={false}
                enableRotate={false}
                enableZoom={true}
                minDistance={2}
                maxDistance={50}
            />
        </Canvas>
    )
}
