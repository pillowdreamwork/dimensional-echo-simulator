import React, { useState, useEffect } from 'react'; // Imported useState, useEffect
import {
  SpatioTemporalFabric,
  SpatialGeometry,
  TemporalFlow,
  AethericConstants
} from '../../modules/weaversloom/index.types';

export interface SpatioTemporalFabricEditorProps {
  fabricData: SpatioTemporalFabric | undefined | null;
  onChange: (updatedFabricData: SpatioTemporalFabric) => void;
}

const SpatioTemporalFabricEditor: React.FC<SpatioTemporalFabricEditorProps> = ({ fabricData, onChange }) => {
  const [localFabricData, setLocalFabricData] = useState<SpatioTemporalFabric | null>(null);

  useEffect(() => {
    if (fabricData) {
      setLocalFabricData(fabricData);
    } else {
      setLocalFabricData(null); // Set to null if prop is null/undefined
    }
  }, [fabricData]);

  if (!localFabricData) {
    return <div>No Spatio-Temporal Fabric data provided or blueprint not loaded.</div>;
  }

  // Placeholder for more detailed input components later
  // For now, just displaying the data from localFabricData.
  // Example of how a change might be handled for a nested property:
  // const handleSpatialTypeChange = (newType: string) => {
  //   if (!localFabricData) return;
  //   const updatedSpatialGeometry = { ...localFabricData.spatialGeometry, type: newType };
  //   const newFabricData = { ...localFabricData, spatialGeometry: updatedSpatialGeometry };
  //   setLocalFabricData(newFabricData);
  //   // onChange(newFabricData); // This would be called later, perhaps on blur or a section save
  // };

  const handleSpatialGeometryChange = (
    field: keyof SpatialGeometry,
    value: string | number | boolean
  ) => {
    if (!localFabricData) return;

    const updatedSpatialGeometry: SpatialGeometry = {
      ...localFabricData.spatialGeometry,
      [field]: value,
    };
    // Ensure dimensionality is stored as appropriate type (number or string)
    if (field === 'dimensionality') {
        const numValue = parseFloat(value as string);
        updatedSpatialGeometry.dimensionality = isNaN(numValue) ? (value as string) : numValue;
    }

    const newFabricData = {
      ...localFabricData,
      spatialGeometry: updatedSpatialGeometry,
    };
    setLocalFabricData(newFabricData);
    onChange(newFabricData);
  };

  const handleTemporalFlowChange = (
    field: keyof TemporalFlow,
    value: string | boolean
  ) => {
    if (!localFabricData) return;

    const updatedTemporalFlow: TemporalFlow = {
      ...localFabricData.temporalFlow,
      [field]: value,
    };

    const newFabricData = {
      ...localFabricData,
      temporalFlow: updatedTemporalFlow,
    };
    setLocalFabricData(newFabricData);
    onChange(newFabricData);
  };

  const handleAethericConstantChange = (
    field: keyof AethericConstants,
    value: string // Input value is always string
  ) => {
    if (!localFabricData) return;
    const numericValue = parseFloat(value); // Or Number(value)

    // Basic validation: if parsing fails, maybe don't update or set to a default/previous value
    // For now, if it's NaN, it might cause issues downstream if not handled by type system or further validation.
    // Consider adding more robust parsing and error handling if needed.

    const updatedAethericConstants: AethericConstants = {
      ...localFabricData.aethericConstants,
      [field]: isNaN(numericValue) ? 0 : numericValue, // Default to 0 if parse fails, adjust as needed
    };

    const newFabricData = {
      ...localFabricData,
      aethericConstants: updatedAethericConstants,
    };
    setLocalFabricData(newFabricData);
    onChange(newFabricData);
  };

  const inputStyle = { width: '100%', padding: '8px', boxSizing: 'border-box', marginBottom: '10px' };
  const labelStyle = { display: 'block', marginBottom: '5px', fontWeight: 'bold' };

  return (
    <div style={{ border: '1px solid #eee', padding: '15px', borderRadius: '5px' }}>
      <h4>Editing: Fabric (Space-Time)</h4>

      {/* Section for Spatial Geometry */}
      <div style={{ marginTop: '10px', paddingBottom: '10px', borderBottom: '1px dashed #ccc' }}>
        <h5 style={{ marginTop: '0', marginBottom: '10px' }}>Spatial Geometry</h5>

        <div>
          <label htmlFor="sgType" style={labelStyle}>Type:</label>
          <select
            id="sgType"
            value={localFabricData.spatialGeometry.type}
            onChange={(e) => handleSpatialGeometryChange('type', e.target.value as SpatialGeometry['type'])}
            style={inputStyle}
          >
            <option value="Euclidean">Euclidean</option>
            <option value="Hyperbolic">Hyperbolic</option>
            <option value="Spherical">Spherical</option>
            <option value="AbstractGraph">AbstractGraph</option>
            <option value="Unmanifest">Unmanifest</option>
            <option value="Custom">Custom (enter string)</option>
          </select>
        </div>

        <div>
          <label htmlFor="sgDimensionality" style={labelStyle}>Dimensionality:</label>
          <input
            type="text"
            id="sgDimensionality"
            value={localFabricData.spatialGeometry.dimensionality.toString()}
            onChange={(e) => handleSpatialGeometryChange('dimensionality', e.target.value)}
            placeholder="e.g., 3, 'Fractal', or custom string"
            style={inputStyle}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            id="sgAllowsLooping"
            checked={!!localFabricData.spatialGeometry.allowsLooping}
            onChange={(e) => handleSpatialGeometryChange('allowsLooping', e.target.checked)}
            style={{ marginRight: '10px', height: '16px', width: '16px' }}
          />
          <label htmlFor="sgAllowsLooping" style={{ fontWeight: 'bold', marginBottom: 0 /* override labelStyle */ }}>Allows Looping?</label>
        </div>
      </div>

      {/* Section for Temporal Flow */}
      <div style={{ marginTop: '10px', paddingBottom: '10px', borderBottom: '1px dashed #ccc' }}>
        <h5 style={{ marginTop: '0', marginBottom: '10px' }}>Temporal Flow</h5>

        <div>
          <label htmlFor="tfRate" style={labelStyle}>Rate:</label>
          <select
            id="tfRate"
            value={localFabricData.temporalFlow.rate}
            onChange={(e) => handleTemporalFlowChange('rate', e.target.value as TemporalFlow['rate'])}
            style={inputStyle}
          >
            <option value="Static">Static</option>
            <option value="Slow">Slow</option>
            <option value="Normal">Normal</option>
            <option value="Accelerated">Accelerated</option>
            <option value="Erratic">Erratic</option>
            <option value="UserDriven">UserDriven</option>
            <option value="Custom">Custom (enter string)</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <input
            type="checkbox"
            id="tfIsCyclical"
            checked={!!localFabricData.temporalFlow.isCyclical}
            onChange={(e) => handleTemporalFlowChange('isCyclical', e.target.checked)}
            style={{ marginRight: '10px', height: '16px', width: '16px' }}
          />
          <label htmlFor="tfIsCyclical" style={{ fontWeight: 'bold', marginBottom: 0 }}>Is Cyclical?</label>
        </div>

        <div>
          <label htmlFor="tfParadoxTolerance" style={labelStyle}>Paradox Tolerance:</label>
          <select
            id="tfParadoxTolerance"
            value={localFabricData.temporalFlow.paradoxTolerance || 'none'} // Default to 'none' if undefined
            onChange={(e) => handleTemporalFlowChange('paradoxTolerance', e.target.value as TemporalFlow['paradoxTolerance'])}
            style={inputStyle}
          >
            <option value="none">None</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="Custom">Custom (enter string)</option>
          </select>
        </div>
      </div>

      {/* Section for Aetheric Constants */}
      <div style={{ marginTop: '10px' }}>
        <h5 style={{ marginTop: '0', marginBottom: '10px' }}>Aetheric Constants</h5>

        <div>
          <label htmlFor="acCohesionFactor" style={labelStyle}>Cohesion Factor:</label>
          <input
            type="number"
            id="acCohesionFactor"
            value={localFabricData.aethericConstants.cohesionFactor}
            onChange={(e) => handleAethericConstantChange('cohesionFactor', e.target.value)}
            step="0.01"
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="acLuminaFlux" style={labelStyle}>Lumina Flux:</label>
          <input
            type="number"
            id="acLuminaFlux"
            value={localFabricData.aethericConstants.luminaFlux}
            onChange={(e) => handleAethericConstantChange('luminaFlux', e.target.value)}
            step="0.01"
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="acManaDensity" style={labelStyle}>Mana Density:</label>
          <input
            type="number"
            id="acManaDensity"
            value={localFabricData.aethericConstants.manaDensity}
            onChange={(e) => handleAethericConstantChange('manaDensity', e.target.value)}
            step="0.01"
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="acEntropyRate" style={labelStyle}>Entropy Rate:</label>
          <input
            type="number"
            id="acEntropyRate"
            value={localFabricData.aethericConstants.entropyRate}
            onChange={(e) => handleAethericConstantChange('entropyRate', e.target.value)}
            step="0.01"
            style={inputStyle}
          />
        </div>
      </div>
    </div>
  );
};

export default SpatioTemporalFabricEditor;
