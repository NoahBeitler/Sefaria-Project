import React from 'react';
import {useEffect, useState} from "react";
import Sefaria from "../sefaria/sefaria";
import {InterfaceText} from "../Misc";


export const TopicsMonte = () => {
    const numTopics = 3;
    const [deck, setDeck] = useState([]);

    const renderSaladItem = (item) => {
        return(<a href={`/topics/${item.slug}`} className="topic-salad-item">
                <InterfaceText text={item.text}/>
                </a>)
    }

    const fetchRandomTopicDeck = async () => {
        const poolName = Sefaria.getLangSpecificTopicPoolName('general');
        const topics = await Sefaria.getTopicsByPool(poolName, numTopics*numTopics);
        const lang = Sefaria.interfaceLang == "hebrew"? 'he' : 'en';
        console.log(topics)
        const deck = topics
          .filter(topic => topic.description?.[lang])
          .slice(0, numTopics)
          .map(topic => ({
            slug: topic.slug,
            title: topic.primaryTitle,
            description: topic.description
          }));
        console.log(deck);
        return deck;
    }

    const loadDeck = async () => {
        const deck = await fetchRandomTopicDeck();
        setDeck(deck);
    };

    useEffect(() => {
        loadDeck();
    }, []);

    return (
    <>
      <div className='topic-monte'>
          {deck.map(topic=><div>{topic.slug}</div>)}
      </div>
    </>

  );
};