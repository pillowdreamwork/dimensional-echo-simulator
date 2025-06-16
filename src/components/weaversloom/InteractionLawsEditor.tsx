import React, { useState, useEffect } from 'react'; // Imported useState, useEffect
import { InteractionLaw, LawTrigger, LawEffect } from '../../modules/weaversloom/index.types';

export interface InteractionLawsEditorProps {
  lawsData: InteractionLaw[] | undefined | null;
  onChange: (updatedLawsData: InteractionLaw[]) => void;
}

const InteractionLawsEditor: React.FC<InteractionLawsEditorProps> = ({ lawsData, onChange }) => {
  const [localLaws, setLocalLaws] = useState<InteractionLaw[]>([]);

  useEffect(() => {
    setLocalLaws(lawsData || []);
  }, [lawsData]);

  const generateUID = () => `law-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

  const handleAddLaw = () => {
    const newLaw: InteractionLaw = {
      lawUID: generateUID(),
      description: 'New Law',
      trigger: { conditionType: '', parameters: {} },
      effect: { effectType: '', parameters: {} },
      probability: 1,
      isEnabled: true,
    };
    const updatedLaws = [...localLaws, newLaw];
    setLocalLaws(updatedLaws);
    onChange(updatedLaws);
  };

  const handleRemoveLaw = (indexToRemove: number) => {
    const updatedLaws = localLaws.filter((_, index) => index !== indexToRemove);
    setLocalLaws(updatedLaws);
    onChange(updatedLaws);
  };

  const handleLawPropertyChange = (index: number, fieldPath: string, value: any) => {
    const keys = fieldPath.split('.');
    const updatedLaws = localLaws.map((law, i) => {
      if (i === index) {
        let newLaw = { ...law };
        let currentLevel: any = newLaw;

        keys.forEach((key, level) => {
          if (level === keys.length - 1) {
            currentLevel[key] = value;
          } else {
            currentLevel[key] = { ...(currentLevel[key] || {}) }; // Ensure nested object exists
            currentLevel = currentLevel[key];
          }
        });

        // Ensure trigger and effect objects exist with default parameters if they are being modified
        if (keys[0] === 'trigger' && !newLaw.trigger) {
            newLaw.trigger = { conditionType: '', parameters: {} };
        }
        if (keys[0] === 'effect' && !newLaw.effect) {
            newLaw.effect = { effectType: '', parameters: {} };
        }

        // Handle JSON string for parameters
        if (fieldPath === 'trigger.parameters' || fieldPath === 'effect.parameters') {
            try {
                currentLevel[keys[keys.length-1]] = JSON.parse(value);
            } catch (e) {
                // If parsing fails, store as string or handle error
                // For now, we'll just keep the string value if it's not valid JSON
                // This might not be ideal; a proper JSON editor/validator would be better.
                currentLevel[keys[keys.length-1]] = value;
                console.warn(`Invalid JSON for ${fieldPath}: ${value}`);
            }
        }


        return newLaw;
      }
      return law;
    });
    setLocalLaws(updatedLaws);
    onChange(updatedLaws);
  };

  const inputStyle = { width: 'calc(100% - 16px)', padding: '8px', boxSizing: 'border-box', marginBottom: '5px', display: 'block', border: '1px solid #ccc', borderRadius: '3px' };
  const labelStyle = { display: 'block', marginBottom: '3px', fontWeight: 'normal', fontSize: '0.9em' };
  const lawBlockStyle = { border: '1px solid #ddd', padding: '10px', marginBottom: '10px', borderRadius: '4px' };
  const nestedBlockStyle = { marginLeft: '10px', paddingLeft: '10px', borderLeft: '2px solid #eee', marginTop: '5px' };


  if (localLaws.length === 0) {
    return (
      <div style={{ border: '1px solid #eee', padding: '15px', borderRadius: '5px' }}>
        <h4 style={{ marginTop: 0, marginBottom: '15px' }}>Editing: Interaction Laws</h4>
        <p>No interaction laws defined for this dimension.</p>
        <button
          onClick={handleAddLaw}
          style={{padding: '6px 10px', marginTop: '5px'}}
        >
          Add New Interaction Law
        </button>
      </div>
    );
  }

  return (
    <div style={{ border: '1px solid #eee', padding: '15px', borderRadius: '5px' }}>
      <h4 style={{ marginTop: 0, marginBottom: '15px' }}>Editing: Interaction Laws</h4>
      {localLaws.map((law, index) => (
        <div key={law.lawUID || index} style={lawBlockStyle}>
          <strong style={{display: 'block', marginBottom: '5px'}}>Law {index + 1} (UID: {law.lawUID || 'N/A - Will be generated'})</strong>

          <div>
            <label htmlFor={`lawDesc-${index}`} style={labelStyle}>Description:</label>
            <input
              type="text"
              id={`lawDesc-${index}`}
              value={law.description || ''}
              onChange={(e) => handleLawPropertyChange(index, 'description', e.target.value)}
              style={inputStyle}
              placeholder="Law description"
            />
          </div>

          <div style={nestedBlockStyle}>
            <h5 style={{fontSize: '1em', marginTop: '10px', marginBottom: '5px'}}>Trigger</h5>
            <div>
              <label htmlFor={`lawTrigType-${index}`} style={labelStyle}>Condition Type:</label>
              <input
                type="text"
                id={`lawTrigType-${index}`}
                value={law.trigger?.conditionType || ''}
                onChange={(e) => handleLawPropertyChange(index, 'trigger.conditionType', e.target.value)}
                style={inputStyle}
                placeholder="e.g., GlyphActive"
              />
            </div>
            <div>
              <label htmlFor={`lawTrigParams-${index}`} style={labelStyle}>Parameters (JSON):</label>
              <textarea
                id={`lawTrigParams-${index}`}
                value={typeof law.trigger?.parameters === 'object' ? JSON.stringify(law.trigger.parameters, null, 2) : (law.trigger?.parameters || '')}
                onChange={(e) => handleLawPropertyChange(index, 'trigger.parameters', e.target.value)}
                style={{...inputStyle, height: '60px', fontFamily: 'monospace'}}
                placeholder='{ "glyph": "fire_glyph_uid" }'
              />
            </div>
          </div>

          <div style={nestedBlockStyle}>
            <h5 style={{fontSize: '1em', marginTop: '10px', marginBottom: '5px'}}>Effect</h5>
            <div>
              <label htmlFor={`lawEffectType-${index}`} style={labelStyle}>Effect Type:</label>
              <input
                type="text"
                id={`lawEffectType-${index}`}
                value={law.effect?.effectType || ''}
                onChange={(e) => handleLawPropertyChange(index, 'effect.effectType', e.target.value)}
                style={inputStyle}
                placeholder="e.g., SpawnEntity"
              />
            </div>
            <div>
              <label htmlFor={`lawEffectParams-${index}`} style={labelStyle}>Parameters (JSON):</label>
              <textarea
                id={`lawEffectParams-${index}`}
                value={typeof law.effect?.parameters === 'object' ? JSON.stringify(law.effect.parameters, null, 2) : (law.effect?.parameters || '')}
                onChange={(e) => handleLawPropertyChange(index, 'effect.parameters', e.target.value)}
                style={{...inputStyle, height: '60px', fontFamily: 'monospace'}}
                placeholder='{ "entityArchetype": "sprite_fire" }'
              />
            </div>
          </div>

          <div style={{marginTop: '10px'}}>
            <label htmlFor={`lawProb-${index}`} style={labelStyle}>Probability (0-1):</label>
            <input
              type="number"
              id={`lawProb-${index}`}
              value={law.probability ?? 1}
              onChange={(e) => handleLawPropertyChange(index, 'probability', parseFloat(e.target.value))}
              step="0.01" min="0" max="1"
              style={inputStyle}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
            <input
              type="checkbox"
              id={`lawEnabled-${index}`}
              checked={law.isEnabled ?? true}
              onChange={(e) => handleLawPropertyChange(index, 'isEnabled', e.target.checked)}
              style={{ marginRight: '5px', height: '16px', width: '16px' }}
            />
            <label htmlFor={`lawEnabled-${index}`} style={{...labelStyle, marginBottom: 0, fontWeight: 'normal' }}>Enabled</label>
          </div>
          <button
            onClick={() => handleRemoveLaw(index)}
            style={{marginTop: '10px', padding: '4px 8px', backgroundColor: '#ffebee', border: '1px solid #ffcdd2', borderRadius: '3px', cursor: 'pointer', fontSize: '0.9em'}}
          >
            Remove Law
          </button>
        </div>
      ))}
      <button
        onClick={handleAddLaw}
        style={{padding: '6px 10px', marginTop: '10px'}}
      >
        Add New Interaction Law
      </button>
      {/* More detailed UI for editing each law will be implemented later. */}
    </div>
  );
};

export default InteractionLawsEditor;
