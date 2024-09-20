import React from "react";
import { DisplayFlex, StyledText } from "../components/styledComponents";
import Icon from "../components/Icon";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { LineChart } from "react-native-chart-kit";

type OnboardingProps = {
    navigation: NavigationProp<any>;
};

const StatisticsScreen: React.FC<OnboardingProps> = ({ navigation }) => {


    return (
        <>
            <DisplayFlex flex={1} direction="row" justifyContent="space-between" alignItems="flex-start" className="px-3 py-12 bg-white">
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <Icon name="ChevronLeftIcon" type="solid" color="black" size={30} />
                </TouchableOpacity>
                <View>
                    <StyledText color="black" fontWeight="bold">Statistics</StyledText>
                </View>
                <TouchableOpacity >
                    <Icon name="ArrowDownTrayIcon" type="solid" color="black" size={24} />
                </TouchableOpacity>
            </DisplayFlex>
            <ScrollView horizontal={true}>
                <LineChart
                    onDataPointClick={(data) => console.log(data)}
                    withDots={true}
                    withVerticalLabels={true}
                    withHorizontalLabels={true}
                    withShadow={true}
                    withInnerLines={false}
                    withOuterLines={false}
                    withVerticalLines={false}
                    withHorizontalLines={false}

                    data={{
                        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                        datasets: [
                            {
                                data: [
                                    250,
                                    50,
                                    75,
                                    170,
                                    50,
                                    250,
                                    25,
                                    150,
                                    200,
                                    100,
                                    220,
                                    230,
                                ],
                            },
                        ],
                    }}
                    width={1000}
                    height={250}
                    yAxisLabel="$"
                    yAxisInterval={1}
                    chartConfig={{
                        backgroundColor: "#f00",
                        backgroundGradientFrom: "white",
                        backgroundGradientTo: "white",
                        decimalPlaces: 2,
                        color: (opacity = 0.3) => `rgba(67, 136, 131, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(102, 102, 102, ${opacity})`,
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#438883",
                        },
                    }}
                    bezier={true}

                />
            </ScrollView>

        </ >
    );
};

export default StatisticsScreen;

