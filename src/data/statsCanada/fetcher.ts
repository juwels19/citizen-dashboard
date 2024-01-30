import { FetchStatsCanadaProps } from "./types";

export async function fetchStatsCanadaData(props: FetchStatsCanadaProps) {
  const { action, method, productId, coordinate, latestN } = props;

  const res = await fetch(
    `https://www150.statcan.gc.ca/t1/wds/rest/${action}`,
    method === "POST"
      ? {
          method: method,
          headers: {
            "Content-Type": "application/json",
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

  if (res.ok) {
    const body = await res.json();
    return body;
  }

  console.log(res);
  throw new Error(res.statusText);
}

export async function fetchStatsCanadaCube(props: FetchStatsCanadaProps) {
  const { action, method, productId } = props;

  const res = await fetch(
    `https://www150.statcan.gc.ca/t1/wds/rest/${action}`,
    method === "POST"
      ? {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([
            {
              productId,
            },
          ]),
        }
      : undefined
  );

  const body = await res.json();
  return body;
}

export async function fetchStatsCanadaCoordInfo(props: FetchStatsCanadaProps) {
  const { productId, coordinate, action, method } = props;

  const res = await fetch(
    `https://www150.statcan.gc.ca/t1/wds/rest/${action}`,
    method === "POST"
      ? {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([
            {
              productId,
              coordinate,
            },
          ]),
        }
      : undefined
  );

  const body = await res.json();
  return body;
}
