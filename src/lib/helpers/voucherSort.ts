import { VoucherItemsProps } from "@/components/Vouchers/VoucherItems";

export const sortVouchers = (voucherItems: VoucherItemsProps[]) => {
  return voucherItems.sort((a, b) => {
    const a_isActive = new Date() >= new Date(a.startDate) && new Date() <= new Date(a.expiryDate);
    const b_isActive = new Date() >= new Date(b.startDate) && new Date() <= new Date(b.expiryDate);

    // 1. Prioritaskan voucher aktif
    if (a_isActive !== b_isActive) {
      return a_isActive ? -1 : 1; // Yang aktif di atas
    }

    // 2. Prioritaskan voucher dengan remaining > 0
    const remainingA = a.totalCount - a.usedCount;
    const remainingB = b.totalCount - b.usedCount;
    if (remainingA === 0 && remainingB > 0) return 1; // Yang remaining 0 ke bawah
    if (remainingB === 0 && remainingA > 0) return -1; // Yang remaining > 0 ke atas

    // 3. Prioritaskan voucher dengan expiry lebih lama
    const expiryA = new Date(a.expiryDate).getTime();
    const expiryB = new Date(b.expiryDate).getTime();
    if (expiryA !== expiryB) {
      return expiryB - expiryA; // Yang expiry lebih lama di atas
    }

    // 4. Prioritaskan voucher dengan jumlah remaining lebih banyak
    return remainingB - remainingA; // Yang sisa lebih banyak di atas
  });
};
