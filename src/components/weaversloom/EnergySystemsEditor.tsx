import React, { useState, useEffect } from 'react';
import { EnergySystem, GlyphUID } from '../../modules/weaversloom/index.types';

export interface EnergySystemsEditorProps {
  energySystemsData: EnergySystem[] | undefined | null;
  onChange: (updatedEnergySystemsData: EnergySystem[]) => void;
}

const defaultNewEnergySystem: () => EnergySystem = () => ({
  type: 'New System', // Users should change this
  source: 'Ambient',
  conversionEfficiency: 0.75,
  depletionRate: 0.1,
  synergiesWith: [],
  customProperties: {},
});

const EnergySystemsEditor: React.FC<EnergySystemsEditorProps> = ({ energySystemsData, onChange }) => {
  const [localEnergySystems, setLocalEnergySystems] = useState<EnergySystem[]>([]);

  useEffect(() => {
    setLocalEnergySystems(energySystemsData || []);
  }, [energySystemsData]);

  const handleSystemChange = (index: number, field: keyof EnergySystem, value: any) => {
    const updatedSystems = localEnergySystems.map((system, i) => {
      if (i === index) {
        return { ...system, [field]: value };
      }
      return system;
    });
    setLocalEnergySystems(updatedSystems);
    onChange(updatedSystems);
  };

  const handleAddSystem = () => {
    const newSystem = defaultNewEnergySystem();
    // Ensure unique type for new systems if necessary, or prompt user. For now, just adds.
    // Consider adding a temporary unique ID if systems need to be keyed before a permanent one is assigned.
    const updatedSystems = [...localEnergySystems, newSystem];
    setLocalEnergySystems(updatedSystems);
    onChange(updatedSystems);
  };

  const handleRemoveSystem = (index: number) => {
    const updatedSystems = localEnergySystems.filter((_, i) => i !== index);
    setLocalEnergySystems(updatedSystems);
    onChange(updatedSystems);
  };

  const inputStyle = { width: 'calc(100% - 16px)', padding: '8px', boxSizing: 'border-box', marginBottom: '10px', display: 'block' };
  const labelStyle = { display: 'block', marginBottom: '5px', fontWeight: 'bold' };

  return (
    <div style={{ border: '1px solid #eee', padding: '15px', borderRadius: '5px' }}>
      <h4 style={{ marginTop: 0, marginBottom: '15px' }}>Editing: Energy Systems</h4>

      {localEnergySystems.length === 0 && <p>No energy systems defined.</p>}

      {localEnergySystems.map((system, index) => (
        <div key={index} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px', borderRadius: '4px' }}>
          <h5 style={{marginTop: 0, marginBottom: '10px'}}>System {index + 1}: {system.type}</h5>

          <div>
            <label htmlFor={`esType-${index}`} style={labelStyle}>Type:</label>
            <input
              type="text"
              id={`esType-${index}`}
              value={system.type}
              onChange={(e) => handleSystemChange(index, 'type', e.target.value)}
              style={inputStyle}
              placeholder="e.g., Magic, Psionic"
            />
          </div>

          <div>
            <label htmlFor={`esSource-${index}`} style={labelStyle}>Source:</label>
            <select
              id={`esSource-${index}`}
              value={system.source}
              onChange={(e) => handleSystemChange(index, 'source', e.target.value as EnergySystem['source'])}
              style={inputStyle}
            >
              <option value="Ambient">Ambient</option>
              <option value="EntityGenerated">EntityGenerated</option>
              <option value="UserChannelled">UserChannelled</option>
              <option value="Custom">Custom</option>
            </select>
          </div>

          <div>
            <label htmlFor={`esConversion-${index}`} style={labelStyle}>Conversion Efficiency (0-1):</label>
            <input
              type="number"
              id={`esConversion-${index}`}
              value={system.conversionEfficiency || 0}
              onChange={(e) => handleSystemChange(index, 'conversionEfficiency', parseFloat(e.target.value) || 0)}
              step="0.01" min="0" max="1"
              style={inputStyle}
            />
          </div>

          <div>
            <label htmlFor={`esDepletion-${index}`} style={labelStyle}>Depletion Rate (0-1+):</label>
            <input
              type="number"
              id={`esDepletion-${index}`}
              value={system.depletionRate || 0}
              onChange={(e) => handleSystemChange(index, 'depletionRate', parseFloat(e.target.value) || 0)}
              step="0.01" min="0"
              style={inputStyle}
            />
          </div>

          <div style={{marginTop: '10px', padding: '8px', border: '1px dashed #f0f0f0', borderRadius: '3px'}}>
            <label style={labelStyle}>Synergy Glyphs:</label>
            {system.synergiesWith && system.synergiesWith.length > 0
                ? system.synergiesWith.join(', ')
                : <span style={{fontStyle: 'italic'}}>None</span>}
            <button
                onClick={() => console.log(`Manage Synergy Glyphs for system ${index} - Not implemented`)}
                style={{display: 'block', padding: '4px 8px', marginTop: '5px', fontSize: '0.9em'}}
            >
                Manage Glyphs
            </button>
          </div>

          {/* Custom Properties could be a JSON editor or dynamic key-value pair editor later */}
          {/* For now, not directly editable here */}


          <button
            onClick={() => handleRemoveSystem(index)}
            style={{marginTop: '10px', padding: '6px 10px', backgroundColor: '#ffdddd', border: '1px solid #ffaaaa', borderRadius: '3px', cursor: 'pointer'}}
          >
            Remove System {index + 1}
          </button>
        </div>
      ))}

      <button
        onClick={handleAddSystem}
        style={{marginTop: '15px', padding: '8px 12px', backgroundColor: '#ddffdd', border: '1px solid #aaffaa', borderRadius: '3px', cursor: 'pointer'}}
      >
        Add New Energy System
      </button>
    </div>
  );
};

export default EnergySystemsEditor;
