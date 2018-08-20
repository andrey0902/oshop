import { ConfirmMatModule } from './confirm-mat.module';

describe('ConfirmMatModule', () => {
  let confirmMatModule: ConfirmMatModule;

  beforeEach(() => {
    confirmMatModule = new ConfirmMatModule();
  });

  it('should create an instance', () => {
    expect(confirmMatModule).toBeTruthy();
  });
});
