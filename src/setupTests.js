const fetchMock = () => {
  const mockPromise = {};
  mockPromise.then  = () => mockPromise;
  mockPromise.catch = () => mockPromise;
  return mockPromise;
};
global.fetch = fetchMock