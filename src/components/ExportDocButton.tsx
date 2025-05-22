
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileDownIcon, Code2Icon, BookOpenIcon } from 'lucide-react';
import { 
  exportFullSystemData, 
  exportProjectBlueprint, 
  exportCodebaseDocument 
} from '../utils/export';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';

interface ExportDocButtonProps {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

export function ExportDocButton({ 
  variant = 'outline',
  size = 'default',
  className = ''
}: ExportDocButtonProps) {
  const handleExportSystemData = async () => {
    try {
      await exportFullSystemData();
      toast({
        title: "Export Successful",
        description: "System data has been exported successfully.",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting the system data.",
        variant: "destructive",
        duration: 5000,
      });
      console.error("Export error:", error);
    }
  };

  const handleExportBlueprint = async () => {
    try {
      await exportProjectBlueprint();
      toast({
        title: "Export Successful",
        description: "Project blueprint has been exported successfully.",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting the project blueprint.",
        variant: "destructive",
        duration: 5000,
      });
      console.error("Export error:", error);
    }
  };

  const handleExportCodebase = async () => {
    try {
      await exportCodebaseDocument();
      toast({
        title: "Export Successful",
        description: "Codebase documentation has been exported successfully.",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting the codebase documentation.",
        variant: "destructive",
        duration: 5000,
      });
      console.error("Export error:", error);
    }
  };

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant={variant} size={size} className={className}>
              <FileDownIcon className="mr-2 h-4 w-4" />
              Export Documentation
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>Export project documentation</TooltipContent>
      </Tooltip>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleExportBlueprint}>
          <BookOpenIcon className="mr-2 h-4 w-4" />
          Project Blueprint
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportCodebase}>
          <Code2Icon className="mr-2 h-4 w-4" />
          Codebase Documentation
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportSystemData}>
          <FileDownIcon className="mr-2 h-4 w-4" />
          Full System Data
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ExportDocButton;
