import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderModule } from './shared/header/header.module';
import { RouterTestingModule } from '@angular/router/testing';
import { MatBadgeModule, MatButtonModule, MatIconModule, MatMenuModule } from '@angular/material';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { BehaviorSubject, of } from 'rxjs/index';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { HeaderComponent } from './shared/test-helper/header/header.component';
describe('AppComponent', () => {
  const FirestoreStub = {
    collection: (name: string) => ({
      doc: (_id: string) => ({
        valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
        set: (_d: any) => new Promise((resolve, _reject) => resolve()),
      }),
    }),
  };
  const AngularFirestoreStub = {
    // I just mocked the function you need, if there are more, you can add them here.
    collection: (someString) => {
      // return mocked collection here
    }
  };

  const AngularFireMocks = {
    auth: of({ uid: 'ABC123' })
  };

  // An anonymous user
  const authState = {
    displayName: 'testName',
    isAnonymous: true,
    uid: '17WvU2Vj58SnTz8v7EqyYYb0WRc2'
  };

  const mockAngularFireAuth: any = {
    auth: jasmine.createSpyObj('auth', {
      'signInAnonymously': Promise.reject({
        code: 'auth/operation-not-allowed'
      }),
      // 'signInWithPopup': Promise.reject(),
      // 'signOut': Promise.reject()
    }),
    authState: of(authState)
  };

  const mockMyFireAuth =  {
    get authState() {
      return of(authState);
    }
  };


  beforeEach(async(() => {


    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent
      ],
      imports: [

        RouterTestingModule,
        MatBadgeModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,

    ],
      providers: [
        { provide: AngularFireAuth, useValue: mockMyFireAuth },
        { provide: AngularFirestore, useValue: FirestoreStub },
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  // it(`should have as title 'app'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('app');
  // }));
  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to sell-learn!');
  // }));
});
