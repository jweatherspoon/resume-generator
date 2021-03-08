import { Button, Divider, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    tabbedContainer: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    tabs: {
        flexDirection: 'row',
        width: '100%',
    },
    tabItem: {
        cursor: 'pointer',
        padding: '5px',
        display: 'inline-flex',
    },
    content: {
        height: '100%',
        width: '100%'
    }
});

const TabbedContentControl = (props) => {
    const {
        tabs,
        children,
        selectedTab,
        onSelectedTabChanged,
    } = props;

    const classes = useStyles(props);

    const tabItems = tabs.map((tabDefinition, i) => (
        <Button key={`tab-${tabDefinition.id}`} className={classes.tabItem} variant={tabDefinition.id === selectedTab ? "contained" : "outlined"}
            onClick={() => tabDefinition.id !== selectedTab && onSelectedTabChanged(tabDefinition.id)}>
            {tabDefinition.text}
        </Button>
    ))

    return (
        <div className={classes.tabbedContainer}>
            <div className={classes.tabs}>
                {tabItems}
                <Divider />
            </div>
            <div className={classes.content}>
                {children}
            </div>
        </div>
    )
}

export default TabbedContentControl;