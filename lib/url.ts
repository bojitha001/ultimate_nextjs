import qs from "query-string";

interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}
interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const queryString = qs.parse(params); // Convert the query string into an object

  queryString[key] = value; // Update the specific key with the new value

  const url = qs.stringifyUrl({
    // Convert the updated query object back into a query string and construct the full URL
    url: window.location.pathname,
    query: queryString,
  });

  console.log(url);

  return url;
};

export const removeKeysFromQuery = ({ params, keysToRemove }: RemoveUrlQueryParams) => {
  const queryString = qs.parse(params);

  keysToRemove.forEach((key) => delete queryString[key]);

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: queryString,
    },
    { skipNull: true }
  );
};
