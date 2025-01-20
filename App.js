import React,{useState, useEffect} from 'react';
import { FlatList, StatusBar, Text, TextInput, View, StyleSheet, Image} from 'react-native';

let originalData = [];

const App = () => {
  const [mydata, setMydata] = useState([]);

  useEffect(() => {
    fetch("https://mysafeinfo.com/api/data?list=cod4weapons&format=json&case=default")
    .then(response => {
        return response.json(); //return in json format
    })
    .then((myjson) => {
        if (originalData.length < 1)
        {
            setMydata(myjson); // mydata is myjson which from url data (this is data that changes)
            originalData = myjson;// originalData is myjson which from url data (there is 2 data that is using data from url)(this is used as default data)
        }
    })
  }, []);

  const filterData = (text) => {
      if (text != '') { //if data's title includes/has text from the search bar, it set the mydata to myFiltereddata which filtered originaldata without changing originaldata)
          let myFilteredData = originalData.filter((item) =>
          item.Weapon.includes(text));
          setMydata(myFilteredData);
      }
      else{
          setMydata(originalData); //if nothing is added to search bar, it then uses original data
      }
  }

  const renderItem = ({item, index}) => {
    return (
        <View  style={styles.opacityStyle }>
    <View style={styles.textContainer}>
        <Text  style={styles.headerText}>{item.ID}. {item.Weapon}</Text>
        <Text style={styles.textStyle}>Dmg: {item.Damage}</Text>
        <Text style={styles.textStyle}>RPM: {item.RateOfFire}</Text>
        <Text style={styles.textStyle}>Reload Time: {item.ReloadTime}</Text>
        <Text style={styles.textStyle}>Recoil: {item.Recoil}</Text>

    </View>
            <Image
                source={{ uri: "https://callofdutymaps.com/wp-content/uploads/MW-" + item.Weapon.toLowerCase().replace(/-/g, '-') + ".png" }}
                style={styles.imageStyle}
            />
        </View>

    );
  };

  return (
    <View>
      <StatusBar/>
        <Text style={styles.title} >Call of Duty 4 Weapons:</Text>

      <Text>Search:</Text>
      <TextInput style={styles.opacityStyle} onChangeText={(text) =>{filterData(text)}} placeholder="Search..." />
        <Text>Note: some image may not appear</Text>
        {/* some image may not appear due to their faulty way of naming their link*/}
        {/*eg.*/}
        {/*Normal link*/}
        {/*https://callofdutymaps.com/wp-content/uploads/MW-dragunov.png*/}
        {/*VS*/}
        {/*Weird link*/}
        {/*https://callofdutymaps.com/wp-content/uploads/MW-dragunov-1.png*/}
      <FlatList data={mydata} renderItem={renderItem} style={styles.contain} />
    </View>
  );
}

const styles = StyleSheet.create({
        opacityStyle: {
            flexDirection: 'row', // Items arranged in a row
            alignItems: 'center', // Vertically centers items
            justifyContent: 'space-between', // Spacing between text and image
            padding: 10, // Adds padding
            borderWidth: 1, // Optional: Adds a border for visibility
            borderColor: '#ddd', // Optional: Border color
            marginBottom: 10, // Adds space between items
            backgroundColor: '#f9f9f9', // Background color for styling
        },
        textContainer: {
            flex: 1, // Ensures the text takes up available space
            alignItems: 'flex-start', // Aligns text to the left
        },
        headerText: {
            fontSize: 16,
            fontWeight: 'bold',
        },
        textStyle: {
            fontSize: 14,
            color: '#333', // Optional: Text color
        },
        imageStyle: {
            width: 200, // Image width
            height: 100, // Image height
            marginLeft: 10, // Adds spacing between text and image
            borderRadius: 8, // Optional: Rounded corners
        },



        title:{
            fontSize: 20,
            textAlign: "center",
            fontWeight: "bold",
            color: "#f3f3f4",
            padding:20,
            backgroundColor:"red"

        },

    contain:{
            marginTop: 5,
        marginBottom: 150,
    }
    }
);

export default App;
