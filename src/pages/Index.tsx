import { useState } from "react";
import Header from "@/components/Header";
import WindowForm, { WindowSpecs } from "@/components/WindowForm";
import Window3DPreview from "@/components/Window3DPreview";
import { generateQuotationPDF } from "@/utils/pdfGenerator";
import { toast } from "sonner";

const Index = () => {
  const [currentSpecs, setCurrentSpecs] = useState<WindowSpecs>({
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

  const handleGenerate3D = (specs: WindowSpecs) => {
    setCurrentSpecs(specs);
    toast.success("3D model updated successfully!");
  };

  const handleGeneratePDF = (specs: WindowSpecs) => {
    try {
      generateQuotationPDF(specs);
      toast.success("Quotation PDF generated successfully!");
    } catch (error) {
      toast.error("Failed to generate PDF. Please try again.");
      console.error("PDF generation error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-180px)]">
          {/* Left Panel - Form */}
          <WindowForm
            onGenerate3D={handleGenerate3D}
            onGeneratePDF={handleGeneratePDF}
          />
          
          {/* Right Panel - 3D Preview */}
          <Window3DPreview specs={currentSpecs} />
        </div>
      </main>
    </div>
  );
};

export default Index;
