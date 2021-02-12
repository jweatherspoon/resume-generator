# Getting Started 
Todo lol

# How To
### Add a new Resume Component 
To add a new resume component, do the following:
1. Define a data template in src/data-model/resume-components/template-generators. Make sure your template generator returns an array of components (even if there is just one).
2. Add the template generator to src/data-model/resume-components/ResumeComponentTemplates.js ResumeComponentMap
3. Define the view component in src/view-components/resume-components. 
4. Add an entry to the ResumeComponentMap in src/view-components/resume-components/ResumeComponentFactory.jsx -- Follow the format of the other entries.
5. If you defined any properties with unsupported data types, you will need to define a new property editor for the editor to appear.

### Add a new Property Editor
Todo lol