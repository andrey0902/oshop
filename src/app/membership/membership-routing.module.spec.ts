import { MembershipRoutingModule } from './membership-routing.module';

describe('MembershipRoutingModule', () => {
  let membershipRoutingModule: MembershipRoutingModule;

  beforeEach(() => {
    membershipRoutingModule = new MembershipRoutingModule();
  });

  it('should create an instance', () => {
    expect(membershipRoutingModule).toBeTruthy();
  });
});
