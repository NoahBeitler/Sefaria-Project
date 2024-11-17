import Sefaria from "./sefaria/sefaria";
import React, {useEffect, useState} from "react";
import classNames from "classnames";
import {EnglishText, HebrewText, InterfaceText, SearchButton} from "./Misc";
import { useCombobox } from 'downshift';



export const GeneralAutocomplete = ({
    getSuggestions,
    renderItem,
    renderInput,
    dropdownMenuClassString,
    onSubmit,
}) => {
    const [suggestions, setSuggestions] = useState([]);
      const {
        isOpen,
        getMenuProps,
        getInputProps,
        getItemProps,
        highlightedIndex,
        setInputValue
  } = useCombobox({
        items: suggestions,
        itemToString: (item) => (item ? item.name : ''),
        onInputValueChange: async ({ inputValue }) => {
            setSuggestions(await getSuggestions(inputValue));
        }
    });
    const inputProps = getInputProps();
    console.log("suggestions:", suggestions)
    return (
        <>
            {renderInput(inputProps, onSubmit)}
            <div
              {...getMenuProps()}
              className={dropdownMenuClassString}
            >
                {suggestions.map((item, index) => renderItem(item, index, highlightedIndex, getItemProps, onSubmit))}
            </div>
        </>
    );
};