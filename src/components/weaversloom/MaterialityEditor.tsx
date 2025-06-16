import React, { useState, useEffect } from 'react';
import { MaterialityProfile, GlyphUID } from '../../modules/weaversloom/index.types';

export interface MaterialityEditorProps {
  materialityData: MaterialityProfile | undefined | null;
  onChange: (updatedMaterialityData: MaterialityProfile) => void;
}

const defaultMateriality: MaterialityProfile = {
  baseState: 'Solid',
  transmutability: 0.5,
  elementalSystem: [],
};

const MaterialityEditor: React.FC<MaterialityEditorProps> = ({ materialityData, onChange }) => {
  const [localMateriality, setLocalMateriality] = useState<MaterialityProfile | null>(null);

  useEffect(() => {
    if (materialityData) {
      setLocalMateriality(materialityData);
    } else {
      // Initialize with defaults if no data is provided (e.g., for a new blueprint)
      setLocalMateriality(defaultMateriality);
    }
  }, [materialityData]);

  const handleFieldChange = (
    field: keyof MaterialityProfile,
    value: string | number | GlyphUID[]
  ) => {
    if (!localMateriality) return; // Should not happen if defaults are set

    // Create a new object for the updated state
    const updatedMateriality: MaterialityProfile = {
      ...localMateriality,
      [field]: value,
    };

    setLocalMateriality(updatedMateriality);
    onChange(updatedMateriality); // Propagate change to parent
  };

  if (!localMateriality) {
    return <div>Loading materiality data or no data provided...</div>;
  }

  const inputStyle = { width: '100%', padding: '8px', boxSizing: 'border-box', marginBottom: '10px' };
  const labelStyle = { display: 'block', marginBottom: '5px', fontWeight: 'bold' };

  return (
    <div style={{ border: '1px solid #eee', padding: '15px', borderRadius: '5px' }}>
      <h4 style={{marginTop: 0, marginBottom: '15px'}}>Editing: Materiality Profile</h4>

      <div>
        <label htmlFor="matBaseState" style={labelStyle}>Base State:</label>
        <select
          id="matBaseState"
          value={localMateriality.baseState}
          onChange={(e) => handleFieldChange('baseState', e.target.value as MaterialityProfile['baseState'])}
          style={inputStyle}
        >
          <option value="Solid">Solid</option>
          <option value="Liquid">Liquid</option>
          <option value="Gaseous">Gaseous</option>
          <option value="Plasma">Plasma</option>
          <option value="PureEnergy">PureEnergy</option>
          <option value="Dreamstuff">Dreamstuff</option>
          <option value="Information">Information</option>
          <option value="Custom">Custom (enter string)</option>
        </select>
      </div>

      <div>
        <label htmlFor="matTransmutability" style={labelStyle}>Transmutability (0.0 - 1.0):</label>
        <input
          type="number"
          id="matTransmutability"
          value={localMateriality.transmutability}
          onChange={(e) => handleFieldChange('transmutability', parseFloat(e.target.value) || 0)}
          step="0.01"
          min="0"
          max="1"
          style={inputStyle}
        />
      </div>

      <div style={{marginTop: '15px', padding: '10px', border: '1px solid #f0f0f0', borderRadius: '4px'}}>
        <h5 style={{marginTop: 0, marginBottom: '10px'}}>Elemental System Glyphs</h5>
        {localMateriality.elementalSystem && localMateriality.elementalSystem.length > 0 ? (
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '10px'}}>
            {localMateriality.elementalSystem.map((glyph, index) => (
              <span key={index} style={{padding: '3px 6px', backgroundColor: '#e9e9e9', borderRadius: '3px', fontSize: '0.9em'}}>
                {glyph}
              </span>
            ))}
          </div>
        ) : (
          <p style={{fontStyle: 'italic', color: '#777'}}>No Elemental Glyphs defined.</p>
        )}
        <button
          onClick={() => console.log('Manage Elemental Glyphs - Not implemented. Current glyphs:', localMateriality.elementalSystem)}
          style={{padding: '6px 10px', marginTop: '5px'}}
        >
          Manage Elemental Glyphs
        </button>
      </div>
    </div>
  );
};

export default MaterialityEditor;
