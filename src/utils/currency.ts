/**
 * Currency & Localization Utilities for Tamil Nadu (INR)
 */

export const CURRENCY_SYMBOL = '₹';
export const CURRENCY_CODE = 'INR';
export const STATE_NAME = 'Tamil Nadu';
export const STATE_GST_CODE = '33'; // Official GST State Code for Tamil Nadu

/**
 * Formats a number into Indian Rupee format (e.g. ₹1,25,450.00)
 */
export function formatINR(amount: number | undefined | null, showDecimals: boolean = true): string {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '₹0.00';
  }
  
  try {
    const formatted = new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: showDecimals ? 2 : 0,
      maximumFractionDigits: showDecimals ? 2 : 0,
    }).format(amount);
    return `₹${formatted}`;
  } catch {
    return `₹${Number(amount).toFixed(showDecimals ? 2 : 0)}`;
  }
}

/**
 * Format large amounts in Lakhs or Crores (e.g. ₹15.5 Lakhs)
 */
export function formatINRLakhs(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} Lakh`;
  }
  return formatINR(amount, false);
}

/**
 * Rounds to 2 decimals (paise) using half-up rounding that is safe against
 * floating point artefacts (e.g. 163.485 -> 163.49, not 163.48).
 */
export function round2(value: number): number {
  if (!isFinite(value)) return 0;
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

/**
 * Computes bill totals so that every printed line adds up to the paisa:
 * subtotal - discount = taxable, taxable + GST = total.
 */
export function computeBillTotals(subtotal: number, discountPercent: number, taxRatePercent: number) {
  const sub = round2(subtotal);
  const discountAmount = round2((sub * (discountPercent || 0)) / 100);
  const taxableAmount = round2(sub - discountAmount);
  const taxAmount = round2((taxableAmount * taxRatePercent) / 100);
  const total = round2(taxableAmount + taxAmount);
  return { subtotal: sub, discountAmount, taxableAmount, taxAmount, total };
}

/**
 * Splits a GST amount into CGST + SGST so that CGST + SGST === GST exactly.
 */
export function splitGST(taxAmount: number) {
  const cgst = round2(taxAmount / 2);
  const sgst = round2(taxAmount - cgst);
  return { cgst, sgst };
}

/**
 * Standard GST tax split calculation for Tamil Nadu intra-state retail
 * Intra-state sales divide GST equally into CGST and SGST (State: Tamil Nadu)
 */
export function calculateGSTBreakdown(taxableAmount: number, taxRatePercent: number) {
  const totalTax = round2((taxableAmount * taxRatePercent) / 100);
  const halfRate = taxRatePercent / 2;
  const { cgst, sgst } = splitGST(totalTax);
  return {
    totalTax,
    cgstRate: halfRate,
    cgstAmount: cgst,
    sgstRate: halfRate,
    sgstAmount: sgst,
    stateCode: STATE_GST_CODE,
    stateName: STATE_NAME,
  };
}
