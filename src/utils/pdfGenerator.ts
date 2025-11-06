import jsPDF from "jspdf";
import { WindowSpecs } from "@/components/WindowForm";

export const generateQuotationPDF = (specs: WindowSpecs, clientName = "Valued Customer") => {
  const doc = new jsPDF();
  
  // Calculate values
  const sqft = (specs.height * specs.width) / 144;
  const total = sqft * specs.rate * specs.quantity;
  
  // Header - Company Name
  doc.setFillColor(30, 64, 175); // Primary blue
  doc.rect(0, 0, 210, 40, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("TEKNA WINDOW SYSTEM", 105, 20, { align: "center" });
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Professional Window Solutions", 105, 30, { align: "center" });
  
  // Reset text color
  doc.setTextColor(0, 0, 0);
  
  // Quotation Title
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("QUOTATION", 105, 55, { align: "center" });
  
  // Quotation Details
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const currentDate = new Date().toLocaleDateString("en-IN");
  const quotationNo = `TW${Date.now().toString().slice(-6)}`;
  
  doc.text(`Date: ${currentDate}`, 20, 70);
  doc.text(`Quotation No: ${quotationNo}`, 20, 77);
  doc.text(`Client: ${clientName}`, 20, 84);
  
  // Table Header
  const startY = 100;
  doc.setFillColor(220, 220, 220);
  doc.rect(20, startY, 170, 10, "F");
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("Specification", 25, startY + 7);
  doc.text("Value", 120, startY + 7);
  
  // Table Content
  doc.setFont("helvetica", "normal");
  let y = startY + 17;
  const lineHeight = 7;
  
  const specifications = [
    ["Height", `${specs.height} inches`],
    ["Width", `${specs.width} inches`],
    ["Profile System", specs.profileSystem],
    ["Window Type", specs.windowType],
    ["Design", specs.design],
    ["Glass Type", specs.glassType],
    ["Mesh", specs.mesh ? "Yes" : "No"],
    ["Grill", specs.grill ? "Yes" : "No"],
    ["Locking Type", specs.lockingType],
    ["Quantity", specs.quantity.toString()],
  ];
  
  specifications.forEach(([label, value]) => {
    doc.text(label, 25, y);
    doc.text(value, 120, y);
    y += lineHeight;
  });
  
  // Calculation Section
  y += 10;
  doc.setDrawColor(200, 200, 200);
  doc.line(20, y, 190, y);
  y += 10;
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("CALCULATION", 25, y);
  
  y += 10;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Square Feet: ${sqft.toFixed(2)} sq.ft`, 25, y);
  y += 7;
  doc.text(`Rate per sq.ft: ₹${specs.rate.toFixed(2)}`, 25, y);
  y += 7;
  doc.text(`Quantity: ${specs.quantity}`, 25, y);
  
  y += 15;
  doc.setFillColor(30, 64, 175);
  doc.rect(20, y - 7, 170, 12, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(`TOTAL: ₹${total.toFixed(2)}`, 105, y, { align: "center" });
  
  // Terms & Conditions
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  y += 25;
  doc.text("TERMS & CONDITIONS", 20, y);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  y += 7;
  const terms = [
    "1. Quotation valid for 30 days from date of issue",
    "2. Installation charges may apply separately",
    "3. 50% advance payment required to commence work",
    "4. Delivery timeline: 15-20 working days from confirmation",
    "5. Warranty: 10 years on profile, 1 year on hardware & accessories",
    "6. Measurement verification required before final order",
  ];
  
  terms.forEach((term) => {
    doc.text(term, 25, y);
    y += 6;
  });
  
  // Footer
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text("Thank you for choosing TEKNA Window System", 105, 280, { align: "center" });
  doc.text("For queries, contact: info@teknawindows.com | +91 XXXXX XXXXX", 105, 285, { align: "center" });
  
  // Save PDF
  doc.save(`TEKNA_Quotation_${quotationNo}.pdf`);
};
