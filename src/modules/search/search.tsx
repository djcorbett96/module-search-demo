import { Module, ModuleConfig } from "@yext/pages/*";
import {
  HeadlessConfig,
  SearchHeadlessProvider,
  provideHeadless,
} from "@yext/search-headless-react";
import { SearchBar, UniversalResults } from "@yext/search-ui-react";

export const config: ModuleConfig = {
  name: "search",
};

const searchConfig: HeadlessConfig = {
  apiKey: "b083465ee2ad3d23460e150c6a297f7f",
  experienceKey: "dj-master",
  experienceVersion: "STAGING",
  locale: "en",
};

export const Search: Module = () => {
  const searcher = provideHeadless(searchConfig);

  return (
    <SearchHeadlessProvider searcher={searcher}>
      <SearchBar placeholder="Search..." />
      <UniversalResults verticalConfigMap={{}} />
      <div className="h-52 w-52 bg-black text-red-100">Hello World</div>
    </SearchHeadlessProvider>
  );
};
