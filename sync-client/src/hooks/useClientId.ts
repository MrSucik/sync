export const useClientId = () => {
  const clientId = window.location.search.substring(
    1,
    window.location.search.length + 1
  );
  return clientId;
};
