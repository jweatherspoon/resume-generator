import IResumeConfiguration from "./ResumeConfiguration";
import { createProperty, createThemeProperty } from "./index";
import DataTypes from "./DataTypes";
import PROPERTY_TYPES from "./PropertyTypes";

const TestConfig : IResumeConfiguration = {
    componentId: "test",
    templateId: "flashy",
    componentProps: [
        createThemeProperty("")
    ],
    regions: {
        sidebar: [
            {
                componentId: "test-one",
                componentProps: [
                    createProperty("displayText", DataTypes.String, "hello")
                ]
            },
            {
                componentId: "test-one",
                componentProps: [
                    createProperty("displayText", DataTypes.String, "my")
                ]
            },
            {
                componentId: "test-one",
                componentProps: [
                    createProperty("displayText", DataTypes.String, "is")
                ]
            }
        ],
        mainContent: [
            {
                componentId: "position-header",
                componentProps: [
                    createProperty(PROPERTY_TYPES.Name, DataTypes.String, "Jonathan Weatherspoon"),
                    createProperty(PROPERTY_TYPES.Title, DataTypes.String, "Software Engineer")
                ]
            },
        ]
    },
    clone: (o) => TestConfig
}

export default TestConfig;