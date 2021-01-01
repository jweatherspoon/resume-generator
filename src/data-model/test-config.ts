import IResumeConfiguration from "./ResumeConfiguration";
import { createProperty, createString, createNumber, createBoolean, createDate, createThemeProperty } from "./index";
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
                    {
                        componentId: RESUME_COMPONENT_IDS.JobDescription,
                        componentProps: [
                            createString(PROPERTY_TYPES.Title, "Software Engineering Specialist"),
                            createString(PROPERTY_TYPES.Organization, "Bently Nevada"),
                            createDate(PROPERTY_TYPES.BeginDate, new Date(2019, 3, 25)),
                            createString(PROPERTY_TYPES.Description, "I did some cool stuff. Like I wrote this test boi and people used it. I still use it cause its ez for me heheh")
                        ]
                    }
                ]
            },
            {
                componentId: RESUME_COMPONENT_IDS.HeaderedContentSection,
                componentProps: [
                    createString(PROPERTY_TYPES.Title, "PERSONAL PROJECTS"),
                    createNumber(PROPERTY_TYPES.ContentSpacing, 4),
                    createBoolean(PROPERTY_TYPES.HasDivider, true),
                    createString(PROPERTY_TYPES.Flair, "\\\\")
                ]
            }
        ]
    },
    clone: (o) => TestConfig
}

export default TestConfig;