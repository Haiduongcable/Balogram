import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import { Button, Text, Image, Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { mediaActions } from '../redux/actions';
import { ImageHelper } from '../helpers';
import { useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import { StatusBar } from 'react-native';
const { width } = Dimensions.get('window')

const Header = ({albumNames, selectedAssets, selectedAlbum, handleBack, handleSend, handleAlbumSelected, handleLaunchCamera}) => {
  return (
    <View style={headerStyles.container}>
      <TouchableOpacity onPress={handleBack} style={headerStyles.iconBtn}>
        <Icon name='close' type='antdesign' size={28} />
      </TouchableOpacity>
      <View style={headerStyles.pickerContainer}>
        <Picker
          mode='dropdown'
          selectedValue={selectedAlbum}
          onValueChange={handleAlbumSelected}
          style={headerStyles.picker}
        >
          {albumNames.map((album) => (
            <Picker.Item key={album} label={album} value={album} />
          ))}
        </Picker>
      </View>
      {selectedAssets.length > 0 ? (
        <Button
          title='Next'
          buttonStyle={headerStyles.nextBtn}
          onPress={handleSend}
        />
      ) : (
        <TouchableOpacity onPress={handleLaunchCamera} style={headerStyles.iconBtn}>
          <Icon type='antdesign' name='camera' size={28} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const headerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  iconBtn: {
    padding: 6,
  },
  pickerContainer: {
    flex: 1,
    marginHorizontal: 18,
    justifyContent: 'center',
  },
  picker: {
    height: 40,
    width: '100%',
  },
  nextBtn: {
    paddingHorizontal: 18,
    backgroundColor: '#0275d8',
    borderRadius: 20,
  },
});

const MediaItem = ({ item, selectedAssets, handleItemSelected }) => {
  const isSelected = selectedAssets.some(asset => asset.uri === item.uri);
  const selectedIndex = selectedAssets.findIndex(asset => asset.uri === item.uri);
  return (
    <TouchableOpacity style={styles.mediaItem} onPress={() => handleItemSelected(item)}>
      <Image source={{ uri: item.uri }} style={styles.image} />
      {isSelected && <View style={styles.overlay} />}
      <View style={[styles.selectMark, {backgroundColor: isSelected ? '#0275d8' : '#292b2c', borderColor: '#fff', borderWidth: 2}]}> 
        <Text style={styles.text}>{isSelected ? selectedIndex + 1 : ''}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Content = ({ albumAssets, selectedAssets, handleItemSelected }) => (
  <FlatList
    data={albumAssets}
    renderItem={({ item }) => (
      <MediaItem item={item} selectedAssets={selectedAssets} handleItemSelected={handleItemSelected} />
    )}
    keyExtractor={(item) => item.id}
    numColumns={3}
    columnWrapperStyle={{ justifyContent: 'space-between', marginVertical: 2 }}
    contentContainerStyle={{ paddingHorizontal: 4 }}
    showsVerticalScrollIndicator={false}
  />
);


const MediaPicker = ({ navigation }) => {
  const albumNames = ['Camera', 'Screenshots', 'Instagram', 'Zalo', 'Facebook'];
  const dispatch = useDispatch();
  const [selectedAlbum, setSelectedAlbum] = useState(albumNames[0]);
  const [albumAssets, setAlbumAssets] = useState([]);

  const selectedAssets = useSelector(state => state.media.selectedAssets);

  useEffect(() => {
    const fetchAlbumAssets = async (albumName) => {
      const albumAssets = await fetchAllAssetsInAlbum(albumName);
      setAlbumAssets(albumAssets);
    }
    fetchAlbumAssets(selectedAlbum);
  }, [selectedAlbum]);

  const fetchAllAssetsInAlbum = async (albumName) => {

    let albumAssets = [];

    try {
      const album = await ImageHelper.getAlbum(albumName);
      albumAssets = await ImageHelper.getAssetsInAlbum(album);

    } catch (err) {
      console.log(err);
    }
    return albumAssets.assets;
  }


  const handleBack = () => {
    // const listItem = useSelector();
    // console.log(listItem);
    dispatch(mediaActions.resetState());
    navigation.goBack();
  }

  const handleAlbumSelected = (album) => setSelectedAlbum(album);

  const handleItemSelected = async (item) => {
    const result = await ImageHelper.resizeImage(item);
    item.uri = result.uri;
    // console.log(item);
    if (selectedAssets.indexOf(item) >= 0) {
      dispatch(mediaActions.removeAsset(item))
    } else {
      dispatch(mediaActions.addAsset(item));
    }
  };

  const handleSend = () => {
    navigation.goBack();
  }


  const handleLaunchCamera = async () => {
    const result = await ImageHelper.launchCamera();
    // console.log(result)

    // if (!result.cancelled) {
    //   console.log(result.uri);
    // }
  }


  return (
    <View style={styles.container}>
      <Header
        albumNames={albumNames}
        selectedAssets={selectedAssets}
        selectedAlbum={selectedAlbum}
        handleBack={handleBack}
        handleSend={handleSend}
        handleAlbumSelected={handleAlbumSelected}
        handleLaunchCamera={handleLaunchCamera}
      />

      <Content
        albumAssets={albumAssets}
        selectedAssets={selectedAssets}
        handleItemSelected={handleItemSelected}
      />
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight + 10,
  },
  image: {
    width: width / 3,
    height: width / 3,
    resizeMode: 'cover',
    // marginRight: 2,
  },
  selectedImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  text: {
    fontSize: 13,
    color: '#FFFFFF'
  },
  selected: {
    position: 'absolute',
    top: 2,
    right: 10,
    width: 22,
    height: 22,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  }
});


MediaPicker.propTypes = {

};

export default MediaPicker;