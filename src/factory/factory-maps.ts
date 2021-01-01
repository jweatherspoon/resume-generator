import ContactDetails from "../components/resume-components/ContactDetails";
import HeaderedContentSection from "../components/resume-components/HeaderedContentSection";
import PositionHeader from "../components/resume-components/PositionHeader";
import FlashyResumeShell from "../components/resume-shells/FlashyResumeShell";
import IFactoryEnabledComponentDefinition from "./IFactoryEnabledComponent";
import IFactoryMapping from "./IFactoryMapping";

export abstract class FactoryMapBase extends Map<string, IFactoryEnabledComponentDefinition> implements IFactoryMapping {
    constructor(supportedComponents: IFactoryEnabledComponentDefinition[]) {
        super();

        for (let component of supportedComponents) {
            this.set(component.componentId, component);
        }
    }
}

class ResumeShellFactory extends FactoryMapBase {
    constructor() {
        const components: IFactoryEnabledComponentDefinition[] = [
            new FlashyResumeShell({})
        ];

        super(components);
    }
}

class ResumeComponentFactory extends FactoryMapBase {
    constructor() {
        const components: IFactoryEnabledComponentDefinition[] = [
            new PositionHeader({}),
            new ContactDetails({}),
            new HeaderedContentSection({})
        ];

        super(components);
    }
}

const FACTORIES = {
    resumeShells: new ResumeShellFactory(),
    resumeComponents: new ResumeComponentFactory()
}

export default FACTORIES;