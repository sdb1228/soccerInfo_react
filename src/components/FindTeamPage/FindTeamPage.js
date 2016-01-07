/**
 * Copyright © 2014-2016 SoccerLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import s from './FindTeamPage.scss';
import withStyles from '../../decorators/withStyles';
import fetch from '../../core/fetch';
var Schedule = require('../Schedule/Schedule.js');
var axios = require('axios');
var $ = require ('jquery');
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
    if (value === '')
        return this.state.fullTeams
    var items = this.state.fullTeams.filter((team) => {
        return this.findTeam(team, value)
    })
    setTimeout(() => {
    cb(items)
    }, 500)
}
onSelect(value, item){
  this.setState({teams: this.state.fullTeams, loading: false, team: item});
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
    this.setState({teams: data, loading: false, selected: "lets_play", fullTeams: data});
  }
renderItems (items) {
  return items.map((item, index) => {
    var text = item.props.children[0].props.children.charAt(0)
    if (index === 0 || items[index - 1].props.children[0].props.children.charAt(0) !== text) {
      var style = {
        background: '#eee',
        color: '#454545',
        padding: '2px 6px',
        fontWeight: 'bold'
      }
      return [<div style={style}>{text}</div>, item]
    }
    else {
      return item
    }
  })
}
facilityChoose(facility, event){
  event.target.parentElement.className="active";
  $("#" + this.state.selected).toggleClass("active");
  var url = "http://localhost:8960/api/v1/teams/" + event.target.id
  axios.get(url)
  .then(function (response) {
    this.setState({teams: response.data, loading: false, selected: event.target.parentElement.id, fullTeams:response.data});
  }.bind(this))
  .catch(function (response) {
    console.log(response);
  });
}
  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };
  render() {
    this.context.onSetTitle("Teams");
    return (
      <div>
        <div className={s.root}>
          <ul className="nav nav-pills">
              <li id="lets_play" role="presentation" className="active" ><a id="6" href="#" onClick={this.facilityChoose.bind(this, 'lets_play')}>Lets Play Soccer</a></li>
              <li id="soccer_city" role="presentation"><a id="5" href="#" onClick={this.facilityChoose.bind(this, 'soccer_city')}>Soccer City</a></li>
              <li id="utah_soccer" role="presentation"><a id="1" href="#" onClick={this.facilityChoose.bind(this, 'utah_soccer')}>Utah Soccer</a></li>
              <li id="uysa_boys" role="presentation"><a id="4" href="#" onClick={this.facilityChoose.bind(this, 'uysa_boys')}>UYSA Boys</a></li>
              <li id="uysa_girls" role="presentation"><a id="3" href="#" onClick={this.facilityChoose.bind(this, 'uysa_girls')}>UYSA Girls</a></li>
            </ul>
            <Autocomplete
              items={this.state.teams}
              getItemValue={(item) => item.name}
              inputProps={{"className": "form-control input-lg", "style": {"border": "solid 1px #ccc", "width": "900px"}}}
              onSelect={this.onSelect.bind(this)}
              onChange={(event, value) => {
                this.setState({loading: true, team: null})
                this.fakeRequest(value, (items) => {
                  this.setState({ teams: items, loading: false })
                })
              }}
              renderItem={(item, isHighlighted) => (
                <div
                  style={isHighlighted ? styles.highlightedItem : styles.item}
                  key={item.Id}
                  id={item.Id}
                  location={item.facility}
                ><h1>{item.name}</h1><div>{item.division}</div></div>
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
            </div>
            <Schedule
              team={this.state.team}
              loading={this.state.team ? true : false}/>
          </div>
    );
  }

}

export default FindTeamPage;
