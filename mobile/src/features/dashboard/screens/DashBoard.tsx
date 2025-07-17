import {useEffect, useState} from 'react';
import FirstScreen from './FirstScreen';
import SecondScreen from './SecondScreen';
import PagerView from 'react-native-pager-view';


function DashBoard() {

  return (
    <PagerView style={{ flex: 1 }} initialPage={0}>
      <FirstScreen key="1" />
      <SecondScreen key="2" />
    </PagerView>
  );
}


export default DashBoard;
