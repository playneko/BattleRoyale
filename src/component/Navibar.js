import React from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function Navibar() {
  return (
    <List>
      <ListItem button component={Link} to="/">
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button component={Link} to="/life">
        <ListItemText primary="생존자 명단" />
      </ListItem>
      <ListItem button component={Link} to="/news">
        <ListItemText primary="진행 상황" />
      </ListItem>
      <ListItem button component={Link} to="/rank">
        <ListItemText primary="우승자" />
      </ListItem>
      <ListItem button component={Link} to="/board">
        <ListItemText primary="게시판" />
      </ListItem>
    </List>
  );
}