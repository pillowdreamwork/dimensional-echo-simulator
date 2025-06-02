
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { AethericForgeController } from './AethericForgeController';
import { QuantumValidationMonitor } from './QuantumValidationMonitor';
import { QuantumPerformanceMonitor } from './QuantumPerformanceMonitor';
import { TimelineBranchVisualizer } from './TimelineBranchVisualizer';
import { QuantumErrorMonitor } from './QuantumErrorMonitor';

export const ForgeDashboard: React.FC = () => {
    // Create mock engines for components that require them
    const mockEngine = {
        getMetrics: () => ({ timestamp: Date.now(), cpuUsage: 0.5, memoryUsage: 0.3 }),
        getPerformance: () => ({ stability: 0.9, quantum: 0.8 })
    };

    const mockErrorHandler = {
        getErrors: () => [],
        clearErrors: () => {},
        observeErrors: () => ({ subscribe: () => ({}) })
    };

    return (
        <Card className="w-full h-full">
            <CardHeader>
                <CardTitle>Aetheric Forge Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="forge" className="w-full">
                    <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="forge">Forge Control</TabsTrigger>
                        <TabsTrigger value="validation">Validation</TabsTrigger>
                        <TabsTrigger value="performance">Performance</TabsTrigger>
                        <TabsTrigger value="timeline">Timeline</TabsTrigger>
                        <TabsTrigger value="errors">Errors</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="forge" className="mt-4">
                        <AethericForgeController />
                    </TabsContent>
                    
                    <TabsContent value="validation" className="mt-4">
                        <QuantumValidationMonitor />
                    </TabsContent>
                    
                    <TabsContent value="performance" className="mt-4">
                        <QuantumPerformanceMonitor engine={mockEngine} />
                    </TabsContent>
                    
                    <TabsContent value="timeline" className="mt-4">
                        <TimelineBranchVisualizer engine={mockEngine} />
                    </TabsContent>
                    
                    <TabsContent value="errors" className="mt-4">
                        <QuantumErrorMonitor errorHandler={mockErrorHandler} />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
};
