'use client';

import dynamic from 'next/dynamic';
import type { AktorWithCoordinates } from '@/types/aktor-map';

const AktorMap = dynamic(() => import('@/components/analyser/AktorMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[550px] animate-pulse rounded-2xl bg-gray-100" />
  ),
});

type AktorMapWrapperProps = {
  actors: AktorWithCoordinates[]
}

export default function AktorMapWrapper({ actors }: AktorMapWrapperProps) {
  return <AktorMap actors={actors} />;
}
