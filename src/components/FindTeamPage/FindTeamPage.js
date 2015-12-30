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
var Autocomplete = require('react-autocomplete');

@withStyles(s)
class FindTeamPage extends Component {



  constructor(props) {
    fetch('http://54.68.232.199:8960/api/v1/teams/5', {
      mode: 'no-cors'
    }).then(r => r.json())
      .then(data => console.log(data))
      .catch(e => console.log(e));
    // fetch('http://54.68.232.199:8960/api/v1/teams/5').then(r => r.json())
    //   .then(data => console.log(data))
    //   .catch(e => console.log(e))
    
    debugger
    super(props);
    this.state = {count: props.initialCount};
  }

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  render() {
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
