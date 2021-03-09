// 设置 rem 函数
export function setRem () {
  let width = document.documentElement.clientWidth;
  const newFont = (width / 320) * 10;
  document.documentElement.style.fontSize = newFont + 'px';
}
