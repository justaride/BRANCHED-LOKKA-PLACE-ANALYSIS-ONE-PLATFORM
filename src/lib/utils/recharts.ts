export const DEFAULT_RESPONSIVE_CHART_DIMENSION: {
  width: number;
  height: number;
} = {
  width: 800,
  height: 320,
};

export type RechartsTooltipValue =
  | number
  | string
  | readonly (number | string)[]
  | undefined;

export type RechartsTooltipName = string | number | undefined;

export function toRechartsNumber(value: RechartsTooltipValue): number {
  const candidates = Array.isArray(value) ? value : [value];

  for (const candidate of candidates) {
    if (candidate === undefined || candidate === "") continue;

    const numberValue = Number(candidate);
    if (Number.isFinite(numberValue)) return numberValue;
  }

  return 0;
}

export function createNumberTooltipFormatter<T>(
  formatter: (value: number) => T,
) {
  return (value: RechartsTooltipValue) => formatter(toRechartsNumber(value));
}

export function createNamedNumberTooltipFormatter<T>(
  formatter: (value: number, name: string) => T,
) {
  return (value: RechartsTooltipValue, name: RechartsTooltipName) =>
    formatter(toRechartsNumber(value), String(name ?? ""));
}
