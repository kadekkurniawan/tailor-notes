import React from "react";

import { NavigateFunction, useNavigate } from "react-router-dom";

import { Navbar } from "../../components/Navbar";
import {
    useMeasurementTypeStore,
    MeasurementTypeStore,
    useSewingInfoStore,
    SewingInfoStore,
} from "../../store/clothing";
import Select from "../../components/Select";
import { ListItem } from "../../components/ListItem";

const SettingsPage: React.FC = () => {
    const navigate: NavigateFunction = useNavigate();

    const { measurementType, changeMeasurementType, measurementOptions } =
        useMeasurementTypeStore((state: MeasurementTypeStore) => state);

    const { sewingInfo, changeSewingInfo, sewingOptions } = useSewingInfoStore(
        (state: SewingInfoStore) => state
    );

    return (
        <>
            <Navbar
                mainButton="arrow_back"
                pageName="Settings"
                onClickMainButton={() => navigate("/")}
            />

            <main className="mt-24">
                <div className="container">
                    <ul className="grid gap-4">
                        <ListItem
                            title="Default measurement type"
                            description="when you created a new note set this as the measurement type"
                            rightSide={
                                <Select
                                    value={measurementType}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLSelectElement>
                                    ) => changeMeasurementType(e.target.value)}
                                    name="clothingMeasurementType"
                                >
                                    {measurementOptions}
                                </Select>
                            }
                        />
                        <ListItem
                            title="Default sewing info"
                            description="when you created a new note set this as the sewing info"
                            rightSide={
                                <Select
                                    value={sewingInfo}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLSelectElement>
                                    ) => changeSewingInfo(e.target.value)}
                                    name="clothingSewingInfo"
                                >
                                    {sewingOptions}
                                </Select>
                            }
                        />
                    </ul>
                </div>
            </main>
        </>
    );
};

export default SettingsPage;
