export class UrlFactory {
  constructor(private readonly baseUrl: string) {
    if (!baseUrl.endsWith('/')) this.baseUrl = baseUrl + '/';
  }

  getUrl(url: string, ...params: string[]): string {
    if (this.invalidParamsNumber(url, params?.length ?? 0))
      throw new Error(`Invalid params number for url: ${this.baseUrl + url}`);

    if (this.invalidParamNotation(url))
      throw new Error(
        'Invalid params notation: ":" should be character preceding param name'
      );

    return (
      this.baseUrl +
      this.insertParams(this.removeSlashFromBeginning(url), params ?? [])
    );
  }

  private insertParams(url: string, params: string[]): string {
    return url
      .split('/')
      .map((fragment, index) =>
        fragment.startsWith(':') ? params[index] : fragment
      )
      .join('/');
  }

  private invalidParamsNumber(url: string, expectedCount: number): boolean {
    return url.split('').filter((x) => x === ':').length !== expectedCount;
  }

  private invalidParamNotation(url: string): boolean {
    return url.split('/').some((fragment) => fragment.slice(1).includes(':'));
  }

  private removeSlashFromBeginning(url: string): string {
    if (url.startsWith('/')) return url.slice(1);
    return url;
  }
}
