import React from 'react';
import { StyleSheet, View, FlatList, Image, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connectInfiniteHits } from 'react-instantsearch-native';
import { HomeScreenItem } from '../molecules/HomeScreenItem';
import { useSelector } from 'react-redux';
import { GenericText } from '../atoms/GenericText';
import { fontSize } from '../../globals/fonts';
import Highlight from './Highlights';

const styles = StyleSheet.create({
    separator: {
      borderBottomWidth: 1,
      borderColor: '#ddd',
    },
    item: {
      padding: 10,
      flexDirection: 'row',
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      width: '100%',
      alignContent: 'center',
      justifyContent: 'space-between'
    },
    titleText: {
      width: '70%'
    },
  });


type Props = {
    hits: any
    hasMore: any
    refineNext: any
}

const SearchList: React.FC<Props> = ({ hits, hasMore, refineNext }) => 
{
    if(hits.length > 0)
    {
        return (
            <FlatList
                data={hits}
                keyExtractor={item => item.objectID.toString()}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                onEndReached={() => {
                    if(hasMore)
                    refineNext()}
                }
                style={{width: '100%'}}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <View style={styles.titleText}>
                            <Text>{item.produktnavn}</Text>
                        </View>
                        
                        <Image source={{uri: item.billedurl}} style={{ width: 50, height: 50, resizeMode:'contain'}} />
                    </View>
                  )}
            />
        );
    } else {
        return (
          <GenericText size={fontSize.l}>No Results</GenericText>  
        )
    }
}

export default connectInfiniteHits(SearchList);