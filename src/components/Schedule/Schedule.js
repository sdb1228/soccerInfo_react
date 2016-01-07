/**
 * Copyright © 2014-2016 SoccerLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
var $ = require ('jquery');
var axios = require('axios');

let styles = {
  div: {
    margin: '0 auto'
  },
  tableContainer: {
    marginTop: '20px'
  }
}
var Schedule = React.createClass({

  getInitialState () {
    return {loading: true}
  },
  componentWillReceiveProps(nextProps){
    if (nextProps.team == null) {
      return;
    }
    var url = 'http://localhost:8960/api/v1/games/' + nextProps.team.teamid
    axios.get(url)
      .then(function (response) {
        this.setState({games: response.data, loading: false});
      }.bind(this))
      .catch(function (response) {
        console.log(response);
      });
  },

  render () {
    var content = [];
    if (this.props.team) {
      if(this.state.loading){
        content = [<tr><td>loading</td></tr>]  
      }
      else{
        content = [<tr><th>When</th><th>Where</th><th>Home Team</th><th>Home Team Score</th><th>Away Team Score</th><th>Away Team</th></tr>]
        for (var i =0; i < this.state.games.length; i++) {
          content.push(this.renderItem(this.state.games[i]));
        };
      }
    }
    else{
      content = <tr><td></td></tr>
    }
    return( <div style={styles.tableContainer}><table className="table table-striped">
            <tbody>{content}</tbody>
            </table></div>);
  },

  renderItem (item) {
    return (<tr><td>{item.gamesdatetime}</td><td>{item.field}</td><td>{item.hometeam}</td><td>{item.hometeamscore}</td><td>{item.awayteamscore}</td><td>{item.awayteam}</td></tr>)
  }
})

module.exports = Schedule;