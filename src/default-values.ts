import { IServerOptions } from "./http";

const defaultOptions: IServerOptions = {
  port: 5000,
  host: "localhost",
};

export class AppServerOptions {
  private _options: IServerOptions;

  constructor(serverOptions?: IServerOptions) {
    this._options = { ...serverOptions, ...defaultOptions };
  }

  public get options(): IServerOptions {
    return this._options;
  }
}
