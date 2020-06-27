import { reload, redirect, confirmClear } from '../src/index';

describe('Tests `reload` method', () => {
  const { location } = window;

  beforeAll(() => {
    delete window.location;
    window.location = {
      reload: jest.fn(),
    };
  });

  afterAll(() => {
    window.location = location;
  });

  it('mocks `reload` function', () => {
    expect(jest.isMockFunction(window.location.reload)).toBe(true);
  });

  it('reloads window', () => {
    reload();
    expect(window.location.reload).toHaveBeenCalledTimes(1);
  });
});

describe('Tests `redirect` method', () => {
  const { location } = window;

  beforeAll(() => {
    delete window.location;
    window.location = {
      href: 'https://localhost/',
    };
  });

  afterAll(() => {
    window.location = location;
  });

  it('confirms `href` is set to specified value', () => {
    expect(window.location.href).toBe('https://localhost/');
  });

  it('sets `href` to provided path', () => {
    redirect({ url: '/dummy-url' });
    expect(window.location.href).toBe('/dummy-url');
  });
});

describe('Tests `confirmClear` method', () => {
  const form = {
    payload: {},
    processing: true,
    inputs: {
      id: 1,
      name: 'Jon',
    },
    initial: {
      id: 0,
      name: '',
    },
    addNotification: function (payload) {
      this.payload = payload;
    },
    clone: payload => payload,
  };

  it('checks initial form state', () => {
    expect(form.processing).toBeTruthy();
    expect(form.inputs).toEqual({ id: 1, name: 'Jon' });
    expect(form.payload).toEqual({});
  });

  it('stops processing, resets inputs and dispatches notification', () => {
    confirmClear({ message: 'You did it!' }, form);
    expect(form.processing).toBeFalsy();
    expect(form.inputs).toEqual({ id: 0, name: '' });
    expect(form.payload).toEqual({ type: 'success', message: 'You did it!' });
  });

  it('returns default message if none is present in response', () => {
    confirmClear({}, form);
    expect(form.processing).toBeFalsy();
    expect(form.inputs).toEqual({ id: 0, name: '' });
    expect(form.payload).toEqual({
      type: 'success',
      message: 'Request has been processed successfully',
    });
  });
});
