declare global {
  var TextEncoder: typeof TextEncoder;
  var TextDecoder: typeof TextDecoder;
  var fetch: jest.Mock;
  var IntersectionObserver: jest.Mock;
  var ResizeObserver: jest.Mock;
}

export {};