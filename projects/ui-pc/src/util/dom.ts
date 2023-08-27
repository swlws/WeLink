export function handleDomEventProxy(
  event: any,
  callback: (target: HTMLElement) => void
): void {
  const { currentTarget, target } = event;

  let t = target;
  while (t !== currentTarget) {
    const { proxy } = t.dataset;
    if (proxy) return callback(t);

    t = t.parentNode;
  }

  return;
}
