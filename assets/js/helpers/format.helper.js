// ===== formatting helpers =====
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function fmtDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB"); // 06/05/2026
}

export function deadlineClass(dateStr) {
  if (!dateStr) return "";
  const now = new Date();
  const d = new Date(dateStr);

  const diff = d.setHours(0, 0, 0, 0) - now.setHours(0, 0, 0, 0);

  if (diff < 0) return "overdue";
  if (diff <= 2 * 86400000) return "due-soon";
  return "upcoming";
}

export function deadlineText(dateStr) {
  return dateStr ? `Due ${fmtDate(dateStr)}` : "";
}
