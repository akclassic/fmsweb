import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from '@chakra-ui/react';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Select onChange={(e) => changeLanguage(e.target.value)} width="150px" variant="outline">
      <option value="en">English</option>
      <option value="hi">Hindi</option>
      <option value="bn">Bengali</option>
      <option value="te">Telugu</option>
      <option value="ta">Tamil</option>
      <option value="gu">Gujarati</option>
      <option value="mr">Marathi</option>
      <option value="ml">Malayalam</option>
    </Select>
  );
};

export default LanguageSelector;
