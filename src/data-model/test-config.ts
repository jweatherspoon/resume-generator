import IResumeConfiguration from "./ResumeConfiguration";
import { createProperty, createString, createNumber, createBoolean, createThemeProperty } from "./index";
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
                componentId: RESUME_COMPONENT_IDS.HeaderedContentSection,
                componentProps: [
                    createString(PROPERTY_TYPES.Title, "WORK EXPERIENCE"),
                    createNumber(PROPERTY_TYPES.ContentSpacing, 4),
                    createBoolean(PROPERTY_TYPES.HasDivider, true),
                    createString(PROPERTY_TYPES.Flair, "\\\\")
                ],
                childrenData: [
                    
                ]
            }
        ]
    },
    clone: (o) => TestConfig
}

export default TestConfig;