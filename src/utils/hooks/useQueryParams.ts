import { useLocation } from 'react-router';

export const useQueryParams = () => new URLSearchParams(useLocation().search);
