import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '@env';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    ActivityIndicator
} from 'react-native';
import MovieSection from '../components/movieSection';
import { ScrollView } from 'react-native-gesture-handler';
import CarouselComponent from '../components/carousel';

function HomeScreen({ navigation }) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    const handlePress = ({ title, id }) => { 
        navigation.navigate('Movie', {
            id,
            title
        });
    };

    useEffect(() => {
        setLoading(true);
        fetch(`${API_BASE_URL}/movies?p=1&l=6`)
            .then((response) => response.json())
            .then((data = []) => {
                if (!data.length) {
                    setError("No moview available");
                    return setLoading(false)
                }

                setLoading(false);
                setData(data);

                if (error) setError(null);
            })
            .catch((e) => {
                setLoading(false);
                setError("Fetching movies failed");
            })
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' color='tomato' />
            </View>
        );
    }

    if (error) {
        return (
            <Text>ERROR: {error}</Text>
        );
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <CarouselComponent data={data} onPress={handlePress} />
                <MovieSection
                    onPress={handlePress}
                    data={data}
                    title='Latest Movies'
                />
                <MovieSection
                    onPress={handlePress}
                    data={data}
                    title='Top Rated Movies'
                />
            </ScrollView>
        </SafeAreaView>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 24,
        padding: 10,
        textAlign: "center",
    },
});