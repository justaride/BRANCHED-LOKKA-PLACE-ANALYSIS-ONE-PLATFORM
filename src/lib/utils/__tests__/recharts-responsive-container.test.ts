import fs from 'fs';
import path from 'path';

const repoRoot = path.resolve(__dirname, '../../../..');

const reportChartFiles = [
  'src/components/analyser/BankTransactionChart.tsx',
  'src/components/analyser/SimpleEventTimeline.tsx',
  'src/components/analyser/KonkurransebildeCharts.tsx',
  'src/components/analyser/KorthandelCharts.tsx',
  'src/components/analyser/BevegelseCharts.tsx',
];

describe('2025 årsrapport Recharts containers', () => {
  it('sets positive initial dimensions before ResizeObserver measures chart containers', () => {
    for (const relativeFile of reportChartFiles) {
      const source = fs.readFileSync(path.join(repoRoot, relativeFile), 'utf8');
      const responsiveContainerCount =
        source.match(/<ResponsiveContainer\b/g)?.length ?? 0;
      const initialDimensionCount =
        source.match(/\binitialDimension=/g)?.length ?? 0;

      expect(initialDimensionCount).toBe(responsiveContainerCount);
    }
  });
});
