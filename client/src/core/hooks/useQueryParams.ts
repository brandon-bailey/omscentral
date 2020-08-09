import { useLocation } from 'react-router';
import qs from 'query-string';

const useQueryParams = <T>() =>
  (qs.parse(useLocation().search) as any) as Partial<T>;

export default useQueryParams;
