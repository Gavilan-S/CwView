import { simulateClick, sandboxCreate } from "../sandbox/Sandbox.js";
import { connectionWebSocket, sendCoordinates } from "../webSocket/WebSocketMouse.js";

test('sandboxCreate deberia ser una función', () => { expect(typeof sandboxCreate).toBe('function'); });
test('simulateClick deberia ser una función', () => { expect(typeof simulateClick).toBe('function'); });
test('sandboxCreate deberia ser una función', () => { expect(typeof connectionWebSocket).toBe('function'); });
test('simulateClick deberia ser una función', () => { expect(typeof sendCoordinates).toBe('function'); });

const mockContext = {
  fillStyle: '',
  fillRect: jest.fn(),
  strokeStyle: '',
  lineWidth: 0,
  strokeRect: jest.fn(),
};

const mockCanvas = {
  getContext: jest.fn(() => mockContext),
  addEventListener: jest.fn(),
  getBoundingClientRect: jest.fn(() => ({
    left: 0,
    top: 0
  })),
  width: 800,
  height: 600
};

// Mock 
global.requestAnimationFrame = jest.fn();

describe('Falling Sand Application', () => {
  let originalWindow;

  beforeEach(() => {
    originalWindow = global.window;
    global.window = {
      innerWidth: 1024,
      innerHeight: 768,
      addEventListener: jest.fn(),
      requestAnimationFrame: jest.fn(),
      sendCoordinates: jest.fn()
    };

    // clear Mocks
    jest.clearAllMocks();
    mockContext.fillRect.mockClear();
    mockContext.strokeRect.mockClear();
    mockCanvas.addEventListener.mockClear();
  });

  afterEach(() => {
    global.window = originalWindow;
  });

  document.getElementById = jest.fn(() => mockCanvas);

  describe('sandboxCreate', () => {
    it('debería inicializar el canvas con los eventos correctos', () => {
      sandboxCreate(mockCanvas);

      expect(mockCanvas.addEventListener).toHaveBeenCalledTimes(8);

      const eventTypes = mockCanvas.addEventListener.mock.calls.map(call => call[0]);
      expect(eventTypes).toContain('mousedown');
      expect(eventTypes).toContain('mousemove');
      expect(eventTypes).toContain('mouseup');
      expect(eventTypes).toContain('mouseleave');
      expect(eventTypes).toContain('touchstart');
      expect(eventTypes).toContain('touchmove');
      expect(eventTypes).toContain('touchend');
      expect(eventTypes).toContain('touchcancel');
    });
  });

  describe('simulateClick', () => {
    it('debería procesar coordenadas correctamente', () => {
      simulateClick('100,100');
      expect(document.getElementById).toHaveBeenCalledWith('sandboxCanvas');
    });
    it('no debería hacer nada si no encuentra el canvas', () => {
      document.getElementById.mockReturnValueOnce(null);
      expect(() => simulateClick('100,100')).not.toThrow();
    });
  });
});

