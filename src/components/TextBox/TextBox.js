/**
 * Copyright © 2014-2016 SoccerLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import s from './TextBox.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class TextBox extends Component {

  static propTypes = {
    maxLines: PropTypes.number,
  };

  static defaultProps = {
    maxLines: 1,
  };

  render() {
    return (
      <div className={s.root}>
        {this.props.maxLines > 1 ?
          <textarea {...this.props} className={s.input} ref="input" key="input" rows={this.props.maxLines} /> :
          <input {...this.props} className={s.input} ref="input" key="input" />}
      </div>
    );
  }

}

export default TextBox;
