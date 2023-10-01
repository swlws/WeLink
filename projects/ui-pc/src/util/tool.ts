/**
 * 以文件导出字符串
 *
 * @param content
 * @param fileName
 */
export function stringToFile(content: string, fileName = "text.txt") {
  const urlObject = window.URL || window.webkitURL || window;
  const blob = new Blob([content]);
  const link = urlObject.createObjectURL(blob);

  const aEl = document.createElement("a");
  aEl.href = link;
  aEl.download = fileName;

  aEl.click();
  URL.revokeObjectURL(link);
}

export function toClipboard(content: string) {
  if (navigator.clipboard) navigator.clipboard.writeText(content);
}
