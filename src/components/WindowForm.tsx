import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Box, FileText } from "lucide-react";

export interface WindowSpecs {
  height: number;
  width: number;
  profileSystem: string;
  windowType: string;
  design: string;
  glassType: string;
  mesh: boolean;
  grill: boolean;
  lockingType: string;
  quantity: number;
  rate: number;
  project?: string;
  finish?: string;
  location?: string;
  code?: string;
  hardwareBrand?: string;
}

interface WindowFormProps {
  onGenerate3D: (specs: WindowSpecs) => void;
  onGeneratePDF: (specs: WindowSpecs) => void;
}

const WindowForm = ({ onGenerate3D, onGeneratePDF }: WindowFormProps) => {
  const [specs, setSpecs] = useState<WindowSpecs>({
    height: 48,
    width: 36,
    profileSystem: "50MM CASEMENT",
    windowType: "Normal",
    design: "FIX GLASS",
    glassType: "5MM CLEAR GLASS",
    mesh: false,
    grill: false,
    lockingType: "Standard Lock",
    quantity: 1,
    rate: 150,
  });

  const updateSpec = (key: keyof WindowSpecs, value: any) => {
    setSpecs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Card className="p-6 backdrop-blur-sm bg-card/80 border-border/50 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-foreground">Window Specifications</h2>
      
      <div className="space-y-5">
        {/* Dimensions */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="height">Height (inches)</Label>
            <Input
              id="height"
              type="number"
              value={specs.height}
              onChange={(e) => updateSpec("height", parseFloat(e.target.value))}
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="width">Width (inches)</Label>
            <Input
              id="width"
              type="number"
              value={specs.width}
              onChange={(e) => updateSpec("width", parseFloat(e.target.value))}
              className="bg-background"
            />
          </div>
        </div>

        {/* Profile System */}
        <div className="space-y-2">
          <Label htmlFor="profile">Profile System</Label>
          <Select value={specs.profileSystem} onValueChange={(v) => updateSpec("profileSystem", v)}>
            <SelectTrigger id="profile" className="bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="50MM CASEMENT">50MM CASEMENT</SelectItem>
              <SelectItem value="29MM SLIDER">29MM SLIDER</SelectItem>
              <SelectItem value="60MM CASEMENT">60MM CASEMENT</SelectItem>
              <SelectItem value="38MM SLIDER">38MM SLIDER</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Window Type */}
        <div className="space-y-2">
          <Label htmlFor="type">Window Type</Label>
          <Select value={specs.windowType} onValueChange={(v) => updateSpec("windowType", v)}>
            <SelectTrigger id="type" className="bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Normal">Normal</SelectItem>
              <SelectItem value="Slider">Slider</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Design */}
        <div className="space-y-2">
          <Label htmlFor="design">Design</Label>
          <Select value={specs.design} onValueChange={(v) => updateSpec("design", v)}>
            <SelectTrigger id="design" className="bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FIX GLASS">FIX GLASS</SelectItem>
              <SelectItem value="SLIDING 2 SHUTTER SLIM I/L">SLIDING 2 SHUTTER SLIM I/L</SelectItem>
              <SelectItem value="CASEMENT WINDOW">CASEMENT WINDOW</SelectItem>
              <SelectItem value="SLIDING 3 SHUTTER">SLIDING 3 SHUTTER</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Glass Type */}
        <div className="space-y-2">
          <Label htmlFor="glass">Glass Type</Label>
          <Input
            id="glass"
            value={specs.glassType}
            onChange={(e) => updateSpec("glassType", e.target.value)}
            placeholder="e.g., 5MM CLEAR GLASS"
            className="bg-background"
          />
        </div>

        {/* Mesh */}
        <div className="space-y-2">
          <Label htmlFor="mesh">Mesh</Label>
          <Select value={specs.mesh ? "Yes" : "No"} onValueChange={(v) => updateSpec("mesh", v === "Yes")}>
            <SelectTrigger id="mesh" className="bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Grill */}
        <div className="space-y-2">
          <Label htmlFor="grill">Grill</Label>
          <Select value={specs.grill ? "Yes" : "No"} onValueChange={(v) => updateSpec("grill", v === "Yes")}>
            <SelectTrigger id="grill" className="bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Locking Type */}
        <div className="space-y-2">
          <Label htmlFor="lock">Locking Type</Label>
          <Select value={specs.lockingType} onValueChange={(v) => updateSpec("lockingType", v)}>
            <SelectTrigger id="lock" className="bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Standard Lock">Standard Lock</SelectItem>
              <SelectItem value="Multi-Point Lock">Multi-Point Lock</SelectItem>
              <SelectItem value="Push Lock">Push Lock</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Quantity and Rate */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              value={specs.quantity}
              onChange={(e) => updateSpec("quantity", parseInt(e.target.value))}
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rate">Rate (per sq.ft)</Label>
            <Input
              id="rate"
              type="number"
              value={specs.rate}
              onChange={(e) => updateSpec("rate", parseFloat(e.target.value))}
              className="bg-background"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 pt-4">
          <Button
            onClick={() => onGenerate3D(specs)}
            className="w-full gap-2"
            size="lg"
          >
            <Box className="h-5 w-5" />
            Generate 3D Model
          </Button>
          <Button
            onClick={() => onGeneratePDF(specs)}
            variant="secondary"
            className="w-full gap-2"
            size="lg"
          >
            <FileText className="h-5 w-5" />
            Generate Quotation PDF
          </Button>
        </div>

        {/* Calculation Preview */}
        <div className="mt-6 p-4 bg-muted rounded-lg border border-border">
          <h3 className="font-semibold mb-2 text-foreground">Quick Calculation</h3>
          <div className="text-sm space-y-1 text-muted-foreground">
            <p>
              Sq.ft: <span className="font-medium text-foreground">
                {((specs.height * specs.width) / 144).toFixed(2)}
              </span>
            </p>
            <p>
              Total: <span className="font-medium text-foreground">
                ₹{(((specs.height * specs.width) / 144) * specs.rate * specs.quantity).toFixed(2)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WindowForm;
