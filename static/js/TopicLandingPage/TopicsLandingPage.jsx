import React from 'react';
import {TopicLandingSearch} from "./TopicLandingSearch";
import {NavSidebar} from "../NavSidebar";
import Footer from "../Footer";
import {FeaturedTopic} from "./FeaturedTopic";
import {TopicSalad} from "./TopicSalad";
import {RainbowLine} from "../RainbowLine";
import {TopicLandingCalendar} from "./TopicLandingCalendar";
import {TopicLandingParasha} from "./TopicLandingParasha";
import {TopicLandingSeasonal} from "./TopicLandingSeasonal";
import Sefaria from "../sefaria/sefaria";
import {TopicsMonte} from "./TopicsMonte";


export const TopicsLandingPage = ({openTopic}) => {
    const sidebarModules = [
        {type: 'TrendingTopics'},
    ];
    return (
        <div className="readerNavMenu" key="0">
            <div className="content">
                <div className="sidebarLayout">
                    <div className="contentInner mainColumn topic-landing-page-content">
                        <TopicLandingSearch openTopic={openTopic} numOfTopics={Sefaria.numLibraryTopics}/>
                        <TopicSalad/>
                        <FeaturedTopic />
                    <div className="topic-landing-temporal">
                        <TopicLandingParasha/>
                        <TopicLandingSeasonal/>
                    </div>
                        <TopicsMonte/>
                </div>
                    <NavSidebar sidebarModules={sidebarModules} />
                </div>
                <Footer />
            </div>
        </div>
    )
};
