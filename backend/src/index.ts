import "reflect-metadata";
import { NawyApp } from './app';
import { AppDataSource } from './db/dataSourceConfig';
import dataSourceContainer from './db/dataSource';

const init = async () => {
  try {
    const appDataSource = AppDataSource;

    if (!appDataSource.isInitialized) {
      await appDataSource.initialize();
    }
    dataSourceContainer.appDataSource = appDataSource;

    const app = new NawyApp();

    await app.listen();
  } catch (error) {
    console.log('App init error', error);
  }
};

init();