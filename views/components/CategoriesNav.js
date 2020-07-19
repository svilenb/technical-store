import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(function(theme) {
  return {
    accordionRoot: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  };
});

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function CategoriesNav(props) {
  const classes = useStyles();
  const [accordionExpanded, setAccordionExpanded] = React.useState(false);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setAccordionExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.accordionRoot}>
      {
        props.categories.map(function(category) {
          return (
            <Accordion
              key={category.name}
              expanded={accordionExpanded === category.name}
              onChange={handleAccordionChange(category.name)}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>{category.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List component="nav">
                  {
                    props.subcategories.filter(function(subcategory) {
                      return subcategory.category === category._id;
                    }).map(function(subcategory) {
                      return (
                        <ListItemLink key={subcategory.name} href={`/category/${category.name}/subcategory/${subcategory.name}`}>
                          <ListItemText primary={subcategory.name} />
                        </ListItemLink>
                      );
                    })
                  }
                </List>
              </AccordionDetails>
            </Accordion>
          )
        })
      }
    </div>
  )
}
