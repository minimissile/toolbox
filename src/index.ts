/**
 * 计算文件大小
 * @param size
 */
export const formatFileSize = (size: number) => {
  if (size >= 1048576) {
    return (size / 1048576).toFixed(2) + ' MB'
  } else if (size >= 1024) {
    return (size / 1024).toFixed(2) + ' KB'
  } else {
    return size + ' bytes'
  }
}
