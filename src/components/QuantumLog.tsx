
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Circle, WandSparklesIcon } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { exportFullSystemData } from "../utils/export/systemExport";

interface LogEntry {
  id: string;
  dimension: number;
  content: string;
  timestamp: Date;
  feelings: string[];
  symbols: string[];
}

interface QuantumLogProps {
  currentDimension: number;
  dimensionalEffects?: string[];
}

const QuantumLog: React.FC<QuantumLogProps> = ({
  currentDimension,
  dimensionalEffects = []
}) => {
  const [journalEntry, setJournalEntry] = useState("");
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
  const [selectedFeelings, setSelectedFeelings] = useState<string[]>([]);
  const { toast } = useToast();
  
  const feelings = [
    "Wonder", "Peace", "Clarity", "Connection", 
    "Confusion", "Insight", "Expansion", "Love"
  ];
  
  const handleAddFeeling = (feeling: string) => {
    if (selectedFeelings.includes(feeling)) {
      setSelectedFeelings(selectedFeelings.filter(f => f !== feeling));
    } else {
      setSelectedFeelings([...selectedFeelings, feeling]);
    }
  };
  
  const handleSaveEntry = () => {
    if (!journalEntry.trim()) {
      toast({
        title: "Cannot Save Empty Entry",
        description: "Please share some thoughts about your experience",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    // Extract any symbols from the journal entry (characters between * *)
    const symbolRegex = /\*([^*]+)\*/g;
    const matches = [...journalEntry.matchAll(symbolRegex)];
    const symbols = matches.map(match => match[1]);
    
    // Create new log entry
    const newEntry: LogEntry = {
      id: Date.now().toString(),
      dimension: currentDimension,
      content: journalEntry,
      timestamp: new Date(),
      feelings: selectedFeelings,
      symbols
    };
    
    setLogEntries([newEntry, ...logEntries]);
    setJournalEntry("");
    setSelectedFeelings([]);
    
    toast({
      title: "Experience Logged",
      description: `Your ${currentDimension}D experience has been saved to your quantum journal`,
      duration: 3000,
    });
  };
  
  const handleExportJournal = async () => {
    try {
      await exportFullSystemData("my-quantum-journal.json");
      toast({
        title: "Journal Exported",
        description: "Your quantum journal has been exported successfully",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Unable to export your journal. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  return (
    <Card className="bg-quantum-dark dimensional-border backdrop-blur-sm bg-opacity-70">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <Circle className="mr-2 text-quantum-purple" size={18} />
            Quantum Experience Journal
          </CardTitle>
          <Badge variant="outline" className="bg-quantum-purple/20 text-quantum-purple">
            {currentDimension}D
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            Capture your dimensional insights, feelings, and synchronicities
          </p>
          
          <div className="mb-3">
            <Textarea
              placeholder="What are you experiencing in this dimension? Use *symbol* format to mark any symbols you encounter..."
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              className="min-h-24 bg-quantum-dark/50 border-quantum-purple/30 resize-none"
            />
          </div>
          
          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground mb-2">How does this dimension feel? (optional)</p>
              <div className="flex flex-wrap gap-2">
                {feelings.map((feeling) => (
                  <Badge 
                    key={feeling}
                    variant={selectedFeelings.includes(feeling) ? "default" : "outline"} 
                    className={`cursor-pointer ${
                      selectedFeelings.includes(feeling) 
                        ? "bg-quantum-purple" 
                        : "hover:bg-quantum-purple/20"
                    }`}
                    onClick={() => handleAddFeeling(feeling)}
                  >
                    {feeling}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                className="border-quantum-purple text-quantum-purple hover:bg-quantum-purple/20"
                onClick={handleExportJournal}
                size="sm"
              >
                Export Journal
              </Button>
              
              <Button 
                onClick={handleSaveEntry}
                className="bg-quantum-purple hover:bg-quantum-purple/90"
                size="sm"
              >
                Save Entry
              </Button>
            </div>
          </div>
        </div>
        
        {logEntries.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Recent Journal Entries</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {logEntries.map((entry) => (
                <div key={entry.id} className="border border-quantum-purple/30 rounded-md p-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="bg-quantum-purple/20 text-quantum-purple">{entry.dimension}D</Badge>
                    <span className="text-xs text-muted-foreground">
                      {entry.timestamp.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm whitespace-pre-line mb-2">{entry.content}</p>
                  {entry.feelings.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-1">
                      {entry.feelings.map((feeling) => (
                        <Badge key={feeling} variant="outline" className="text-xs">{feeling}</Badge>
                      ))}
                    </div>
                  )}
                  {entry.symbols.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      <span className="text-xs text-quantum-gold">Symbols: </span>
                      {entry.symbols.map((symbol, i) => (
                        <span key={i} className="text-quantum-gold text-xs">
                          {symbol}{i < entry.symbols.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {dimensionalEffects.length > 0 && (
          <div>
            <Separator className="my-4" />
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-quantum-gold">Recent Reality Shifts</h3>
              <div className="space-y-1 max-h-24 overflow-y-auto">
                {dimensionalEffects.map((effect, index) => (
                  <p key={index} className="text-xs text-muted-foreground">{effect}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuantumLog;
