import React, {useContext} from "react";
import Sefaria from "./sefaria/sefaria";
import PropTypes from "prop-types";
import SourceTranslationsButtons from "./SourceTranslationsButtons";
import {ReaderPanelContext} from "./context";
import LayoutButtons from "./LayoutButtons";
import FontSizeButtons from "./FontSizeButton";
import ToggleSwitchLine from "./components/ToggleSwitchLine";

const ReaderDisplayOptionsMenu = () => {
    const {language, setOption, isComparePanel, panelMode, aliyotShowStatus, textsData, vowelsAndCantillationState} = useContext(ReaderPanelContext);
    const showLangaugeToggle = () => {
      if (Sefaria._siteSettings.TORAH_SPECIFIC) return true;

      if (!textsData) return true

      const hasHebrew = !!textsData.he.length;
      const hasEnglish = !!textsData.text.length;
      return !(hasHebrew && hasEnglish);
    };
    const showPrimary = language !== 'english';
    const showTranslation = language !== 'hebrew';
    const setShowTexts = (showPrimary, showTranslation) => {
        const language = (showPrimary && showTranslation) ? 'bilingual' : (showPrimary) ? 'hebrew' : 'english';
        setOption('language', language);
    };

    const borderLine = <div className="text-menu-border"/>;

    const haAliyot = () => {
        let booksWithAliyot = ["Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Onkelos Genesis", "Onkelos Exodus", "Onkelos Leviticus", "Onkelos Numbers", "Onkelos Deuteronomy"];
        return booksWithAliyot.includes(textsData?.book);
    };
    const showAliyotToggle = () => {
        return haAliyot() && panelMode !== "Sheet";
    };
    const onAliyotChange = () => {
        const newAliyot = (aliyotShowStatus === 'aliyotOn') ? 'aliyotOff' : 'aliyotOn';
        setOption('aliyotTorah', newAliyot)
    };

    const sampleHas = (regex, textOrHe) => {
        let sample = textsData[textOrHe];
        while (Array.isArray(sample)) {
            sample = sample[0];
        }
        return regex.test(sample);
    }
    const showVowelsToggle = () => {
        const vowels_re = /[\u05b0-\u05c3\u05c7]/g;
        return (showPrimary && sampleHas(vowels_re, 'he')) || (showTranslation && sampleHas(vowels_re, 'text'));
    };
    const onVowelsClick = () => {
        if (vowelsAndCantillationState === 'none') {
            setOption('vowels', 'partial');
        } else {
            setOption('vowels', 'none')
        }
    };
    const vowelsAreShown = vowelsAndCantillationState !== 'none';

    const showCantillationToggle = () => {
        const cantillation_re = /[\u0591-\u05af]/g;
        return (showPrimary && sampleHas(cantillation_re, 'he')) || (showTranslation && sampleHas(cantillation_re, 'text'));
    };
    const cantillationDisabled = !vowelsAreShown;
    const onCantillationClick = () => {
        const newValue = (vowelsAndCantillationState === 'all') ? 'partial' : 'all';
        setOption('vowels', newValue)
    };
    const cantillationsAreShown = vowelsAndCantillationState === 'all';

    return (
        <div className="texts-properties-menu">
            {showLangaugeToggle() && <>
                <SourceTranslationsButtons
                    showPrimary={showPrimary}
                    showTranslation={showTranslation}
                    setShowTexts={setShowTexts}
                />
                {borderLine}
            </>}
            {!isComparePanel && <>
                <LayoutButtons/>
                {showAliyotToggle() && <ToggleSwitchLine
                    name="aliyot"
                    text="Aliyot"
                    onChange={onAliyotChange}
                    isChecked={aliyotShowStatus === 'aliyotOn'}
                />}
                {borderLine}
                <FontSizeButtons/>
                {borderLine}
                {showVowelsToggle() && <ToggleSwitchLine
                    name="vowels"
                    text="Vowels"
                    onChange={onVowelsClick}
                    isChecked={vowelsAreShown}
                />}
                {showCantillationToggle() && <ToggleSwitchLine
                    name="cantilation"
                    text="Cantilation"
                    disabled={cantillationDisabled}
                    onChange={onCantillationClick}
                    isChecked={cantillationsAreShown}
                /> }
            </>}
        </div>
    );
};
ReaderDisplayOptionsMenu.propTypes = {
};
export default ReaderDisplayOptionsMenu;
