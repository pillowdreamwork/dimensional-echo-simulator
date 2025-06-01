import { useState, useEffect } from 'react';
import { useQuantumState } from '../../hooks/use-quantum-state';
import { askGPT, streamGPT } from '../../lib/ai/gptService';

interface Archetype {
  id: string;
  name: string;
  description: string;
  resonancePatterns: string[];
  quantumAttributes: {
    [key: string]: number;
  };
  evolutionStage: number;
}

export function ArchetypeCustomizer() {
  const { quantumState, updateQuantumState } = useQuantumState();
  const [archetypes, setArchetypes] = useState<Archetype[]>([]);
  const [selectedArchetype, setSelectedArchetype] = useState<Archetype | null>(null);
  const [isEvolvingArchetype, setIsEvolvingArchetype] = useState(false);
  const [evolutionLog, setEvolutionLog] = useState<string>('');

  async function generateNewArchetype(basePattern: string) {
    const prompt = `Generate a quantum archetype based on the pattern: ${basePattern}. Include resonance patterns and quantum attributes.`;
    const response = await askGPT(prompt, {
      systemPrompt: 'You are a quantum archetype designer specializing in dimensional resonance patterns.'
    });

    try {
      // Parse the AI response to create structured archetype data
      const lines = response.split('\n');
      const newArchetype: Archetype = {
        id: Date.now().toString(),
        name: lines[0].replace('Name:', '').trim(),
        description: lines.find(l => l.startsWith('Description:'))?.replace('Description:', '').trim() || '',
        resonancePatterns: lines
          .filter(l => l.startsWith('- Pattern:'))
          .map(l => l.replace('- Pattern:', '').trim()),
        quantumAttributes: {
          harmony: Math.random() * 100,
          complexity: Math.random() * 100,
          resonance: Math.random() * 100,
          stability: Math.random() * 100
        },
        evolutionStage: 1
      };

      setArchetypes(prev => [...prev, newArchetype]);
      updateQuantumState({ lastGeneratedArchetype: newArchetype });
    } catch (err) {
      console.error('Error parsing archetype:', err);
    }
  }

  async function evolveArchetype(archetype: Archetype) {
    setIsEvolvingArchetype(true);
    setEvolutionLog('');

    const evolutionStream = streamGPT(
      `Evolve the quantum archetype "${archetype.name}" to its next stage. Current description: ${archetype.description}. Consider its current resonance patterns: ${archetype.resonancePatterns.join(', ')}`,
      { systemPrompt: 'You are a quantum evolution guide specializing in archetype transformation.' }
    );

    let evolvedDescription = '';
    for await (const chunk of evolutionStream) {
      evolvedDescription += chunk;
      setEvolutionLog(prev => prev + chunk);
    }

    const evolvedArchetype: Archetype = {
      ...archetype,
      description: evolvedDescription.trim(),
      evolutionStage: archetype.evolutionStage + 1,
      quantumAttributes: {
        ...archetype.quantumAttributes,
        complexity: Math.min(100, archetype.quantumAttributes.complexity * 1.2),
        resonance: Math.min(100, archetype.quantumAttributes.resonance * 1.15)
      }
    };

    setArchetypes(prev => 
      prev.map(a => a.id === archetype.id ? evolvedArchetype : a)
    );
    setSelectedArchetype(evolvedArchetype);
    setIsEvolvingArchetype(false);
    updateQuantumState({ lastEvolvedArchetype: evolvedArchetype });
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Archetype Customizer</h2>
        <button
          onClick={() => generateNewArchetype('quantum dreamer')}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Generate New Archetype
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-semibold">Archetypes</h3>
          <div className="space-y-2">
            {archetypes.map(archetype => (
              <div
                key={archetype.id}
                onClick={() => setSelectedArchetype(archetype)}
                className={`p-4 border rounded cursor-pointer transition-colors ${
                  selectedArchetype?.id === archetype.id 
                    ? 'border-purple-500 bg-purple-50'
                    : 'hover:border-purple-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{archetype.name}</span>
                  <span className="text-sm text-purple-600">
                    Stage {archetype.evolutionStage}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {archetype.description.substring(0, 100)}...
                </p>
              </div>
            ))}
          </div>
        </div>

        {selectedArchetype && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Archetype Details</h3>
              <button
                onClick={() => evolveArchetype(selectedArchetype)}
                disabled={isEvolvingArchetype}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
              >
                {isEvolvingArchetype ? 'Evolving...' : 'Evolve Archetype'}
              </button>
            </div>

            <div className="p-4 border rounded space-y-4">
              <div>
                <h4 className="font-medium">Description</h4>
                <p className="text-gray-600 mt-1">{selectedArchetype.description}</p>
              </div>

              <div>
                <h4 className="font-medium">Resonance Patterns</h4>
                <ul className="mt-1 space-y-1">
                  {selectedArchetype.resonancePatterns.map((pattern, i) => (
                    <li key={i} className="text-gray-600">{pattern}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium">Quantum Attributes</h4>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {Object.entries(selectedArchetype.quantumAttributes).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <div className="text-sm text-gray-600 capitalize">{key}</div>
                      <div className="h-2 bg-gray-200 rounded">
                        <div
                          className="h-full bg-purple-600 rounded"
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {evolutionLog && (
              <div className="p-4 border rounded">
                <h4 className="font-medium">Evolution Progress</h4>
                <div className="mt-2 text-gray-600 whitespace-pre-wrap">
                  {evolutionLog}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
