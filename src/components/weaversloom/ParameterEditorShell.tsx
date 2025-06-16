import React from 'react';

interface ParameterEditorShellProps {
  title: string;
  children: React.ReactNode;
  // Could add other common props like isLoading, error, etc.
}

const ParameterEditorShell: React.FC<ParameterEditorShellProps> = ({
  title,
  children,
}) => {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '15px',
        margin: '10px 0',
        backgroundColor: '#f9f9f9'
      }}
    >
      <h3 style={{ marginTop: '0', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
        {title}
      </h3>
      <div>
        {children}
      </div>
      {/* Common actions like 'Save Section' or 'Reset Section' could go here */}
    </div>
  );
};

export default ParameterEditorShell;
