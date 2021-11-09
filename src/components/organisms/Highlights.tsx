import React from 'react';
import { Text, Image } from 'react-native';
import { connectHighlight } from 'react-instantsearch-native';

type Props = {
    attribute: any
    hit: any
    highlight: any
}

const Highlight: React.FC<Props> = ({ attribute, hit, highlight }) => {
  const highlights = highlight({
    highlightProperty: '_highlightResult',
    attribute,
    hit,
  });

  return (
      <>
      
        <Text>
        {highlights.map(({ value, isHighlighted }: any, index: any) => {
            const style = {
            backgroundColor: isHighlighted ? 'yellow' : 'transparent',
            };

            return (
            <Text key={index} style={style}>
                {value}
            </Text>
            );
        })}
        </Text>
      </>
    
  );
};


export default connectHighlight(Highlight);