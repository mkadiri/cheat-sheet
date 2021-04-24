export class KubectlCommands {
  constructor(
    public context?: string,
    public namespace?: string,
    public pod?: string
  ) {}
}
