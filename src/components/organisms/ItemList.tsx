import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connectInfiniteHits } from 'react-instantsearch-native';
import { HomeScreenItem } from '../molecules/HomeScreenItem';
import { useSelector } from 'react-redux';
import { GenericText } from '../atoms/GenericText';
import { fontSize } from '../../globals/fonts';

// @ts-ignore

const ItemList = ({ hits, hasMore, refineNext }) => 
{
    if(hits.length > 0)
    {
        return (
            <FlatList
                data={hits}
                keyExtractor={item => item.objectID.toString()}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                /*onEndReached={() => {
                    if(hasMore)
                    refineNext()}
                }*/
                renderItem={({ item }) => {
                    return(<HomeScreenItem item={item} />)
                }}
            />
        );
    } else {
        return (
          <GenericText size={fontSize.l}>No Results</GenericText>  
        )
    }
}


ItemList.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasMore: PropTypes.bool.isRequired,
  refineNext: PropTypes.func.isRequired,
};

export default connectInfiniteHits(ItemList);