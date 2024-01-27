import { CubeDimensionType, CubeMemberType } from "@/data/statsCanada/types";

export const generateCubeCombinations = (
  cubeMemberArray: CubeMemberType[][]
) => {
  const divisors: number[] = [];
  let combinationsCount = 1;
  for (let i = cubeMemberArray.length - 1; i >= 0; i--) {
    divisors[i] = divisors[i + 1]
      ? divisors[i + 1] * cubeMemberArray[i + 1].length
      : 1;
    combinationsCount *= cubeMemberArray[i].length || 1;
  }

  const getCombination = (n: number, arrays, divisors: number[]) =>
    arrays.reduce((acc, arr, i) => {
      const index = Math.floor(n / divisors[i]) % arr.length;
      acc.push(arr[index]);
      return acc;
    }, []);

  const combinations = [];
  for (let i = 0; i < combinationsCount; i++) {
    combinations.push(getCombination(i, cubeMemberArray, divisors));
  }
  return combinations;
};
