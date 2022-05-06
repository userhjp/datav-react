import { useSearchParams } from 'react-router-dom';

export function useQueryParam<T>(key?: string): { [key: string]: any } | string {
  const [searchParams] = useSearchParams();
  if (key) return searchParams.get(key);
  const params = {};
  for (const [key, val] of searchParams.entries()) {
    params[key] = val;
  }
  return params;
}

// function useQueryParam<T>(key: string): [T | undefined, (newQuery: T, options?: NavigateOptions) => void] {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const paramValue = searchParams.get(key);

//   const value = React.useMemo(() => JSURL.parse(paramValue), [paramValue]);

//   const setValue = React.useCallback(
//     (newValue: T, options?: NavigateOptions) => {
//       const newSearchParams = new URLSearchParams(searchParams);
//       newSearchParams.set(key, JSURL.stringify(newValue));
//       setSearchParams(newSearchParams, options);
//     },
//     [key, searchParams, setSearchParams]
//   );

//   return [value, setValue];
// }
