/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import s from './FindTeamPage.scss';
import withStyles from '../../decorators/withStyles';
import fetch from '../../core/fetch';
var axios = require('axios');
var Autocomplete = require('react-autocomplete');
var styles = {
  item: {
    padding: '2px 6px',
    cursor: 'default'
  },

  highlightedItem: {
    color: 'white',
    background: 'hsl(200, 50%, 50%)',
    padding: '2px 6px',
    cursor: 'default'
  },
  divStyle: {
      "background-color": 'black'
  }, 
  menu: {
    borderRadius: '3px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
    background: 'rgba(255, 255, 255, 0.9)',
    padding: '2px 0',
    fontSize: '90%',
    position: 'fixed',
    overflow: 'auto',
    maxHeight: '50%',
  }
}

@withStyles(s)
class FindTeamPage extends Component {

findTeam (team, value) {
  return (
    team.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
  )
}

sortTeams (a, b, value) {
  return (
    a.name.toLowerCase().indexOf(value.toLowerCase()) >
    b.name.toLowerCase().indexOf(value.toLowerCase()) ? 1 : -1
  )
}

fakeRequest (value, cb) {
    debugger
    if (value === '')
        return this.state.teams
    var items = this.state.teams.filter((team) => {
        return this.findTeam(team, value)
    })
    setTimeout(() => {
    cb(items)
    }, 500)
}
onSelect(value, item){
    this.setState({team: item }) 
}

  constructor(props) {
    super(props);
    this.state = {count: props.initialCount};
    axios.get('http://localhost:8960/api/v1/teams/6')
      .then(function (response) {
        this.success(response.data);
      }.bind(this))
      .catch(function (response) {
        console.log(response);
      });
  }
  success(data){
    this.setState({teams: data, loading: false});
  }
renderItems (items) {
  debugger
  return items.map((item, index) => {
    if (index === 0) {
      var style = {
        background: '#eee',
        color: '#454545',
        padding: '2px 6px',
        fontWeight: 'bold'
      }
      return [<div style={style}>blah</div>, item]
    }
    else {
      return item
    }
  })
}

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };
  render() {
    debugger
    this.context.onSetTitle("Teams");
    return (
        <Autocomplete
          items={this.state.teams}
          getItemValue={(item) => item.name}
          inputProps={{"className": "input-lg", "style": {"border": "solid 1px #ccc", "width": "900px"}}}
          onSelect={this.onSelect}
          onChange={(event, value) => {
            this.setState({loading: true, team: null})
            this.fakeRequest(value, (items) => {
              this.setState({ teams: items, loading: false })
            })
          }}
          renderItem={(item, isHighlighted) => (
            <div
              style={isHighlighted ? styles.highlightedItem : styles.item}
              key={item.teamId}
              id={item.teamId}
              location={"Lets Play"}
            ><h1>{item.name}</h1><h2>{item.division}</h2></div>
          )}
          renderMenu={(items, value, style) => (
            <div style={{...styles.menu, ...style}}>
              {value === '' ? (
                <div style={{padding: 6}}>Type the name of a Team</div>
              ) : this.state.loading ? (
                <div style={{padding: 6}}>Loading...</div>
              ) : items.length === 0 ? (
                <div style={{padding: 6}}>No matches for {value}</div>
              ) : this.renderItems(items)}
            </div>
          )} />
    );
  }

}

export default FindTeamPage;
