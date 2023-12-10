import { z } from 'zod';
import { FetchStatsCanadaProps } from './types';

export async function fetchStatsCanada(props: FetchStatsCanadaProps) {
  const { action, method, productId, coordinate, latestN } = props;

  const res = await fetch(
    `https://www150.statcan.gc.ca/t1/wds/rest/${action}`,
    method === 'POST'
      ? {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify([
            {
              productId,
              coordinate,
              latestN: latestN ?? 5,
            },
          ]),
        }
      : undefined
  );

  const body = await res.json();
  return body;
}
