import jsPDF from 'jspdf';
import { ProjectState } from '../../types';
import { calculatePrice, formatCurrency } from '../data/pricing';

export const generatePDF = (project: ProjectState) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  
  // Colors
  const primaryColor = '#292524'; // stone-800
  const accentColor = '#78716c'; // stone-500
  
  // Header / Logo
  doc.setFont('times', 'bold'); // Closest to serif
  doc.setFontSize(24);
  doc.setTextColor(primaryColor);
  doc.text('ATELYA', pageWidth / 2, 30, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(accentColor);
  doc.text('ARCHITECTURE & DESIGN', pageWidth / 2, 36, { align: 'center' });
  
  // Line separator
  doc.setDrawColor(231, 229, 228); // stone-200
  doc.line(margin, 45, pageWidth - margin, 45);
  
  // Document Info
  const date = new Date().toLocaleDateString('fr-FR');
  doc.setFontSize(10);
  doc.setTextColor(primaryColor);
  doc.text(`Date : ${date}`, margin, 60);
  doc.text(`Réf : EST-${Math.floor(Math.random() * 10000)}`, pageWidth - margin, 60, { align: 'right' });
  
  // Title
  doc.setFontSize(18);
  doc.setFont('times', 'bold');
  doc.text('Estimation Préliminaire', margin, 80);
  
  // Content Box
  let y = 100;
  const lineHeight = 12;
  
  const addRow = (label: string, value: string) => {
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(accentColor);
    doc.text(label, margin, y);
    
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor);
    doc.text(value, pageWidth - margin, y, { align: 'right' });
    
    y += lineHeight;
  };
  
  addRow('Type de projet', project.type);
  addRow('Style architectural', project.style);
  addRow('Niveau de finition', project.finish);
  addRow('Surface', `${project.surface} m²`);
  
  y += 10;
  doc.setDrawColor(231, 229, 228);
  doc.line(margin, y, pageWidth - margin, y);
  y += 20;
  
  // Total
  const price = calculatePrice(project);
  doc.setFontSize(22);
  doc.setFont('times', 'bold');
  doc.setTextColor(primaryColor);
  doc.text('Estimation Totale', margin, y);
  doc.text(formatCurrency(price), pageWidth - margin, y, { align: 'right' });
  
  // Disclaimer
  y += 30;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(150, 150, 150);
  const disclaimer = "Ce document est une estimation indicative basée sur des critères généraux. Il ne constitue pas une offre contractuelle. Le prix final sera affiné après une étude approfondie de votre terrain et de vos besoins spécifiques.";
  const splitDisclaimer = doc.splitTextToSize(disclaimer, pageWidth - (margin * 2));
  doc.text(splitDisclaimer, margin, y);
  
  // Save
  doc.save('Atelya-Estimation.pdf');
};