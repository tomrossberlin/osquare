import React, {Component} from 'react';
import {
  ActivityIndicator,
  FlatList,
  LayoutAnimation,
  Linking,
  Platform,
  Share,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import {inject, observer} from 'mobx-react/native';
import ListButton from "./ListButton";
import styles from './styles/VenueList.styles';
import i18n from '../i18n';

@inject('venueStore')
@observer
class VenueList extends Component {
  async componentDidUpdate() {
    const {venueStore} = this.props;
    await venueStore.saveAppState();
  }

  handleMapPress = (label, lat, lng) => {
    const url = Platform.select({
      ios: `maps:0,0?q=${label}@${lat},${lng}`,
      android: `geo:${lat},${lng}?q=${label}`,
    });
    Linking.openURL(url).catch(() => null);
  };

  handleSharePress = async (name, id) => {
    const content = {message: name, url: `https://foursquare.com/v/${id}`};
    Share.share(content);
  };

  handleDetailPress = (id) => {
    const url = `https://foursquare.com/v/${id}`;
    Linking.openURL(url).catch(() => null);
  };

  handleVenuePress = (selectedId) => {
    const {venueStore} = this.props;
    LayoutAnimation.configureNext(LayoutAnimation.create(200, 'easeOut', 'opacity'));
    if (venueStore.selectedId === selectedId) {
      venueStore.setSelectedId('');
    } else {
      venueStore.setSelectedId(selectedId);
    }
  };

  render() {
    const {venueStore} = this.props;
    const {selectedId, venues} = venueStore;

    const {
      buttonRowStyle,
      cellStyle,
      listStyle,
      infoSectionStyle,
      infoTextStyle,
      nameStyle,
      selectedCellStyle,
    } = styles;

    return (
      <View style={{flex: 1}}>
        <FlatList
          data={venues}
          extraData={selectedId}
          initialNumToRender={15}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={ActivityIndicator}
          renderItem={({item}) => {
            const {id, name, categories, location: {distance, lat, lng}} = item;
            const category = categories.length ? categories[0].shortName : '';
            const isSelected = venueStore.selectedId === item.id;

            return (
              <TouchableWithoutFeedback
                onPress={() => this.handleVenuePress(id)}
              >
                <View style={[cellStyle, isSelected && selectedCellStyle]}>
                  <View style={infoSectionStyle}>
                    <Text style={nameStyle}>{name}</Text>
                    <Text style={infoTextStyle}>
                      {category} – {distance} m
                    </Text>
                  </View>
                  {!!isSelected && <View style={buttonRowStyle}>
                    <ListButton
                      isBold
                      onPress={() => this.handleMapPress(name, lat, lng)}
                      title={i18n.t('VenueList.mapButton')}
                    />
                    <ListButton
                      isBold
                      onPress={() => this.handleSharePress(name, id)}
                      title={i18n.t('VenueList.shareButton')}
                    />
                    <ListButton
                      isBold
                      onPress={() => this.handleDetailPress(id)}
                      title={i18n.t('VenueList.detailButton')}
                    />
                  </View>}
                </View>
              </TouchableWithoutFeedback>
            )
          }}
          style={listStyle}
        />
      </View>
    )
  }
}

export default VenueList;
