export interface DistributionType {
  make: string;
  distribution: number;
}

export interface DistributionData {
  total: number;
  distributionData: DistributionType[];
}
