type ClassNamesType = string | Record<string, boolean | string>

export function classNames(...args: ClassNamesType[]): string {
  const classes: string[] = [];

  args.forEach((cls) => {
    if (typeof cls === 'string') classes.push(cls);
    else Object.entries(cls).forEach(([currentCls, value]) => value && classes.push(currentCls));
  });

  return classes.join(' ');
}