import { SimpleTableModule } from './simple-table.module';

describe('SimpleTableModule', () => {
  let simpleTableModule: SimpleTableModule;

  beforeEach(() => {
    simpleTableModule = new SimpleTableModule();
  });

  it('should create an instance', () => {
    expect(simpleTableModule).toBeTruthy();
  });
});
