import { useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useLayoutEffect, useMemo } from 'react'
import { MeshStandardMaterial } from 'three'
import * as THREE from 'three'
import useConfiguratorStore from '../store/useConfiguratorStore'

export default function Model(props) {
    // Load the OBJ file from Shopify asset URL if available, otherwise local public folder
    const modelUrl = window.shopifyModelUrl || '/model.obj'
    const obj = useLoader(OBJLoader, modelUrl)

    // Get state from store
    const { colors, modelPosition } = useConfiguratorStore()

    // Clone the object to avoid mutating the cached loader result
    const scene = useMemo(() => obj.clone(), [obj])

    useLayoutEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                if (!(child.material instanceof MeshStandardMaterial)) {
                    child.material = new MeshStandardMaterial({
                        color: child.material.color,
                        map: child.material.map
                    })
                }

                // Get name from mesh or its parent group (OBJLoader puts 'g' names on Group)
                const name = child.name.toLowerCase()
                const parentName = child.parent ? child.parent.name.toLowerCase() : ''

                const checkName = (pattern) => name.includes(pattern) || parentName.includes(pattern)

                // Logic: Assign colors based on name matching
                if (checkName('board')) {
                    child.material.color.set(colors.base)
                } else if (checkName('blacktiles') || checkName('black')) {
                    child.material.color.set(colors.black)
                } else if (checkName('whitetiles') || checkName('white')) {
                    child.material.color.set(colors.white)
                }
            }
        })

        // Auto-center the model
        const box = new THREE.Box3().setFromObject(scene)
        const center = box.getCenter(new THREE.Vector3())
        scene.position.sub(center) // Shift scene so its center is at (0,0,0)

    }, [scene, colors])

    return (
        <primitive
            object={scene}
            position={modelPosition}
            {...props}
        // Adjust scale if needed, OBJs are often large or small
        // scale={0.1} 
        />
    )
}