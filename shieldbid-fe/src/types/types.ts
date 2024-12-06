function formatVk(vk: string[]) {
  const _vk: (string[] | string[][])[] = [];
  const alpha1: string[] = [vk[0], vk[1]];
  const beta2: string[][] = [
    [vk[2], vk[3]],
    [vk[4], vk[5]],
  ];
  const gamma2: string[][] = [
    [vk[6], vk[7]],
    [vk[8], vk[9]],
  ];
  const delta2: string[][] = [
    [vk[10], vk[11]],
    [vk[12], vk[13]],
  ];
  const IC: string[][] = [];
  for (let i = 14; i < vk.length; i += 2) {
    IC.push([vk[i], vk[i + 1]]);
  }
  _vk.push(alpha1);
  _vk.push(beta2);
  _vk.push(gamma2);
  _vk.push(delta2);
  _vk.push(IC);
  return _vk;
}

export default formatVk;
