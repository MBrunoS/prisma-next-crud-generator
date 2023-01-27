import fs from 'fs';
import path from 'path';
import { generatePagesForModels } from '../templates/index';
import { getSampleDMMF } from './__fixtures__/getSampleDMMF';
import { checkIfFileExists } from './__fixtures__/fileExists';

describe('generatePagesForModels', () => {
  const BASE_PATH = path.join(__dirname, '..', '..');
  const API_PATH = path.join(BASE_PATH, 'pages', 'api');

  beforeAll(async () => {
    const sampleDMMF = await getSampleDMMF();
    await generatePagesForModels(sampleDMMF.datamodel.models, '');
  });

  afterAll(() => {
    fs.rmSync('lib', { recursive: true, force: true });
    fs.rmSync('pages', { recursive: true, force: true });
  });

  it('should generate _app.tsx file', async () => {
    const filePath = path.join(BASE_PATH, 'pages', '_app.tsx');
    const fileExists = await checkIfFileExists(filePath);
    expect(fileExists).toBeTruthy();
  });

  it('should generate index.tsx (dashboard) file', async () => {
    const filePath = path.join(BASE_PATH, 'pages', 'index.tsx');
    const fileExists = await checkIfFileExists(filePath);
    expect(fileExists).toBeTruthy();
  });

  it('should generate global.css file', async () => {
    const filePath = path.join(BASE_PATH, 'pages', 'global.css');
    const fileExists = await checkIfFileExists(filePath);
    expect(fileExists).toBeTruthy();
  });

  it('should generate api routes for the model', async () => {
    const indexFilePath = path.join(API_PATH, 'users', 'index.tsx');
    const dynamicFilePath = path.join(API_PATH, 'users', '[id].tsx');

    const routesFilesExists =
      (await checkIfFileExists(indexFilePath)) &&
      (await checkIfFileExists(dynamicFilePath));

    expect(routesFilesExists).toBeTruthy();
  });

  it('should generate CRUD pages for the model', async () => {
    const USERS_PATH = path.join(BASE_PATH, 'pages', 'users');

    const listPath = path.join(USERS_PATH, 'index.tsx');
    const listExists = await checkIfFileExists(listPath);
    const createPath = path.join(USERS_PATH, 'create.tsx');
    const createExists = await checkIfFileExists(createPath);
    const showPath = path.join(USERS_PATH, '[id]', 'index.tsx');
    const showExists = await checkIfFileExists(showPath);
    const editPath = path.join(USERS_PATH, '[id]', 'edit.tsx');
    const editExists = await checkIfFileExists(editPath);

    const crudFilesExists =
      listExists && createExists && showExists && editExists;

    expect(crudFilesExists).toBeTruthy();
  });
});
