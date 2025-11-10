import jsPDF from "jspdf";
import { WindowSpecs } from "@/components/WindowForm";

export const generateQuotationPDF = (specs: WindowSpecs, clientName = "Valued Customer") => {
  const doc = new jsPDF("p", "mm", "a4");

  // 🧮 Calculations
  const sqft = (specs.height * specs.width) / 144;
  const total = sqft * specs.rate * specs.quantity;

  // 🧱 Outer Border
  doc.setDrawColor(0);
  doc.rect(10, 10, 190, 277);

  // 🧢 Header (Company Info)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("TEKNA WINDOW SYSTEM", 15, 20);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("VAVDI INDUSTRY AREA", 15, 26);
  doc.text("VAVDI MAIN ROAD", 15, 31);
  doc.text("TEKNA WINDOW", 15, 36);
  doc.text("Mobile : 9825256525", 15, 42);
  doc.text("Email : TEKNAWIN01@GMAIL.COM", 15, 47);
  doc.text("GSTIN : 24AMIPS5762R1Z4", 15, 52);

  // Logo Box (placeholder)
  doc.setDrawColor(0);
  doc.setFillColor(230, 240, 230);
  doc.rect(150, 18, 45, 25, "FD");
  doc.setTextColor(0);
  doc.setFontSize(10);
  doc.text("TEKNA WINDOW SYSTEM", 172, 33, { align: "center" });

  // Orange Line Separator
  doc.setDrawColor(220, 120, 0);
  doc.setLineWidth(0.7);
  doc.line(10, 58, 200, 58);

  // 🧾 Client + Quotation Details
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Client Name :", 15, 66);
  doc.text("Project :", 15, 72);

  doc.text("Quotation No. :", 115, 66);
  doc.text("Finish :", 115, 72);
  doc.text("Date :", 115, 78);

  doc.setFont("helvetica", "normal");
  doc.text(clientName.toUpperCase(), 45, 66);
  doc.text(specs.project?.toUpperCase() || "OFFICE", 45, 72);
  doc.text(specs.finish?.toUpperCase() || "POWDER COATING", 145, 72);

  const currentDate = new Date().toLocaleDateString("en-IN");
  const quotationNo = `QE/TK/${Date.now().toString().slice(-3)}`;
  doc.text(quotationNo, 145, 66);
  doc.text(currentDate, 145, 78);

  // Orange Line Separator
  doc.setDrawColor(220, 120, 0);
  doc.line(10, 82, 200, 82);

  // 📍 Location + Code
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(`Location : ${specs.location || "W1"}`, 15, 90);
  doc.text(`Code : ${specs.code || "W1"}`, 170, 90);

  // Grey Box (Content Border)
  doc.setDrawColor(0);
  doc.rect(10, 94, 190, 150);

  // Left Section – Image Box
  doc.setDrawColor(0);
  doc.rect(15, 105, 80, 120);
  doc.setFontSize(9);
  doc.text(`W x ${specs.width?.toFixed(2) || "48.00"}`, 35, 100);
  doc.text(`H x ${specs.height?.toFixed(2) || "51.00"}`, 20, 170, { angle: 90 });

  // Right Section – Details
  doc.setFontSize(9);
  let y = 105;
  const addRow = (label: string, value: string) => {
    doc.setFont("helvetica", "bold");
    doc.text(label, 105, y);
    doc.setFont("helvetica", "normal");
    doc.text(`: ${value}`, 140, y);
    y += 6;
  };

  addRow("Size (Inch)", `W x ${specs.width}   H x ${specs.height}`);
  addRow("Profile System", specs.profileSystem || "50MM CASEMENT");
  addRow("Design", specs.design || "FIX GLASS");
  addRow("Glass", specs.glassType || "5MM CL +10mm air gap +5mm CL tuff");
  addRow("Mess", specs.mesh ? "YES" : "-");
  addRow("Locking", specs.lockingType || "-");
  addRow("Grill", specs.grill ? "YES" : "REMOVE");

  // Computed Values Section
  doc.setDrawColor(0);
  doc.rect(105, y + 2, 90, 30);
  doc.setFont("helvetica", "bold");
  doc.text("Computed Values", 110, y + 8);
  doc.setFont("helvetica", "normal");
  doc.text(`Sq.ft per Window : ${sqft.toFixed(2)} Sq.ft`, 110, y + 14);
  doc.text(`Rate per Sq.ft : ₹${specs.rate.toFixed(2)}`, 110, y + 20);
  doc.text(`Quantity : ${specs.quantity} pcs`, 110, y + 26);
  doc.text(`Value : ₹${total.toFixed(2)}`, 110, y + 32);
  y += 38;

  // Hardware Section
  doc.rect(105, y, 90, 15);
  doc.setFont("helvetica", "bold");
  doc.text("Hardware Brand", 110, y + 6);
  doc.setFont("helvetica", "normal");
  doc.text(specs.hardwareBrand || "PREMIUM QUALITY", 110, y + 12);

  // 🧾 Footer Terms
  let ty = 250;
  doc.setFont("helvetica", "bold");
  doc.text("TERMS & CONDITIONS", 15, ty);
  ty += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  const terms = [
    "1. Quotation valid for 1 week.",
    "2. Transportation and GST extra.",
    "3. Installation time: 40–45 days.",
    "4. 70% advance, 20% before dispatch, 10% after installation.",
    "5. Glass breakage not covered after installation.",
  ];
  terms.forEach((t) => {
    doc.text(t, 15, ty);
    ty += 5;
  });

  // Signature Boxes
  doc.rect(15, 270, 80, 15);
  doc.rect(115, 270, 80, 15);
  doc.setFontSize(9);
  doc.text("Authorised Signatory", 25, 280);
  doc.text("Signature of Customer", 125, 280);

  // 💾 Save File
  doc.save(`Quotation_${clientName.replace(/\s+/g, "_")}_${quotationNo}.pdf`);
};
