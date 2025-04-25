import { DataSource } from 'typeorm';

class DataSourceContainer {
  private _appDataSource: DataSource | null = null;

  set appDataSource(dataSource: DataSource) {
    if (this._appDataSource === null) {
      this._appDataSource = dataSource;

    } else {
      throw new Error('appDataSource can only be set once.');
    }
  }

  get appDataSource(): DataSource {
    if (this._appDataSource === null) {
      throw new Error('appDataSource is not initialized.');
    }

    return this._appDataSource;
  }
}

const dataSourceContainer = new DataSourceContainer();

export default dataSourceContainer;
