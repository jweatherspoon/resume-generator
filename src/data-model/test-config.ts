import IResumeConfiguration from "./ResumeConfiguration";
import { createProperty, createThemeProperty } from "./index";
import DataTypes from "./DataTypes";
import PROPERTY_TYPES from "./PropertyTypes";
import RESUME_COMPONENT_IDS from "../components/resume-components";

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
            },
            {
                componentId: RESUME_COMPONENT_IDS.ContactDetails,
                componentProps: [
                    createProperty(PROPERTY_TYPES.Details, DataTypes.String, [
                        { icon: "P", detail: "(775) 303-2407" },
                        { icon: "G", detail: "@jweatherspoon" },
                        { icon: "E", detail: "jweatherspoon.se" },
                    ])
                ]
            }
        ],
        mainContent: [
            {
                componentId: RESUME_COMPONENT_IDS.PositionHeader,
                componentProps: [
                    createProperty(PROPERTY_TYPES.Name, DataTypes.String, "Jonathan Weatherspoon"),
                    createProperty(PROPERTY_TYPES.Title, DataTypes.String, "Software Engineer")
                ]
            }, 
            {
                componentId: RESUME_COMPONENT_IDS.PositionHeader,
                componentProps: [
                    createProperty(PROPERTY_TYPES.Name, DataTypes.String, "Mom"),
                    createProperty(PROPERTY_TYPES.Title, DataTypes.String, "Universe Conquerer")
                ]
            },
        ]
    },
    clone: (o) => TestConfig
}

export default TestConfig;