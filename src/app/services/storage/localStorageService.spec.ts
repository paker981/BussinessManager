import { AbstractStorageService } from "src/app/interfaces/storage.interface";
import { LocalStorageService } from "./localStrorageService.class";

describe('LocalStorageService', () => {
    let localStorageService: AbstractStorageService;
    const windowMock = {
      localStorage: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        clear: jest.fn(),
        removeItem: jest.fn()
      }
    }
  
    beforeEach(() => {
      localStorageService = new LocalStorageService(windowMock as unknown as Window); // <--- mockujesz window <iframe>
    });
  
    it('should clear session storage', () => {
      // when
      localStorageService.clear();
  
      // then
      expect(windowMock.localStorage.clear).toHaveBeenCalled();
    });
  
    it('should save data to session storage', () => {
      // given
      const email = 'example@example.com';
      const token = 'someToken';
  
      // when
      localStorageService.saveData(email, token);
  
      // then
      expect(windowMock.localStorage.setItem).toHaveBeenCalledWith(email, token);
    });
  
    it('should get data from session storage', () => {
      // given
      const email = 'example@example.com';
      const token = 'someToken';
      windowMock.localStorage.getItem.mockReturnValue(token);
  
      // when
      const result = localStorageService.getData(email);
  
      // then
      expect(windowMock.localStorage.getItem).toHaveBeenCalledWith(email);
      expect(result).toBe(token);
    });
  
    it('should return empty string if data is not found in session storage', () => {
      // given 
      const email = 'example@example.com';
      windowMock.localStorage.getItem.mockReturnValue(null);
  
      // when
      const result = localStorageService.getData(email);
  
      // then
      expect(windowMock.localStorage.getItem).toHaveBeenCalledWith(email);
      expect(result).toBe('');
    });
  });