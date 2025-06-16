import React, { useState, useEffect } from 'react';
import DimensionPreviewOrb from './DimensionPreviewOrb'; // Import the component

// Interface for simplified dimension data for the list
interface SimplifiedDimension {
  dimensionUID: string;
  dimensionName: string;
  description?: string;
  coreConceptGlyphs?: string[]; // Array of glyph names or simple IDs
}

interface WeaversSanctumViewProps {
  // dimensions prop removed as the component will fetch its own mock data for now
  onSelectDimension: (id: string) => void;
  onCreateNew: () => void;
}

const mockDimensions: SimplifiedDimension[] = [
  {
    dimensionUID: 'dim-001',
    dimensionName: 'Aethelgard - The First Echo',
    description: 'A realm of floating islands and arcane energies.',
    coreConceptGlyphs: ['SkyIslands', 'ArcaneMagic', 'AncientGuardians'],
  },
  {
    dimensionUID: 'dim-002',
    dimensionName: 'Chronomistral',
    description: 'A dimension where time flows like a river, often backwards.',
    coreConceptGlyphs: ['TimeFlux', 'CrystalSands', 'ParadoxSpirits'],
  },
  {
    dimensionUID: 'dim-003',
    dimensionName: 'Mycelia Prime',
    description: 'A vast, interconnected fungal network with collective consciousness.',
    coreConceptGlyphs: ['FungalNetwork', 'HiveMind', 'Bioluminescence'],
  },
  {
    dimensionUID: 'dim-004',
    dimensionName: 'The Obsidian Labyrinth',
    description: 'A ever-shifting maze of volcanic rock and shadow creatures.',
    coreConceptGlyphs: ['Darkness', 'Mazes', 'Volcanic'],
  },
];

const WeaversSanctumView: React.FC<WeaversSanctumViewProps> = ({
  onSelectDimension,
  onCreateNew,
}) => {
  const [dimensionList, setDimensionList] = useState<SimplifiedDimension[]>([]);
  const [selectedDimensionId, setSelectedDimensionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setDimensionList(mockDimensions);
      setIsLoading(false);
    }, 1500); // Simulate 1.5 seconds delay

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  const handleSelectDimension = (id: string) => {
    setSelectedDimensionId(id);
    onSelectDimension(id); // Call the prop callback
  };

  const selectedDimensionObject = dimensionList.find(dim => dim.dimensionUID === selectedDimensionId) || null;

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h2>Weaver's Sanctum</h2>
      <div style={{ border: '1px dashed blue', padding: '10px', margin: '5px' }}>
        <h3>Scroll of Worlds (Dimension List)</h3>
        {isLoading ? (
          <p>Loading dimensions...</p>
        ) : dimensionList.length > 0 ? (
          <ul>
            {dimensionList.map((dim) => (
              <li
                key={dim.dimensionUID}
                onClick={() => handleSelectDimension(dim.dimensionUID)}
                style={{
                  padding: '5px',
                  cursor: 'pointer',
                  backgroundColor: selectedDimensionId === dim.dimensionUID ? '#e0e0e0' : 'transparent'
                }}
              >
                <strong>{dim.dimensionName}</strong>
                {dim.description && <p style={{fontSize: '0.9em', margin: '2px 0 0 0'}}>{dim.description}</p>}
                {dim.coreConceptGlyphs && dim.coreConceptGlyphs.length > 0 && (
                  <p style={{fontSize: '0.8em', color: '#555', margin: '2px 0 0 0'}}>
                    Concepts: {dim.coreConceptGlyphs.join(', ')}
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No dimensions found. Consider creating one!</p>
        )}
      </div>
      <div style={{ border: '1px dashed green', padding: '10px', margin: '5px', textAlign: 'center' }}>
        {/* <h3>Preview Orb Placeholder</h3> Removed direct h3 to let DimensionPreviewOrb manage its title */}
        <DimensionPreviewOrb dimensionData={selectedDimensionObject} />
      </div>
      <div style={{ border: '1px dashed red', padding: '10px', margin: '5px' }}>
        <h3>Altar of Actions (Controls)</h3>
        <button onClick={onCreateNew}>Create New Dimension</button>
        <p>Other actions (edit, delete, publish) will be here.</p>
      </div>
    </div>
  );
};

export default WeaversSanctumView;
