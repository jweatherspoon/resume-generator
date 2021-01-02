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
                componentId: RESUME_COMPONENT_IDS.IconImage,
                componentProps: [
                    createString(PROPERTY_TYPES.ImageSource, "resources/logos/logo-pink-01.png"),
                    createString(PROPERTY_TYPES.Width, "50%")
                ]
            },
            {
                componentId: RESUME_COMPONENT_IDS.ContactDetails,
                componentProps: [
                    createProperty(PROPERTY_TYPES.Details, DataTypes.List, [
                        { detail: "(775) 303-2407" },
                        { detail: "jweatherspoon.se@gmail.com" },
                        { detail: "@jweatherspoon" },
                        { detail: "/jweatherspoon" },
                        { detail: "Reno, NV" },
                    ])
                ]
            },
            {
                componentId: RESUME_COMPONENT_IDS.EducationInformation,
                componentProps: [
                    createString(PROPERTY_TYPES.Organization, "University of Nevada, Reno"),
                    createString(PROPERTY_TYPES.Degree, "Bachelor of Science"),
                    createString(PROPERTY_TYPES.Field, "Computer Science and Engineering"),
                    createString(PROPERTY_TYPES.Flair, "--"),
                    createString(PROPERTY_TYPES.Description, "TBD"),
                    createNumber(PROPERTY_TYPES.Gpa, 3.854),
                ]
            }
        ],
        mainContent: [
            {
                componentId: RESUME_COMPONENT_IDS.PositionHeader,
                componentProps: [
                    createProperty(PROPERTY_TYPES.Name, DataTypes.String, "Jon Weatherspoon"),
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
            },
            {
                componentId: RESUME_COMPONENT_IDS.ReferenceSection,
                componentProps: [
                    createNumber(PROPERTY_TYPES.ContentSpacing, 4)
                ]
            }
        ]
    },
    clone: (o) => TestConfig
}

export default TestConfig;