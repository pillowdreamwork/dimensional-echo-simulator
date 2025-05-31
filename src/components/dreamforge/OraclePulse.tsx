import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { QuantumState } from '../../types/quantum';
import { Badge } from '../ui/badge';

export const OraclePulse: React.FC<{ quantumState: QuantumState }> = ({ quantumState }) => {
  const [predictedEcho, setPredictedEcho] = useState<string | null>(null);

  const predictEcho = () => {
    // Simple probability-based prediction for demonstration
    if (quantumState.probability > 0.8) {
      setPredictedEcho('High chance of real-world echo: Expect synchronicities.');
    } else if (quantumState.probability > 0.5) {
      setPredictedEcho('Moderate chance: Subtle ripples may manifest.');
    } else {
      setPredictedEcho('Low chance: Most effects remain in the dreamscape.');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Oracle Pulse
          <Badge variant="secondary">Quantum Oracle</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={predictEcho}>
            Predict Echo
          </button>
        </div>
        {predictedEcho && <div className="text-lg text-purple-700 dark:text-purple-300">{predictedEcho}</div>}
      </CardContent>
    </Card>
  );
};

export default OraclePulse;
