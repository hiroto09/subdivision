type FeatureProcesses = Record<string, string[]>;
type Step = Record<string, FeatureProcesses>;

export default interface ResType {
    [key: string]: Step;
}