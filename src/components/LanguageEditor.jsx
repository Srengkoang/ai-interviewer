import { LANGUAGE_VERSIONS } from "./constants";

const languages = Object.entries(LANGUAGE_VERSIONS);

const LanguageSelector = () => {
  return (
    <div>
      {languages.map(([language, version]) => (
        <div key={language}>
          {language}
          &nbsp;
          {version}
        </div>
      ))}
    </div>
  );
};

export default LanguageSelector;