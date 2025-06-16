import React, { useState, useEffect } from 'react';
import {
import React, { useState, useEffect } from 'react';
import {
  DimensionBlueprint,
  CoreIdentityAndBlueprint,
  SpatioTemporalFabric,
  MaterialityProfile,
  EnergySystem,
  InteractionLaw // Added
} from '../../modules/weaversloom/index.types';
import IdentityCoreEditor from './IdentityCoreEditor';
import SpatioTemporalFabricEditor from './SpatioTemporalFabricEditor';
import MaterialityEditor from './MaterialityEditor';
import EnergySystemsEditor from './EnergySystemsEditor';
import InteractionLawsEditor from './InteractionLawsEditor'; // Added

interface WeaversLoomEditorViewProps {
  initialBlueprint?: DimensionBlueprint | null;
  onSave: (updatedBlueprint: DimensionBlueprint) => void;
  // Potentially other callbacks like onExit, onNavigateAspect, etc.
}

const DIMENSION_ASPECTS: { key: keyof DimensionBlueprint | 'customEntities'; name: string }[] = [
  { key: 'identity', name: 'Identity & Core' },
  { key: 'fabric', name: 'Fabric (Space-Time)' },
  { key: 'materiality', name: 'Materiality' },
  { key: 'energySystems', name: 'Energy Systems' },
  { key: 'interactionLaws', name: 'Interaction Laws' },
  { key: 'sentience', name: 'Sentience & Consciousness' },
  { key: 'stability', name: 'Stability & Evolution' },
  { key: 'aesthetics', name: 'Aesthetics & Sensory Profile' },
  { key: 'initialEntitySeedings', name: 'Initial Entities' },
  // Example for a section not directly on DimensionBlueprint, if needed later:
  // { key: 'customEntities', name: 'Custom Entity Design' }
];


const WeaversLoomEditorView: React.FC<WeaversLoomEditorViewProps> = ({
  initialBlueprint,
  onSave,
}) => {
  const [activeBlueprint, setActiveBlueprint] = useState<DimensionBlueprint | null>(null);
  const [selectedAspectKey, setSelectedAspectKey] = useState<string | null>(
    DIMENSION_ASPECTS.length > 0 ? DIMENSION_ASPECTS[0].key : null
  );

  useEffect(() => {
    // Synchronize activeBlueprint with the initialBlueprint prop
    // This handles initial load and subsequent changes to initialBlueprint if the component instance persists
    if (initialBlueprint) {
      // Consider deep cloning if direct mutation of prop objects is a concern,
      // though for setting state it's usually fine.
      setActiveBlueprint(initialBlueprint);
    } else {
      setActiveBlueprint(null);
    }
  }, [initialBlueprint]);

  const dimensionName = activeBlueprint?.identity?.dimensionName || 'New Dimension';

  const handleSave = () => {
    if (activeBlueprint) {
      onSave(activeBlueprint);
    } else {
      console.warn("Attempted to save without an active blueprint. No save action taken.");
    }
  };

  // TODO: Implement functions to modify activeBlueprint, e.g., handleInputChange
  // const handleInputChange = (aspect: keyof DimensionBlueprint, field: string, value: any) => {
  //   setActiveBlueprint(prev => {
  //     if (!prev) return null;
  //     // This is a simplified update, proper deep update logic would be needed
  //     return {
  //       ...prev,
  //       [aspect]: {
  //         ...(prev[aspect] as any), // Type assertion needed for generic aspect
  //         [field]: value,
  //       },
  //     };
  //   });
  // };

  if (!activeBlueprint && initialBlueprint !== undefined) {
    // This condition might indicate that initialBlueprint was explicitly set to null,
    // or it's still loading/being processed by useEffect.
    // Depending on desired UX, a loading spinner or specific message could be shown here.
    // For now, it will fall through and show "New Dimension" and empty fields.
  }

  // If initialBlueprint is undefined (e.g. parent is still fetching it),
  // activeBlueprint will be null, and UI will show "New Dimension".
  // This is acceptable for this stage.

  const handleIdentityChange = (updatedIdentityData: CoreIdentityAndBlueprint) => {
    setActiveBlueprint(prev => prev ? ({ ...prev, identity: updatedIdentityData }) : null);
  };

  const handleFabricChange = (updatedFabricData: SpatioTemporalFabric) => {
    setActiveBlueprint(prev => prev ? ({ ...prev, fabric: updatedFabricData }) : null);
  };

  const handleMaterialityChange = (updatedMaterialityData: MaterialityProfile) => {
    setActiveBlueprint(prev => prev ? ({ ...prev, materiality: updatedMaterialityData }) : null);
  };

  const handleEnergySystemsChange = (updatedEnergySystemsData: EnergySystem[]) => {
    setActiveBlueprint(prev => prev ? ({ ...prev, energySystems: updatedEnergySystemsData }) : null);
  };

  const handleInteractionLawsChange = (updatedLawsData: InteractionLaw[]) => {
    setActiveBlueprint(prev => prev ? ({ ...prev, interactionLaws: updatedLawsData }) : null);
  };

  // Add similar handlers for other aspects as their editors are created

  const selectedAspectName = DIMENSION_ASPECTS.find(aspect => aspect.key === selectedAspectKey)?.name || 'No Aspect Selected';

  const renderEditorForSelectedAspect = () => {
    if (!activeBlueprint) {
      return <p>Loading blueprint data or no blueprint selected...</p>;
    }

    switch (selectedAspectKey) {
      case 'identity':
        return (
          <IdentityCoreEditor
            identityData={activeBlueprint.identity}
            onChange={handleIdentityChange}
          />
        );
      case 'fabric':
        return (
          <SpatioTemporalFabricEditor
            fabricData={activeBlueprint.fabric}
            onChange={handleFabricChange}
          />
        );
      case 'materiality':
        return (
          <MaterialityEditor
            materialityData={activeBlueprint.materiality}
            onChange={handleMaterialityChange}
          />
        );
      case 'energySystems':
        return (
          <EnergySystemsEditor
            energySystemsData={activeBlueprint.energySystems}
            onChange={handleEnergySystemsChange}
          />
        );
      case 'interactionLaws':
        return (
          <InteractionLawsEditor
            lawsData={activeBlueprint.interactionLaws}
            onChange={handleInteractionLawsChange}
          />
        );
      // Add cases for other aspects here as their editors are built
      default:
        return <p>Editing: <strong>{selectedAspectName}</strong> (Editor not implemented yet)</p>;
    }
  };

  return (
    <div style={{ border: '1px solid #444', padding: '10px', margin: '10px' }}>
      <h2>Weaver's Loom Editor: {dimensionName}</h2>

      <div style={{ border: '1px dashed orange', padding: '10px', margin: '5px' }}>
        <h4>Dimension Overview Bar</h4>
        <p>Editing: {activeBlueprint?.identity?.dimensionUID || 'N/A'}</p>
        <p>Version: {activeBlueprint?.version || 'N/A'}</p>
        <button onClick={handleSave}>Save Blueprint</button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
        <div style={{ border: '1px dashed purple', padding: '10px', margin: '5px', width: '20%' }}>
          <h3>Navigation Pillar</h3>
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            {DIMENSION_ASPECTS.map((aspect) => (
              <li key={aspect.key} style={{ marginBottom: '5px' }}>
                <button
                  onClick={() => setSelectedAspectKey(aspect.key)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '8px',
                    backgroundColor: selectedAspectKey === aspect.key ? '#e0e0e0' : 'transparent',
                    fontWeight: selectedAspectKey === aspect.key ? 'bold' : 'normal',
                    border: '1px solid #ccc',
                    cursor: 'pointer'
                  }}
                >
                  {aspect.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ border: '1px dashed teal', padding: '10px', margin: '5px', width: '50%' }}>
          <h3>Focus Crystal (Parameter Editor Area)</h3>
          {renderEditorForSelectedAspect()}
        </div>

        <div style={{ border: '1px dashed brown', padding: '10px', margin: '5px', width: '25%' }}>
          <h3>SiderAI Panel Placeholder</h3>
          <p>AI suggestions, validation feedback, lore generation help.</p>
        </div>
      </div>
    </div>
  );
};

export default WeaversLoomEditorView;
