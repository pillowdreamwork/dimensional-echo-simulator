import React from 'react';

// Re-defining SimplifiedDimension here for now.
// In a larger setup, this would be imported from a shared types file.
interface SimplifiedDimension {
  dimensionUID: string;
  dimensionName: string;
  description?: string;
  coreConceptGlyphs?: string[];
}

interface DimensionPreviewOrbProps {
  dimensionData: SimplifiedDimension | null | undefined;
  size?: number; // Optional size for the orb display
}

const DimensionPreviewOrb: React.FC<DimensionPreviewOrbProps> = ({
  dimensionData,
  size = 200, // Default size in pixels
}) => {
  const displayContent = () => {
    if (dimensionData) {
      return (
        <>
          <p><strong>{dimensionData.dimensionName}</strong></p>
          {dimensionData.description && (
            <p style={{ fontSize: '0.9em', margin: '5px 0' }}>
              {dimensionData.description}
            </p>
          )}
          {dimensionData.coreConceptGlyphs && dimensionData.coreConceptGlyphs.length > 0 && (
            <p style={{ fontSize: '0.8em', color: '#555' }}>
              Concepts: {dimensionData.coreConceptGlyphs.join(', ')}
            </p>
          )}
        </>
      );
    }
    return <p>Select a dimension to preview.</p>;
  };

  return (
    <div
      style={{
        border: '2px solid gold',
        borderRadius: '10px', // Using a slight rounding instead of 50% for more space
        width: `${size}px`,
        minHeight: `${size}px`, // Use minHeight to allow content to expand
        padding: '20px',
        margin: '10px auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: dimensionData ? '#fff8e1' : '#f0f0f0', // Change background if data exists
        transition: 'background-color 0.3s ease',
      }}
    >
      <h4>Preview Orb</h4>
      {displayContent()}
      {/* More sophisticated visual representation would go here later */}
    </div>
  );
};

export default DimensionPreviewOrb;
