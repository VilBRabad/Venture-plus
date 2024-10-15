import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import IndustryScreen from "../Screens/FilterScreen/IndustryScreen";
import { NavigationContainer } from "@react-navigation/native";
import LocationScreen from "../Screens/FilterScreen/LocationScreen";
import RevenueScreen from "../Screens/FilterScreen/RevenueScreen";
import OtherScreen from "../Screens/FilterScreen/OtherScreen";
type RootFilterTopTabParamList = {
    Industry: undefined;
    Location: undefined;
    Revenue: undefined;
    Other: undefined;
}

const FilterTopTab = createMaterialTopTabNavigator<RootFilterTopTabParamList>();


const FilterTopTabNavigation = () => {
    return (
        <NavigationContainer>
            <FilterTopTab.Navigator screenOptions={{
                tabBarStyle: { backgroundColor: "#000000", marginTop: 15 },
                tabBarLabelStyle: { color: '#ffffff', fontSize: 12 },
                tabBarIndicatorStyle: { backgroundColor: '#AC84FF', justifyContent: 'center' },
                // tabBarItemStyle: { width: 100 },
            }}>
                <FilterTopTab.Screen
                    name="Industry"
                    component={IndustryScreen}
                />
                <FilterTopTab.Screen
                    name="Location"
                    component={LocationScreen}
                />
                <FilterTopTab.Screen
                    name="Revenue"
                    component={RevenueScreen}
                />
                <FilterTopTab.Screen
                    name="Other"
                    component={OtherScreen}
                />
            </FilterTopTab.Navigator>
        </NavigationContainer>
    )
}


export default FilterTopTabNavigation;