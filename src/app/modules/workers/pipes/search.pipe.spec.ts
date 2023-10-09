import { TestBed } from '@angular/core/testing';
import { SearchPipe } from './search.pipe';
import { University } from 'src/app/interfaces/university.interface';

describe('SearchPipe', () => {
  let pipe: SearchPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchPipe]
    });
    pipe = TestBed.inject(SearchPipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms items based on the filter', () => {
    // given
    const items = [
      { name: 'University A' },
      { name: 'University B' },
      { name: 'University C' },
    ];

    // when
    const filter = 'B';
    const result = pipe.transform(items as University[], filter);

    // then
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('University B');
  });

  it('returns all items when filter is empty', () => {
    // given
    const items = [
      { name: 'University A' },
      { name: 'University B' },
      { name: 'University C' },
    ];

    // when
    const filter = '';
    const result = pipe.transform(items as University[], filter);

    // then
    expect(result.length).toBe(3);
  });

  it('returns empty arrays when items length are 0', () => {
    const items: University[] = [];

    const filter = 'A';
    const result = pipe.transform(items, filter);

    expect(result).toStrictEqual([]);
  });
});