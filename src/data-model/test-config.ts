import IResumeConfiguration from "./ResumeConfiguration";
import { createProperty, createThemeProperty } from "./index";
import DataTypes from "./DataTypes";

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
                    createProperty("displayText", DataTypes.String, "name")
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

        ]
    },
    clone: (o) => TestConfig
}

export default TestConfig;