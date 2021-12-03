interface ISpacelifCommitInfo {
  authorLogin: string;
  authorName: string;
  hash: string;
  message: string;
  timestamp: number;
  url: string;
}

interface ISpaceliftDeltaCounts {
  added: number;
  changed: number;
  deleted: number;
  resources: number;
}

interface ISpaceliftRun {
  id: string;
  branch: string;
  commit: ISpacelifCommitInfo;
  createdAt: number;
  delta: ISpaceliftDeltaCounts;
  triggeredBy: string;
  type: string;
}

interface ISpaceliftStackInfo {
  id: string;
  name: string;
  description: string;
  labels: string[];
}

interface ISpaceliftWebhookPayload {
  account: string;
  state: string;
  stateVersion: number;
  timestamp: number;
  run: ISpaceliftRun;
  stack: ISpaceliftStackInfo;
}

export { ISpaceliftWebhookPayload };
