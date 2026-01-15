import { useState } from 'react'
import useConfiguratorStore from '../store/useConfiguratorStore'

const allColors = [
    { name: 'Bone White', value: '#CBC6B8' },
    { name: 'Desert Tan', value: '#E8DBB7' },
    { name: 'Latte Brown', value: '#D3B7A7' },
    { name: 'Caramel', value: '#AE835B' },
    { name: 'Terracotta', value: '#B15533' },
    { name: 'Dark Brown', value: '#7D6556' },
    { name: 'Dark Chocolate', value: '#4D3324' },
    { name: 'Lilac Purple', value: '#AE96D4' },
    { name: 'Sakura Pink', value: '#E8AFCF' },
    { name: 'Mandarin Orange', value: '#F99963' },
    { name: 'Lemon Yellow', value: '#F7D959' },
    { name: 'Plum', value: '#950051' },
    { name: 'Scarlet Red', value: '#DE4343' },
    { name: 'Dark Red', value: '#BB3D43' },
    { name: 'Dark Green', value: '#68724D' },
    { name: 'Grass Green', value: '#61C680' },
    { name: 'Apple Green', value: '#C2E189' },
    { name: 'Ice Blue', value: '#A3D8E1' },
    { name: 'Sky Blue', value: '#56B7E6' },
    { name: 'Marine Blue', value: '#0078BF' },
    { name: 'Dark Blue', value: '#042F56' },
    { name: 'Ash Gray', value: '#9B9EA0' },
    { name: 'Nardo Gray', value: '#757575' },
    { name: 'Charcoal', value: '#000000' },
]

const parts = [
    { id: 'base', label: 'Board' },
    { id: 'black', label: 'Black Tiles' },
    { id: 'white', label: 'White Tiles' },
]

export default function UIInterface() {
    const { colors: currentColors, setPartColor } = useConfiguratorStore()
    const [activePart, setActivePart] = useState('base')

    const styles = {
        container: {
            width: '100%',
            height: '100%',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            overflowY: 'auto',
            backgroundColor: 'white',
            borderLeft: '1px solid #e5e7eb',
            fontFamily: 'sans-serif',
            boxSizing: 'border-box',
        },
        wrapper: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            maxWidth: '400px',
        },
        title: {
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#1f2937',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.25rem',
        },
        section: {
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
        },
        label: {
            fontSize: '1rem',
            fontWeight: '500',
            color: '#374151',
        },
        tabsContainer: {
            display: 'flex',
            gap: '0.4rem',
        },
        tabButton: (isActive) => ({
            flex: 1,
            padding: '0.6rem 0.5rem',
            borderRadius: '0.6rem',
            fontSize: '0.75rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.025em',
            border: isActive ? '2px solid #374151' : '2px solid #e5e7eb',
            backgroundColor: isActive ? '#f3f4f6' : 'white',
            color: isActive ? '#111827' : '#4b5563',
            boxShadow: isActive ? 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            transform: isActive ? 'translateY(1px)' : 'translateY(0)',
            cursor: 'pointer',
            transition: 'all 0.1s ease-in-out',
        }),
        colorContainer: {
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            backgroundColor: '#f9fafb',
            padding: '1rem',
            borderRadius: '0.75rem',
            border: '1px solid #f3f4f6',
        },
        colorButton: (isActive, color) => ({
            width: '2.15rem',
            height: '2.15rem',
            borderRadius: '50%',
            border: isActive ? '3px solid #1f2937' : '1px solid #e5e7eb',
            backgroundColor: color,
            cursor: 'pointer',
            boxShadow: isActive ? 'inset 0 2px 4px 0 rgba(0,0,0,0.2)' : '0 1px 2px 0 rgba(0,0,0,0.05)',
            transform: isActive ? 'scale(0.95)' : 'scale(1)',
            transition: 'all 0.2s',
            outline: 'none',
        }),
        disclaimer: {
            fontSize: '0.7rem',
            color: '#6b7280',
            backgroundColor: '#f9fafb',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            marginTop: '0.5rem',
            border: '1px solid #f3f4f6',
            lineHeight: '1.3',
            fontStyle: 'italic',
        },
        saveButton: {
            width: '100%',
            backgroundColor: 'black',
            color: 'white',
            paddingTop: '0.75rem',
            paddingBottom: '0.75rem',
            fontSize: '1rem',
            borderRadius: '0.6rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            border: 'none',
            marginTop: '0.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.wrapper}>
                <h2 style={styles.title}>Configurator</h2>

                {/* Part Selection (Tabs) */}
                <div style={styles.section}>
                    <label style={styles.label}>Select Part</label>
                    <div style={styles.tabsContainer}>
                        {parts.map((part) => (
                            <button
                                key={part.id}
                                onClick={() => setActivePart(part.id)}
                                style={styles.tabButton(activePart === part.id)}
                            >
                                {part.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Color Selection (Flattened) */}
                <div style={{ ...styles.section, marginTop: '1rem' }}>
                    <label style={styles.label}>
                        Select Color for <span style={{ fontWeight: 'bold', color: '#111827' }}>{parts.find(p => p.id === activePart).label}</span>
                    </label>

                    <div style={styles.colorContainer}>
                        {allColors.map((c) => (
                            <button
                                key={`${activePart}-${c.name}`}
                                title={c.name} // Browser native tooltip
                                style={styles.colorButton(currentColors[activePart] === c.value, c.value)}
                                onClick={() => setPartColor(activePart, c.value)}
                                aria-label={`Select ${c.name}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Disclaimer (Translated to English) */}
                <div style={styles.disclaimer}>
                    Note: The actual color of the printed plastic may vary slightly from the screen display due to lighting and texture.
                </div>

                <div style={{ marginTop: '0.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb' }}>
                    <button
                        style={styles.saveButton}
                        onClick={() => alert(JSON.stringify(currentColors))}
                    >
                        Save Configuration
                    </button>
                </div>
            </div>
        </div>
    )
}
