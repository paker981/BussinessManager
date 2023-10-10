import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { STORAGE_SERVICE } from '../../../tokens/storage.token';
import { BussinessHttpService } from '../../../services/bussiness/bussiness-http.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;

  const storageServiceMock = {
    saveData: jest.fn(),
    clear: jest.fn()
  };

  const bussinessApi = {
    signIn: jest.fn(),
    signUp: jest.fn()
  }

  const router = {
    navigate: jest.fn()
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {
          provide: STORAGE_SERVICE,
          useValue: storageServiceMock
        },
        {
          provide: BussinessHttpService,
          useValue: bussinessApi
        },
        {
          provide: Router,
          useValue: router
        }
      ]
    });
    service = TestBed.inject(AuthService);
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login user', () => {
    //given
    const user = { email: 'example@example.com', password: '123' };
    const authTokenMock = '###';
    bussinessApi.signIn.mockReturnValue(of({accessToken: authTokenMock}));

    //when
    service.login(user.email, user.password).subscribe()

    //then
    expect(bussinessApi.signIn).toBeCalledWith(user);
    expect(storageServiceMock.saveData).toHaveBeenCalledWith('authToken',authTokenMock);

  });

  it('should register user', () => {
    //given
    const user = { email: 'example@example.com', password: '123' };
    bussinessApi.signUp.mockReturnValue(of({}));

    //when
    service.register(user.email, user.password).subscribe()

    //then
    expect(bussinessApi.signUp).toBeCalledWith(user);
  });

  it('should logout user', () => {
    //when
    service.logOut();

    //then
    expect(storageServiceMock.clear).toHaveBeenCalled();
    expect(router.navigate).toBeCalledWith(['/auth']);
  });
});
