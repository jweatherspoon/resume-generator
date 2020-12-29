import { Component } from "react";
import IResumeConfigurationProps from "../IResumeConfigurationProps";

// so the resume shell is meant to display a resume configuration 
abstract class ResumeShellBase<T extends IResumeConfigurationProps = IResumeConfigurationProps> extends Component<T>  {
    // what is the shared behavior I want? 
    // 
};

export default ResumeShellBase;