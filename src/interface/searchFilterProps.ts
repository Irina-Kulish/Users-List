export interface SearchFilterProps {
  searchTerm: string;
  sortOrder: 'asc' | 'desc';
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onReset: () => void;
}
