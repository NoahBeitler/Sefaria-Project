import React from 'react';
import {TopicLandingSearch} from "./TopicLandingSearch";
import {NavSidebar} from "../NavSidebar";
import Footer from "../Footer";
import {TopicSalad} from "./TopicSalad";
import {RainbowLine} from "../RainbowLine";
import Sefaria from "../sefaria/sefaria";


export const TopicsLandingPage = ({openTopic}) => {
    const sidebarModules = [
        {type: 'TrendingTopics'},
    ];
    const numLibrayTopics = Sefaria.numLibraryTopics;
    return (
        <div className="readerNavMenu" key="0">
            <div className="content">
                <div className="sidebarLayout">
                    <div className="contentInner mainColumn topic-landing-page-content">
                        <TopicLandingSearch openTopic={openTopic} numOfTopics={numLibrayTopics}/>
                        <TopicSalad/>
                    </div>
                    <NavSidebar sidebarModules={sidebarModules} />
                </div>
                <Footer />
            </div>
        </div>
    )
};
