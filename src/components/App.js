import React, {Component} from 'react';
import {Text, SafeAreaView, StatusBar, View} from 'react-native';
import {inject, observer} from 'mobx-react/native';
import VenueList from "./VenueList";
import i18n from '../i18n';
import styles from './styles/App.styles';

@inject('venueStore')
@observer
class App extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const {venueStore} = this.props;
    await venueStore.loadAppState().catch(() => null);
    await venueStore.fetchVenues().catch((error) => console.log(error));
  }

  async componentDidUpdate() {
    const {venueStore} = this.props;
    await venueStore.saveAppState();
  }

  render() {
    const {
      containerStyle,
      headerStyle,
      headlineStyle,
      subHeadlineStyle
    } = styles;

    return (
      <SafeAreaView style={containerStyle}>
        <StatusBar animated barStyle="light-content" />
        <View style={headerStyle}>
          <Text style={headlineStyle}>{i18n.t('App.headline')}</Text>
          <Text style={subHeadlineStyle}>{i18n.t('App.subHeadline')}</Text>
        </View>
        <VenueList />
      </SafeAreaView>
    )
  }
}

export default App;