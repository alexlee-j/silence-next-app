export function isSequentialPassword(password: string) {
  const numbers = "0123456789";
  const letters = "abcdefghijklmnopqrstuvwxyz";
  let sequential = false;

  // 检查数字顺序
  for (let i = 0; i < numbers.length - password.length + 1; i++) {
    if (numbers.slice(i, i + password.length) === password) {
      sequential = true;
      break;
    }
  }

  // 检查小写字母顺序
  if (!sequential) {
    for (let i = 0; i < letters.length - password.length + 1; i++) {
      if (letters.slice(i, i + password.length) === password) {
        sequential = true;
        break;
      }
    }
  }

  return sequential;
}
