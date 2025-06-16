import React, { useState, useEffect } from 'react'; // Imported useState, useEffect
import { CoreIdentityAndBlueprint, GlyphUID, DimensionalFrequency } from '../../modules/weaversloom/index.types';

export interface IdentityCoreEditorProps {
  identityData: CoreIdentityAndBlueprint | undefined | null;
  // The onChange will likely need to be more granular in a real implementation,
  // e.g., onChangeField(fieldName: keyof CoreIdentityAndBlueprint, value: any)
  // For now, a full object update is a placeholder.
  onChange: (updatedIdentityData: CoreIdentityAndBlueprint) => void;
}

const IdentityCoreEditor: React.FC<IdentityCoreEditorProps> = ({ identityData, onChange }) => {
  const [localDimensionName, setLocalDimensionName] = useState<string>('');
  const [localDescription, setLocalDescription] = useState<string>('');
  const [localCoreConceptGlyphs, setLocalCoreConceptGlyphs] = useState<GlyphUID[]>([]);

  useEffect(() => {
    if (identityData) {
      setLocalDimensionName(identityData.dimensionName);
      setLocalDescription(identityData.description);
      setLocalCoreConceptGlyphs(identityData.coreConceptGlyphs || []);
    } else {
      // Reset to defaults if identityData is null/undefined
      setLocalDimensionName('');
      setLocalDescription('');
      setLocalCoreConceptGlyphs([]);
    }
  }, [identityData]);

  // The main onChange prop will be called differently later, perhaps on blur or via a save button for this section.
  // For now, inputs update local state. The parent onChange is not called on every keystroke.
  // Example of how a specific field change could propagate (will be refined in Step 5):
  // const handleNameChange = (newName: string) => {
  //   setLocalDimensionName(newName);
  //   if (identityData) {
  //     onChange({ ...identityData, dimensionName: newName });
  //   }
  // };

  const handleInputChange = (field: keyof CoreIdentityAndBlueprint, value: string | GlyphUID[]) => {
    if (!identityData) return;

    let updatedIdentityData: CoreIdentityAndBlueprint = { ...identityData };

    if (field === 'dimensionName') {
      setLocalDimensionName(value as string);
      updatedIdentityData.dimensionName = value as string;
    } else if (field === 'description') {
      setLocalDescription(value as string);
      updatedIdentityData.description = value as string;
    }
    // Note: localCoreConceptGlyphs is managed separately and would call a similar function
    // if its management UI were implemented. For now, it's passed through.
    updatedIdentityData.coreConceptGlyphs = localCoreConceptGlyphs;


    onChange(updatedIdentityData);
  };


  if (!identityData) {
    return <div>No identity data provided or dimension blueprint not loaded.</div>;
  }

  return (
    <div style={{ border: '1px solid #eee', padding: '15px', borderRadius: '5px' }}>
      <h3>Editing: Identity & Core</h3>

      <div>
        <label htmlFor="dimensionName" style={{ display: 'block', marginBottom: '5px' }}>
          Dimension Name:
        </label>
        <input
          type="text"
          id="dimensionName"
          value={localDimensionName}
          onChange={(e) => handleInputChange('dimensionName', e.target.value)}
          placeholder="Enter dimension name"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>

      <div style={{marginTop: '10px'}}>
        <label htmlFor="description" style={{ display: 'block', marginBottom: '5px' }}>
          Description:
        </label>
        <textarea
          id="description"
          value={localDescription}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Enter dimension description"
          rows={4}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>

      {/* These fields are generally not directly editable here but are part of the identityData */}
      <p style={{marginTop: '10px'}}>Dimension UID: {identityData.dimensionUID}</p>
      <p>Creator UID: {identityData.creatorUID}</p>
      <p>Creation Timestamp: {new Date(identityData.creationTimestamp).toLocaleString()}</p>

      {/* CoreConceptGlyphs display and placeholder for management */}
      <div style={{marginTop: '15px', padding: '10px', border: '1px solid #f0f0f0', borderRadius: '4px'}}>
        <h4 style={{marginTop: 0, marginBottom: '10px'}}>Core Concept Glyphs</h4>
        {localCoreConceptGlyphs.length > 0 ? (
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '10px'}}>
            {localCoreConceptGlyphs.map((glyph, index) => (
              <span key={index} style={{padding: '3px 6px', backgroundColor: '#e9e9e9', borderRadius: '3px', fontSize: '0.9em'}}>
                {glyph}
              </span>
            ))}
          </div>
        ) : (
          <p style={{fontStyle: 'italic', color: '#777'}}>No Core Concept Glyphs defined.</p>
        )}
        <button
          onClick={() => console.log('Manage Core Concept Glyphs - Not implemented')}
          style={{padding: '6px 10px', marginTop: '5px'}}
        >
          Select Glyphs
        </button>
        {/* No direct input fields for adding/removing glyph UIDs here. */}
      </div>

      {/* Placeholder for dimensionalFrequency editor - still directly from prop as it's not locally editable yet */}
      <div style={{marginTop: '10px'}}>
        <strong>Dimensional Frequency (Base):</strong>
        {identityData.dimensionalFrequency ? <span> {identityData.dimensionalFrequency.base}</span> : ' N/A'}
        {/* TODO: Add UI to edit frequency components */}
      </div>

      {/* More fields will be added here based on CoreIdentityAndBlueprint structure */}
    </div>
  );
};

export default IdentityCoreEditor;
